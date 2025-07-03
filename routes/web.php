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
    Route::get('inventory', function () {
        return Inertia::render('inventory/index');
    })->name('inventory.index');
});

// TODO:
//  - Modify landing page
//  - Modify error pages
//  - Pagination
//  - Email template

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
