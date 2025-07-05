<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('sales', [SaleController::class, 'index'])->name('sales.index');
    Route::get('sales/{sale_number}', [SaleController::class, 'show'])->name('sales.show');

    Route::get('products', [ProductController::class, 'index'])->name('products.index');
    Route::get('products/{product_number}', [ProductController::class, 'show'])->name('products.show');

    Route::get('customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('customers/{customer_number}', [CustomerController::class, 'show'])->name('customers.show');
});

// TODO:
//  - Modify landing page
//  - Email verification and reset pass template change
//  - favicon
//  - export to CSV

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
