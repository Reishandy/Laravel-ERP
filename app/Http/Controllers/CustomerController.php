<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('customers/index', [
            'customers' => Customer::where('user_id', auth()->user()->id)
                ->with('sales')
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        // TODO: Validate in StoreCustomerRequest
        dd($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(String $customer_number): Response
    {
        return Inertia::render('customers/index', [
            'customers' => Customer::where('user_id', auth()->user()->id)
                ->with('sales')
                ->latest()
                ->get(),
            'show' => $customer_number
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        //
        dd($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        //
        dd($customer->customer_number);
    }
}
