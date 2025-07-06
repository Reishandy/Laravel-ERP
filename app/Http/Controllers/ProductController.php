<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
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
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $user = auth()->user();

        // Get latest product number
        $latestProduct = $user->products()
            ->orderBy('product_number', 'desc')
            ->first();
        $number = (int) explode('-', $latestProduct->product_number)[1] ?? 0;
        $formattedNumber = 'P-' . str_pad($number + 1, 5, '0', STR_PAD_LEFT);

        $product = $user->products()->create($request->merge([
            'product_number' => $formattedNumber,
        ])->all());

        if ($request->hasFile('image')) {
            $product->image = $request->file('image')->store('images', 'public');
            $product->save();
        }

        return redirect()->route('products.index')->with('success', 'Customer created successfully.');
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
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $validated = $request->validated();
        unset($validated['image']);
        unset($validated['remote_image']);
        $product->fill($validated);

        if ($request->hasFile('image') && $request->file('image') !== null) {
            // Delete the old image if it exists
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $product->image = $request->file('image')->store('images', 'public');
        }

        if ($request->boolean('remove_image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $product->image = null;
        }

        $product->save();

        return redirect()->route('products.index')->with('success', 'Customer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('products.index')->with('success', 'Customer deleted successfully.');
    }
}
