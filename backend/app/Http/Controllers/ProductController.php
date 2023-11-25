<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        // Set default values for pagination, search, order by, and type
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 20);
        $search = $request->input('search', '');
        $orderBy = $request->input('order_by', 'id');
        $type = $request->input('type', '');

        // Query builder for products
        $query = Product::query();

        // Apply search condition
        if ($search !== '') {
            $query->where('name', 'like', "%$search%")
                ->orWhere('title', 'like', "%$search%")
                ->orWhere('description', 'like', "%$search%");
        }

        // Apply type condition
        if ($type !== '' && in_array($type, ['PLANT', 'ACCESSORY'])) {
            $query->where('type', $type);
        }

        // Apply order by condition
        $query->orderBy($orderBy);

        // Paginate the products
        $products = $query->paginate($limit, ['*'], 'page', $page);

        // Return the paginated response
        return response()->json([
            'page' => $products->currentPage(),
            'limit' => $products->perPage(),
            'total' => $products->total(),
            'data' => $products->items(),
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:PLANT,ACCESSORY',
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'image' => 'required|string',
        ]);

        $product = Product::create($validatedData);

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'name' => 'string',
            'type' => 'in:PLANT,ACCESSORY',
            'title' => 'string',
            'description' => 'string',
            'price' => 'numeric',
            'quantity' => 'integer',
            'image' => 'string',
        ]);

        $product->update($validatedData);

        return response()->json($product, 200);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(null, 204);
    }
}
