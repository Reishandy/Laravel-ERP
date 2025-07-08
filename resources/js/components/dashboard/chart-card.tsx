import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Chart {
    date: string;
    sales: number;
    revenue: number;
    customers: number;
}

interface ChartCardProps {
    chart_data: Chart[];
}

const chartConfig = {
    performance: {
        label: 'Performance',
    },
    sales: {
        label: 'New Sales',
        color: 'var(--chart-1)',
    },
    products: {
        label: 'New Products',
        color: 'var(--chart-2)',
    },
    customers: {
        label: 'New Customers',
        color: 'var(--chart-3)',
    },
} satisfies ChartConfig;

export function ChartCard({ chart_data }: ChartCardProps) {
    const [timeRange, setTimeRange] = React.useState('30d');
    const [type, setType] = React.useState('monotone');

    const filteredData = chart_data.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date();
        let daysToSubtract = 7;
        switch (timeRange) {
            case '365d':
                daysToSubtract = 365;
                break;
            case '90d':
                daysToSubtract = 90;
                break;
            case '30d':
                daysToSubtract = 30;
                break;
            case '7d':
                daysToSubtract = 7;
                break;
            default:
                return true; // If no valid time range is selected, show all data
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    return (
        <Card className="size-full pt-0">
            <CardHeader className="flex h-fit flex-col items-start gap-4 border-b py-5 sm:flex-row sm:items-center">
                <div className="grid flex-1 gap-1">
                    <CardTitle className="text-lg">Performance chart</CardTitle>
                    <CardDescription>
                        Showing new data for the last{' '}
                        <span>
                            {timeRange === '365d' ? '12 months' : timeRange === '90d' ? '3 months' : timeRange === '30d' ? '30 days' : '7 days'}
                        </span>
                    </CardDescription>
                </div>
                <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:ml-auto sm:w-fit">
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
                            <SelectValue placeholder="Chart type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="monotone" className="rounded-lg">
                                Monotone
                            </SelectItem>
                            <SelectItem value="basis" className="rounded-lg">
                                Basis
                            </SelectItem>
                            <SelectItem value="natural" className="rounded-lg">
                                Natural
                            </SelectItem>
                            <SelectItem value="linear" className="rounded-lg">
                                Linear
                            </SelectItem>
                            <SelectItem value="step" className="rounded-lg">
                                Step
                            </SelectItem>
                            <SelectItem value="stepBefore" className="rounded-lg">
                                Step Before
                            </SelectItem>
                            <SelectItem value="stepAfter" className="rounded-lg">
                                Step After
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
                            <SelectValue placeholder="Last 30 days" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="365d" className="rounded-lg">
                                Last 12 months
                            </SelectItem>
                            <SelectItem value="90d" className="rounded-lg">
                                Last 3 months
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="size-full px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto size-full">
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillProducts" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-products)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-products)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillCustomers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-customers)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-customers)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area dataKey="customers" type={type} fill="url(#fillCustomers)" stroke="var(--color-customers)" stackId="a" />
                        <Area dataKey="products" type={type} fill="url(#fillProducts)" stroke="var(--color-products)" stackId="a" />
                        <Area dataKey="sales" type={type} fill="url(#fillSales)" stroke="var(--color-sales)" stackId="a" />
                        <ChartLegend content={<ChartLegendContent payload={undefined} />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
