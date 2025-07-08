<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ExportController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $type): StreamedResponse
    {
        $user = $request->user();

        return match ($type) {
            'sales' => $this->exportSales($user),
            'products' => $this->exportProducts($user),
            'customers' => $this->exportCustomers($user),
            default => throw new NotFoundHttpException('Invalid export type'),
        };
    }

    private function exportSales(User $user): StreamedResponse
    {
        $filename = 'sales-export-' . now()->format('Y-m-d') . '.csv';

        $sales = $user->sales()
            ->with(['product', 'customer'])
            ->orderByDesc('created_at')
            ->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ];

        return response()->stream(function () use ($sales) {
            $handle = fopen('php://output', 'w');

            // Write CSV header
            fputcsv($handle, ['Sale ID', 'Product', 'Customer', 'Quantity', 'Total Price', 'Status', 'Created At', 'Updated At']);

            // Write data rows
            foreach ($sales as $sale) {
                fputcsv($handle, [
                    $sale->sale_number,
                    $sale->product->name ?? 'N/A',
                    $sale->customer->name ?? 'N/A',
                    $sale->quantity,
                    $sale->total_price,
                    ucfirst($sale->status),
                    $sale->created_at->format('Y-m-d H:i'),
                    $sale->updated_at->format('Y-m-d H:i'),
                ]);
            }

            fclose($handle);
        }, 200, $headers);
    }

    private function exportProducts(User $user): StreamedResponse
    {
        $filename = 'products-export-' . now()->format('Y-m-d') . '.csv';

        $products = $user->products()
            ->orderByDesc('created_at')
            ->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ];

        return response()->stream(function () use ($products) {
            $handle = fopen('php://output', 'w');

            // Write CSV header
            fputcsv($handle, ['Product ID', 'Name', 'Description', 'Price', 'Quantity', 'Created At', 'Updated At']);

            // Write data rows
            foreach ($products as $product) {
                fputcsv($handle, [
                    $product->product_number,
                    $product->name,
                    $product->description ?? '',
                    $product->price,
                    $product->quantity,
                    $product->created_at->format('Y-m-d H:i'),
                    $product->updated_at->format('Y-m-d H:i'),
                ]);
            }

            fclose($handle);
        }, 200, $headers);
    }

    private function exportCustomers(User $user): StreamedResponse
    {
        $filename = 'customers-export-' . now()->format('Y-m-d') . '.csv';

        $customers = $user->customers()
            ->orderByDesc('created_at')
            ->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ];

        return response()->stream(function () use ($customers) {
            $handle = fopen('php://output', 'w');

            // Write CSV header
            fputcsv($handle, ['Customer ID', 'Name', 'Email', 'Created At', 'Updated At']);

            // Write data rows
            foreach ($customers as $customer) {
                fputcsv($handle, [
                    $customer->customer_number,
                    $customer->name,
                    $customer->email,
                    $customer->created_at->format('Y-m-d H:i'),
                    $customer->updated_at->format('Y-m-d H:i'),
                ]);
            }

            fclose($handle);
        }, 200, $headers);
    }
}
