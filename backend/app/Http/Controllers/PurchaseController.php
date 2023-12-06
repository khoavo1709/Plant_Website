<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 20);
        $name_or_mail = $request->input('name_or_mail', '');
        $status = $request->input('status', '');
        $mobile = $request->input('mobile', '');
        $orderBy = $request->input('order_by', 'id');
        $type = strtoupper($request->input('type', '')); // Convert to uppercase

        // Validate the purchase status
        if ($type !== '' && !in_array($type, ['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'])) {
            return response()->json(['message' => 'Invalid purchase status'], 400);
        }

        // Query builder for purchases
        $query = Purchase::query();

        if ($name_or_mail !== '' || $mobile !== '' || $status !== '') {
            $query->where(function ($query) use ($name_or_mail, $mobile, $status) {
                if ($name_or_mail !== '') {
                    $query->where('customer_name', 'like', "%$name_or_mail%")
                        ->orWhere('customer_email', 'like', "%$name_or_mail%");
                }
                if ($mobile !== '') {
                    $query->where('mobile', 'like', "%$mobile%");
                }
                if ($status !== '') {
                    $query->where('status', 'like', "%$status%");
                }
            });
        }

        // Apply status condition
        if ($type !== '' && in_array($type, ['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'])) {
            $query->where('status', $type);
        }

        // Apply order by condition 
        $query->orderBy($orderBy, 'desc');

        // Paginate the purchases
        $purchases = $query->paginate($limit, ['*'], 'page', $page);

        // Return the paginated response
        return response()->json([
            'page' => $purchases->currentPage(),
            'limit' => $purchases->perPage(),
            'total' => $purchases->total(),
            'data' => $purchases->items(),
        ]);
    }

    //funcion get all purchases + products data
    public function dashboard()
    {
        $purchases = Purchase::with('products')->get();
        return response()->json(['purchases' => $purchases]);
    }

    public function show($id)
    {
        $purchase = Purchase::with('products')->findOrFail($id);
        return response()->json(['purchase' => $purchase]);
    }


    public function store(Request $request)
    {
        $purchase = Purchase::create([
            'customer_name' => $request->input('customer_name'),
            'customer_email' => $request->input('customer_email'),
            'mobile' => $request->input('mobile'),
            'status' => 'PENDING', // or set a default status
            'total' => 0, // Initialize total
            'address' => $request->input('address'),
            'note' => $request->input('note'),
        ]);

        $total = 0;

        foreach ($request->input('products') as $productData) {
            $product = Product::find($productData['product_id']);
            $total += $product->price * $productData['quantity'];
            $purchase->products()->attach($productData['product_id'], [
                'quantity' => $productData['quantity'],
                'price' => $product->price,
            ]);
        }

        // Update the total in the purchases table
        $purchase->update(['total' => $total]);

        // Return a successful response with the updated purchase + products
        $purchase = Purchase::with('products')->findOrFail($purchase->id);
        return response()->json(['purchase' => $purchase]);
    }
    public function update(Request $request, $id)
    {
        // Validate the request data for the purchase
        $validatedData = $request->validate([
            'customer_name' => 'string',
            'customer_email' => 'email',
            'mobile' => 'string|max:20',
            'status' => 'in:PENDING,PROCESSING,SHIPPED,COMPLETED,CANCELLED',
            'address' => 'string',
            'note' => 'nullable|string',
        ]);

        // Extract product data from the request
        $productsData = $request->input('products', []);

        // Start a database transaction
        DB::beginTransaction();

        // Update the purchase
        $purchase = Purchase::findOrFail($id);
        $purchase->update($validatedData);
        $total = 0;

        // Sync products with the purchase in the pivot table
        $purchase->products()->sync([]);
        foreach ($productsData as $productData) {
            $productDB = DB::table('products')->where('id', $productData['product_id'])->first();
            $total += $productDB->price * $productData['quantity'];
            $purchase->products()->attach($productData['product_id'], [
                'quantity' => $productData['quantity'],
                'price' => $productDB->price,
            ]);
            //check status of purchase, if status is not pending, update stock
            if ($purchase->status !== 'PENDING') {
                $product = Product::find($productData['product_id']);
                $product->update(['quantity' => $product->quantity - $productData['quantity']]);
            }
            //if status is Cancelled, update stock
            if ($purchase->status === 'CANCELLED') {
                $product = Product::find($productData['product_id']);
                $product->update(['quantity' => $product->quantity + $productData['quantity']]);
            }
        }

        //Save 
        $purchase->update(['total' => $total]);


        // Commit the transaction
        DB::commit();

        // Return a successful response with the updated purchase + products
        $purchase = Purchase::with('products')->findOrFail($id);
        return response()->json(['purchase' => $purchase]);
    }
}
