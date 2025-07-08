<?php

namespace App\Http\Controllers;

use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $chart = $this->getChart($request);

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
            'chart_data' => $chart
            // TODO: pass other data
        ]);
    }

    private function getChart(Request $request): array
    {
        $end = now();
        $start = now()->subDays(364); // last 365 days

        $user = $request->user();

        $salesData = $user->sales()
            ->selectRaw('DATE(created_at) as date, COUNT(*) as sales')
            ->whereBetween('created_at', [$start, $end])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        $productData = $user->products()
            ->selectRaw('DATE(created_at) as date, COUNT(*) as products')
            ->whereBetween('created_at', [$start, $end])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->keyBy('date');

        $customerData = $user->customers()
            ->selectRaw('DATE(created_at) as date, COUNT(*) as customers')
            ->whereBetween('created_at', [$start, $end])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->keyBy('date');

        $period = CarbonPeriod::create($start, $end);
        $chart = [];

        foreach ($period as $date) {
            $dateStr = $date->format('Y-m-d');
            $chart[] = [
                'date' => $dateStr,
                'sales' => $salesData[$dateStr]->sales ?? 0,
                'products' => $productData[$dateStr]->products ?? 0,
                'customers' => $customerData[$dateStr]->customers ?? 0,
            ];
        }

        return $chart;
    }

}
