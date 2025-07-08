<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        return Inertia::render('dashboard', [
            'sales' => $request->user()->sales()
                ->with(['customer', 'product'])
                ->latest()
                ->take(5)
                ->get(),
            'products' => $request->user()->products()
                ->where('quantity', '<=', 5)
                ->orderBy('quantity', 'asc')
                ->take(5)
                ->get(),
            // TODO: pass other data
        ]);
    }
}
