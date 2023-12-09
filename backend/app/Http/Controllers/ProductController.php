<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Cloudinary\Cloudinary;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 20);
        $search = $request->input('search', '');
        $searchProductName = $request->input('searchProductName', '');
        $orderBy = $request->input('order_by', 'id');
        $type = strtoupper($request->input('type', ''));
        $categoryIds = $request->input('categories', '');
        $ids = $request->input('ids', '');

        if ($type !== '' && !in_array($type, ['PLANT', 'ACCESSORY'])) {
            return response()->json(['message' => 'Invalid product type'], 400);
        }

        $categoryIds = $categoryIds !== '' ? explode(',', $categoryIds) : [];
        $ids = $ids !== '' ? explode(',', $ids) : [];

        $query = Product::query();

        $query->where(function ($query) use ($search) {
            if ($search !== '') {
                $query->where('name', 'like', "%$search%")
                    ->orWhere('title', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%");
            }
        });

        if ($type !== '' && in_array($type, ['PLANT', 'ACCESSORY'])) {
            $query->where('type', $type);
        }

        if ($searchProductName !== '') {
            $query->where('name', 'like', "%$searchProductName%");
        }

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        if (!empty($categoryIds)) {
            $query->whereHas('categories', function ($query) use ($categoryIds) {
                $query->whereIn('categories.id', $categoryIds);
            });
        }

        if ($orderBy == 'id') {
            $query->orderBy(column: 'id', direction: 'desc');
        } else {
            $query->orderBy($orderBy);
        }

        $query->with('categories');

        $products = $query->paginate($limit, ['*'], 'page', $page);

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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp',
        ]);

        $uploader = new Cloudinary();
        $imagePath = $uploader->uploadApi()->upload($request->file('image')->path());
        $validatedData['image'] = $imagePath['secure_url'];

        $product = Product::create($validatedData);

        // Attach category relationships if provided
        $categoryIds = $request->input('category_ids', null);
        $categoryIds = $categoryIds !== null ? explode(',', $categoryIds) : [];
        if (!empty($categoryIds)) {
            $product->categories()->attach($categoryIds);
        }

        return response()->json($product, 201);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        if ($product == null) {
            return response()->json(['message' => "Product not found"], 404);
        }
        // Load categories relationship without pivot information
        $product->load(['categories' => function ($query) {
            $query->without('pivot');
        }]);

        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'string',
            'type' => 'in:PLANT,ACCESSORY',
            'title' => 'string',
            'description' => 'string',
            'price' => 'numeric',
            'quantity' => 'integer',
            'image' => 'image|mimes:jpeg,png,jpg,gif,webp',
        ]);

        $product = Product::findOrFail($id);
        if ($product == null) {
            return response()->json(['message' => "Product not found"], 404);
        }

        // If a new image is provided, upload it to Cloudinary
        if ($request->hasFile('image')) {
            $uploader = new Cloudinary();
            $imagePath = $uploader->uploadApi()->upload($request->file('image')->path());
            $validatedData['image'] = $imagePath['secure_url'];
        }
        $oldImage = $product->image;
        $product->update($validatedData);

        // Delete existing category relationships
        $product->categories()->detach();

        // Attach new category relationships if provided
        $categoryIds = $request->input('category_ids', null);
        $categoryIds = $categoryIds !== null ? explode(',', $categoryIds) : [];

        if (!empty($categoryIds)) {
            $product->categories()->attach($categoryIds);
        }

        $product->deleteImageFromCloudinary($oldImage);

        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        if ($product == null) {
            return response()->json(['message' => "Product not found"], 404);
        }
        // Check if the product has associated orders
        $hasOrders = DB::table('purchase_products')
            ->where('product_id', $product->id)
            ->exists();

        // If there are orders, return a bad request response
        if ($hasOrders) {
            return response()->json(['message' => 'Product has associated orders and cannot be deleted'], 400);
        }

        // Delete existing category relationships
        $product->categories()->detach();

        $product->delete();

        $product->deleteImageFromCloudinary($product->image);

        return response()->json(null, 204);
    }
}
