<?php

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
        return Inertia::render('sales/index');
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
//  - currency setting

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
