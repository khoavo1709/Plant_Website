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
        $type = strtoupper($request->input('type', ''));

        if ($type !== '' && !in_array($type, ['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'])) {
            return response()->json(['message' => 'Invalid purchase status'], 400);
        }

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

        if ($type !== '' && in_array($type, ['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'])) {
            $query->where('status', $type);
        }

        $query->orderBy($orderBy, 'desc');
        $purchases = $query->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'page' => $purchases->currentPage(),
            'limit' => $purchases->perPage(),
            'total' => $purchases->total(),
            'data' => $purchases->items(),
        ]);
    }

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
            $product->update(['quantity' => $product->quantity - $productData['quantity']]);
        }

        $purchase->update(['total' => $total]);
        $purchase = Purchase::with('products')->findOrFail($purchase->id);

        return response()->json(['purchase' => $purchase]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'customer_name' => 'string',
            'customer_email' => 'email',
            'mobile' => 'string|max:20',
            'status' => 'in:PENDING,PROCESSING,SHIPPED,COMPLETED,CANCELLED',
            'address' => 'string',
            'note' => 'nullable|string',
        ]);
        $productsData = $request->input('products', []);
        DB::beginTransaction();
        $purchase = Purchase::findOrFail($id);
        $purchase->update($validatedData);
        $total = 0;
        $purchase->products()->sync([]);
        foreach ($productsData as $productItem) {
            $productDB = Product::findOrFail($productItem['product_id']);
            $total += $productDB->price * $productItem['quantity'];
            $purchase->products()->attach($productItem['product_id'], [
                'quantity' => $productItem['quantity'],
                'price' => $productDB->price,
            ]);
            if ($purchase->status === 'CANCELLED') {
                $product = Product::find($productItem['product_id']);
                $product->update(['quantity' => $product->quantity + $productItem['quantity']]);
            }
        }
        $purchase->update(['total' => $total]);
        DB::commit();
        $purchase = Purchase::with('products')->findOrFail($id);
        return response()->json(['purchase' => $purchase]);
    }
}
