<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $ids = $request->input('ids', '');
        $productType = strtoupper($request->input('product_type', ''));

        // Validate the product type
        if ($productType !== '' && !in_array($productType, ['PLANT', 'ACCESSORY'])) {
            return response()->json(['message' => 'Invalid product type'], 400);
        }

        $query = Category::query();

        // Add the whereIn clause only if IDs are provided
        if ($ids !== '') {
            $idsArray = explode(',', $ids);
            $query->whereIn('id', $idsArray);
        }

        // Add the whereHas clause for product type
        if ($productType !== '') {
            $query->whereHas('products', function ($query) use ($productType) {
                $query->where('type', $productType);
            });
        }

        $categories = $query->get();

        return response()->json($categories);
    }

    public function show($id)
    {
        $category = Category::find($id);
        if ($category === null) {
            return response(['message' => 'The category does not exist'], 404);
        }

        return response($category);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
        ]);

        return Category::create($data);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
        ]);

        $category = Category::find($id);
        if ($category === null) {
            return response(['message' => 'The category does not exist'], 404);
        }

        $category->update($data);

        return $category;
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category === null) {
            return response(['message' => 'The category does not exist'], 404);
        }

        $category->delete();

        return 204;
    }
}
