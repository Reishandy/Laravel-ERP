<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Models\Sale;
use Inertia\Inertia;
use Inertia\Response;
use function Symfony\Component\String\s;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('sales/index', [
            'sales' => Sale::where('user_id', auth()->user()->id)
                ->with(['customer', 'product'])
                ->latest()
                ->get(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request)
    {
        // TODO: validate in StoreSaleRequest
        dd(request()->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(String $sale_number): Response
    {
        return Inertia::render('sales/index', [
            'sales' => Sale::where('user_id', auth()->user()->id)
                ->with(['customer', 'product'])
                ->latest()
                ->get(),
            'show' => $sale_number,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSaleRequest $request, Sale $sale)
    {
        //
        dd(request()->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        //
        dd($sale->sale_number);
    }
}
