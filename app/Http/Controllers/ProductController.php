<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('products/index', [
            'products' => Product::where('user_id', auth()->user()->id)
                ->with('sales')
                ->latest()
                ->get(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        // TODO: Validate the request on StoreProductRequest
        dd($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(String $product_number): Response
    {
        return Inertia::render('products/index', [
            'products' => Product::where('user_id', auth()->user()->id)
                ->with('sales')
                ->latest()
                ->get(),
            'show' => $product_number
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
        dd($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
        dd($product->product_number);
    }
}
