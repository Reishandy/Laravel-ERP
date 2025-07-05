<?php

use App\Models\Sale;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // TODO: change with resource controller
    Route::get('sales', function () {
        $user_id = auth()->user()->id;
        return Inertia::render('sales/index', [
            'sales' => Sale::where('user_id', $user_id)->with(['customer', 'product'])->get()
        ]);
    })->name('sales.index');
    Route::get('products', function () {
        return Inertia::render('products/index');
    })->name('products.index');
    Route::get('customers', function () {
        return Inertia::render('customers/index');
    })->name('customers.index');
});

// TODO:
//  - Modify landing page
//  - Modify error pages
//  - Pagination
//  - Email template
//  - avatar supports?
//  - favicon
//  - export to CSV

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
