<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
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
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request): RedirectResponse
    {
        $user = auth()->user();

        // Get latest customer number
        $latestCustomer = $user->customers()
            ->orderBy('customer_number', 'desc')
            ->first();
        $number = (int) explode('-', $latestCustomer->customer_number)[1] ?? 0;
        $formattedNumber = 'C-' . str_pad($number + 1, 5, '0', STR_PAD_LEFT);

        $customers = $user->customers()->create($request->merge([
            'customer_number' => $formattedNumber,
        ])->all());

        if ($request->hasFile('avatar')) {
            $customers->avatar = $request->file('avatar')->store('avatars', 'public');
            $customers->save();
        }

        return redirect()->route('customers.index')->with('success', 'Customer created successfully.')
            ->with('description', $formattedNumber . ' has been created.')
            ->with('timestamp', now()->timestamp);
    }

    /**
     * Display the specified resource.
     */
    public function show(String $customer_number): Response
    {
        return Inertia::render('customers/index', [
            'customers' => Customer::where('user_id', auth()->user()->id)
                ->latest()
                ->get(),
            'show' => $customer_number
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer): RedirectResponse
    {
        $validated = $request->validated();
        unset($validated['avatar']);
        unset($validated['remote_avatar']);
        $customer->fill($validated);

        if ($request->hasFile('avatar') && $request->file('avatar') !== null) {
            // Delete the old avatar if it exists
            if ($customer->avatar) {
                Storage::disk('public')->delete($customer->avatar);
            }

            $customer->avatar = $request->file('avatar')->store('avatars', 'public');
        }

        if ($request->boolean('remove_avatar')) {
            if ($customer->avatar) {
                Storage::disk('public')->delete($customer->avatar);
            }
            $customer->avatar = null;
        }

        $customer->save();

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully.')
            ->with('description', $customer->customer_number . ' has been updated.')
            ->with('timestamp', now()->timestamp);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer): RedirectResponse
    {
        if ($customer->avatar) {
            Storage::disk('public')->delete($customer->avatar);
        }

        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully.')
            ->with('description', $customer->customer_number . ' has been deleted.')
            ->with('timestamp', now()->timestamp);
    }
}
