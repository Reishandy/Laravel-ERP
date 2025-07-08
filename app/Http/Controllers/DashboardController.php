<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
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
        $user = $request->user();

        $startOfCurrentMonth = now()->startOfMonth();
        $startOfPreviousMonth = now()->subMonth()->startOfMonth();
        $endOfPreviousMonth = now()->startOfMonth()->subDay();
        $endOfCurrentMonth = now(); // Or ->endOfMonth() if full months

        $currentRevenue = $user->sales()
            ->whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
            ->sum('total_price');
        $previousRevenue = $user->sales()
            ->whereBetween('created_at', [$startOfPreviousMonth, $endOfPreviousMonth])
            ->sum('total_price');

        $currentSales = $user->sales()
            ->whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
            ->count();
        $previousSales = $user->sales()
            ->whereBetween('created_at', [$startOfPreviousMonth, $endOfPreviousMonth])
            ->count();

        $currentCustomers = $user->customers()
            ->whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
            ->count();
        $previousCustomers = $user->customers()
            ->whereBetween('created_at', [$startOfPreviousMonth, $endOfPreviousMonth])
            ->count();

        $currentProducts = $user->products()
            ->whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
            ->count();
        $previousProducts = $user->products()
            ->whereBetween('created_at', [$startOfPreviousMonth, $endOfPreviousMonth])
            ->count();

        $topProducts = $user->sales()
            ->select('product_id', DB::raw('SUM(quantity) as total_sold'))
            ->whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
            ->groupBy('product_id')
            ->orderByDesc('total_sold')
            ->take(5)
            ->get()
            ->map(function ($row) {
                $product = Product::find($row->product_id);
                return [
                    'id' => $product->product_number,
                    'name' => $product->name,
                    'value' => $row->total_sold,
                    'link' => route('products.show', $product),
                ];
            });

        $topCustomers = $user->sales()
            ->select('customer_id', DB::raw('COUNT(*) as total_purchases'))
            ->whereBetween('created_at', [$startOfCurrentMonth, $endOfCurrentMonth])
            ->groupBy('customer_id')
            ->orderByDesc('total_purchases')
            ->take(5)
            ->get()
            ->map(function ($row) {
                $customer = Customer::find($row->customer_id);
                return [
                    'id' => $customer->customer_number,
                    'name' => $customer->name,
                    'value' => $row->total_purchases,
                    'link' => route('customers.show', $customer),
                ];
            });

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
            'revenue' => $this->makeHighlight($currentRevenue, $previousRevenue),
            'sales_count' => $this->makeHighlight($currentSales, $previousSales),
            'customers_count' => $this->makeHighlight($currentCustomers, $previousCustomers),
            'products_count' => $this->makeHighlight($currentProducts, $previousProducts),
            'top_products' => [
                'date' => now()->format('Y-m'),
                'items' => $topProducts,
            ],
            'top_customers' => [
                'date' => now()->format('Y-m'),
                'items' => $topCustomers,
            ],
            'chart_data' => $this->getChart($user),
        ]);
    }

    private function getChart(User $user): array
    {
        $end = now();
        $start = now()->subDays(364); // last 365 days

        $salesData = $user->sales()
            ->selectRaw('DATE(created_at) as date, COUNT(*) as sales')
            ->whereBetween('created_at', [$start, $end])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderByRaw('DATE(created_at)')
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

    function makeHighlight($current, $previous): array {
        $trend = $previous > 0
            ? number_format((($current - $previous) / $previous) * 100, 1) . '%'
            : '∞';
        $direction = $current >= $previous ? 'up' : 'down';

        return [
            'current' => $current,
            'previous' => $previous,
            'trend' => $trend,
            'trend_direction' => $direction,
        ];
    }
}
