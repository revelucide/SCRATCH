<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    { 
        $user_id = auth ()->user()->id;

        $products = \App\Models\Product::where('user_id', $user_id)->get();

        return response()->json([
            'status' => true,
            'data' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);
        $data['user_id'] = auth()->user()->id;
        if($request->hasFile('banner_image')) {
         $data["banner_image"] = $request->file('banner_image')->store('products', 'public');
        } 

        Product::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Product created successfully.',
        ]);


    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json([
            'status' => true,
            'message' => 'Product data found.',
            'product' => $product,
        ]); 
    }
   
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $data = $request->only(['title']);
        
        if ($request->hasFile('banner_image')) {
           if($product->banner_image) {
               Storage::disk('public')->delete($product->banner_image);
           }
              $data['banner_image'] = $request->file('banner_image')->store('products', 'public');
        }
        $product->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Product updated successfully.',
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'status' => true,
            'message' => 'Product deleted successfully.',
        ]);
    }
}
