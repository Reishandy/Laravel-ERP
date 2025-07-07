<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Models\Sale;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('sales/index', [
            'sales' => auth()->user()->sales()
                ->with(['customer', 'product'])
                ->latest()
                ->get(),
            'products' => auth()->user()->products()
                ->get(),
            'customers' => auth()->user()->customers()
                ->get(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request): RedirectResponse
    {
        $user = auth()->user();

        // Get product and customer
        $product = $user->products()
            ->where('product_number', $request->product_number)
            ->firstOrFail();
        $customer = $user->customers()
            ->where('customer_number', $request->customer_number)
            ->firstOrFail();
        $productPrice = $product->price;

        // Check if the product or customer exists
        if (!$product || !$customer) {
            return redirect()->route('sales.index')->with('error', 'Product or Customer not found.')
                ->with('description', 'Please check the product and customer numbers.')
                ->with('timestamp', now()->timestamp); // Not actually used in the response, but included for react state management
        }

        // Check if the product has enough stock
        if ($product->quantity < $request->quantity) {
            return redirect()->route('sales.index')->with('error', 'Not enough stock available.')
                ->with('description', 'Only ' . $product->quantity . ' items available.')
                ->with('timestamp', now()->timestamp);
        }

        // Update product stock
        $product->quantity -= $request->quantity;
        $product->save();

        // Get latest sale number
        $latestSale = $user->sales()
            ->orderBy('sale_number', 'desc')
            ->first();
        $number = (int)explode('-', $latestSale->sale_number)[1] ?? 0;
        $formattedNumber = 'S-' . str_pad($number + 1, 5, '0', STR_PAD_LEFT);

        $user->sales()->create($request->merge([
            'product_id' => $product->id,
            'customer_id' => $customer->id,
            'sale_number' => $formattedNumber,
            'price_at_sale' => $productPrice,
            'total_price' => $productPrice * $request->quantity,
        ])->all());

        return redirect()->route('sales.index')->with('success', 'Sale created successfully.')
            ->with('description', $formattedNumber . ' has been created.')
            ->with('timestamp', now()->timestamp);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $sale_number): Response
    {
        return Inertia::render('sales/index', [
            'sales' => auth()->user()->sales()
                ->with(['customer', 'product'])
                ->latest()
                ->get(),
            'products' => auth()->user()->products()
                ->get(),
            'customers' => auth()->user()->customers()
                ->get(),
            'show' => $sale_number,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSaleRequest $request, Sale $sale): RedirectResponse
    {
        $user = auth()->user();

        $sale->load('product');
        $originalQuantity = $sale->quantity;
        $originalProductId = $sale->product_id;

        $product = $user->products()
            ->where('product_number', $request->product_number)
            ->firstOrFail();
        $customer = $user->customers()
            ->where('customer_number', $request->customer_number)
            ->firstOrFail();

        $productChanged = $originalProductId != $product->id;

        // Handle stock updates
        if ($productChanged) {
            // Restore stock to original product
            $sale->product->quantity += $originalQuantity;
            $sale->product->save();

            // Check if new product has enough stock
            if ($product->quantity < $request->quantity) {
                return redirect()->route('sales.index')->with('error', 'Not enough stock available.')
                    ->with('description', 'Only ' . $product->quantity . ' items available.')->with('timestamp', now()->timestamp);
            }

            // Deduct from new product's stock
            $product->quantity -= $request->quantity;
            $product->save();
        } elseif ($originalQuantity != $request->quantity) {
            // Only quantity changed - calculate the difference
            $quantityDifference = $request->quantity - $originalQuantity;

            // Check if there's enough stock for an increase
            if ($quantityDifference > 0 && $product->quantity < $quantityDifference) {
                return redirect()->route('sales.index')->with('error', 'Not enough stock available.')
                    ->with('description', 'Only ' . $product->quantity . ' items available.')->with('timestamp', now()->timestamp);
            }

            // Update stock by the difference (will subtract if positive, add if negative)
            $product->quantity -= $quantityDifference;
            $product->save();
        }

        $sale->update([
            'product_id' => $product->id,
            'customer_id' => $customer->id,
            'quantity' => $request->quantity,
            'status' => $request->status,
            // If product changed, update price_at_sale, otherwise keep existing
            'price_at_sale' => $productChanged ? $product->price : $sale->price_at_sale,
            'total_price' => ($productChanged ? $product->price : $sale->price_at_sale) * $request->quantity,
        ]);

        return redirect()->route('sales.index')->with('success', 'Sale updated successfully.')
            ->with('description', $sale->sale_number . ' has been updated.')
            ->with('timestamp', now()->timestamp);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale): RedirectResponse
    {
        $sale->load('product');

        // Restore product stock
        $sale->product->quantity += $sale->quantity;
        $sale->product->save();

        $sale->delete();

        return redirect()->route('sales.index')->with('success', 'Sale deleted successfully')
            ->with('description', $sale->sale_number . ' has been deleted. and stock has been restored.')
            ->with('timestamp', now()->timestamp);
    }

    /**
     * Update the status of the specified sale.
     */
    public function status(Request $request, Sale $sale): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:pending,processing,completed',
        ]);

        $sale->update(['status' => $request->status]);

        return redirect()->route('sales.index')->with('success', 'Sale status updated successfully.')
            ->with('description', $sale->sale_number . ' status has been updated to ' . ucfirst($request->status) . '.')
            ->with('timestamp', now()->timestamp);
    }
}
