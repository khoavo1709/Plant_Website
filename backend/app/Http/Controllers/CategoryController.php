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
        return Category::find($id);
    }

    public function store(Request $request)
    {
        return Category::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());

        return $category;
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return 204;
    }
}
