<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
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
        $query->orderBy($orderBy);

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
        // Validate the request data for the purchase
        $validatedData = $request->validate([
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
            'mobile' => 'required|string|max:20',
            'status' => 'required|in:PENDING,PROCESSING,SHIPPED,COMPLETED,CANCELLED',
            'total' => 'required|numeric',
            'address' => 'required|string',
            'note' => 'nullable|string',
        ]);

        // Extract product data from the request
        $productsData = $request->input('products', []);

        // Start a database transaction
        // Create a new purchase
        $purchase = Purchase::create($validatedData);

        // Associate products with the purchase in the pivot table
        foreach ($productsData as $productData) {
            $purchase->products()->attach($productData['product_id'], [
                'quantity' => $productData['quantity'],
                'price' => $productData['price'],
            ]);
        }

        // Commit the transaction
        DB::commit();

        // Return a successful response
        return response()->json(['purchase' => $purchase], 201);
    }
    public function update(Request $request, $id)
    {
        // using post method to update purchase status
        $purchase = Purchase::findOrFail($id);
        $purchase->status = $request->input('status');
        $purchase->save();
        return response()->json(['purchase' => $purchase]);
    }
}
