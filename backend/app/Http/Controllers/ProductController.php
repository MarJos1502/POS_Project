<?php

namespace App\Http\Controllers;

use App\Models\Product; // Assuming you have a Product model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // List all products
    public function index()
    {
        return response()->json(Product::all());
    }

    // Create a new product
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'brand' => 'required|string|max:255',
        'quantity' => 'required|numeric',
    ]);

    $data = $request->only('name', 'price', 'brand', 'quantity');

    // Determine status based on quantity
    if ($data['quantity'] > 100) {
        $data['status'] = 'In Stock';
    } elseif ($data['quantity'] > 0) {
        $data['status'] = 'Low Stock';
    } else {
        $data['status'] = 'Out of Stock';
    }

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('products', 'public');
    }

    $product = Product::create($data);

    return response()->json($product, 201);
}

    // Show details of a single product
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    // Update an existing product
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
    
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'brand' => 'required|string|max:255',
            'quantity' => 'required|numeric',
        ]);
    
        $data = $request->only('name', 'price', 'brand', 'quantity');
    
        // Update status based on new quantity
        if ($data['quantity'] > 100) {
            $data['status'] = 'In Stock';
        } elseif ($data['quantity'] > 0) {
            $data['status'] = 'Low Stock';
        } else {
            $data['status'] = 'Out of Stock';
        }
    
        // Handle new image if uploaded
        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }
    
        $product->update($data);
    
        return response()->json($product);
    }
    

    // Delete a product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Delete the image from storage
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
