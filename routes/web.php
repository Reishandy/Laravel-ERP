<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('sales', [SaleController::class, 'index'])->name('sales.index');
    Route::get('sales/{sale_number}', [SaleController::class, 'show'])->name('sales.show');
    Route::post('sales', [SaleController::class, 'store'])->name('sales.store');
    Route::post('sales/{sale:sale_number}', [SaleController::class, 'update'])->name('sales.update');
    Route::post('sales/{sale:sale_number}/status', [SaleController::class, 'status'])->name('sales.status');
    Route::delete('sales/{sale:sale_number}', [SaleController::class, 'destroy'])->name('sales.destroy');

    Route::get('products', [ProductController::class, 'index'])->name('products.index');
    Route::get('products/{product_number}', [ProductController::class, 'show'])->name('products.show');
    Route::post('products', [ProductController::class, 'store'])->name('products.store');
    Route::post('products/{product:product_number}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('products/{product:product_number}', [ProductController::class, 'destroy'])->name('products.destroy');

    Route::get('customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('customers/{customer_number}', [CustomerController::class, 'show'])->name('customers.show');
    Route::post('customers', [CustomerController::class, 'store'])->name('customers.store');
    Route::post('customers/{customer:customer_number}', [CustomerController::class, 'update'])->name('customers.update');
    Route::delete('customers/{customer:customer_number}', [CustomerController::class, 'destroy'])->name('customers.destroy');
});

// TODO:
//  - Modify landing page
//  - Email verification and reset pass template change
//  - export to CSV
//  - dashboard export to PDF

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
