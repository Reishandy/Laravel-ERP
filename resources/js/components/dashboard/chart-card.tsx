import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const chartData = [
    {
        date: '2024-07-09',
        sales: 96,
        products: 12,
        customers: 8,
    },
    {
        date: '2024-07-10',
        sales: 107,
        products: 13,
        customers: 8,
    },
    {
        date: '2024-07-11',
        sales: 151,
        products: 12,
        customers: 13,
    },
    {
        date: '2024-07-12',
        sales: 140,
        products: 14,
        customers: 12,
    },
    {
        date: '2024-07-13',
        sales: 180,
        products: 20,
        customers: 13,
    },
    {
        date: '2024-07-14',
        sales: 189,
        products: 17,
        customers: 18,
    },
    {
        date: '2024-07-15',
        sales: 105,
        products: 11,
        customers: 7,
    },
    {
        date: '2024-07-16',
        sales: 94,
        products: 11,
        customers: 6,
    },
    {
        date: '2024-07-17',
        sales: 125,
        products: 12,
        customers: 10,
    },
    {
        date: '2024-07-18',
        sales: 140,
        products: 12,
        customers: 12,
    },
    {
        date: '2024-07-19',
        sales: 129,
        products: 14,
        customers: 9,
    },
    {
        date: '2024-07-20',
        sales: 138,
        products: 12,
        customers: 9,
    },
    {
        date: '2024-07-21',
        sales: 168,
        products: 15,
        customers: 11,
    },
    {
        date: '2024-07-22',
        sales: 116,
        products: 14,
        customers: 8,
    },
    {
        date: '2024-07-23',
        sales: 136,
        products: 11,
        customers: 9,
    },
    {
        date: '2024-07-24',
        sales: 124,
        products: 13,
        customers: 10,
    },
    {
        date: '2024-07-25',
        sales: 152,
        products: 16,
        customers: 13,
    },
    {
        date: '2024-07-26',
        sales: 160,
        products: 14,
        customers: 12,
    },
    {
        date: '2024-07-27',
        sales: 159,
        products: 13,
        customers: 11,
    },
    {
        date: '2024-07-28',
        sales: 147,
        products: 18,
        customers: 9,
    },
    {
        date: '2024-07-29',
        sales: 114,
        products: 11,
        customers: 7,
    },
    {
        date: '2024-07-30',
        sales: 122,
        products: 12,
        customers: 10,
    },
    {
        date: '2024-07-31',
        sales: 110,
        products: 13,
        customers: 8,
    },
    {
        date: '2024-08-01',
        sales: 150,
        products: 12,
        customers: 10,
    },
    {
        date: '2024-08-02',
        sales: 139,
        products: 12,
        customers: 11,
    },
    {
        date: '2024-08-03',
        sales: 141,
        products: 15,
        customers: 14,
    },
    {
        date: '2024-08-04',
        sales: 188,
        products: 23,
        customers: 17,
    },
    {
        date: '2024-08-05',
        sales: 114,
        products: 10,
        customers: 8,
    },
    {
        date: '2024-08-06',
        sales: 110,
        products: 12,
        customers: 8,
    },
    {
        date: '2024-08-07',
        sales: 101,
        products: 11,
        customers: 7,
    },
    {
        date: '2024-08-08',
        sales: 158,
        products: 13,
        customers: 15,
    },
    {
        date: '2024-08-09',
        sales: 146,
        products: 16,
        customers: 12,
    },
    {
        date: '2024-08-10',
        sales: 155,
        products: 19,
        customers: 14,
    },
    {
        date: '2024-08-11',
        sales: 159,
        products: 17,
        customers: 15,
    },
    {
        date: '2024-08-12',
        sales: 97,
        products: 8,
        customers: 8,
    },
    {
        date: '2024-08-13',
        sales: 107,
        products: 8,
        customers: 7,
    },
    {
        date: '2024-08-14',
        sales: 143,
        products: 11,
        customers: 10,
    },
    {
        date: '2024-08-15',
        sales: 127,
        products: 14,
        customers: 9,
    },
    {
        date: '2024-08-16',
        sales: 131,
        products: 14,
        customers: 9,
    },
    {
        date: '2024-08-17',
        sales: 165,
        products: 15,
        customers: 13,
    },
    {
        date: '2024-08-18',
        sales: 179,
        products: 19,
        customers: 16,
    },
    {
        date: '2024-08-19',
        sales: 128,
        products: 14,
        customers: 11,
    },
    {
        date: '2024-08-20',
        sales: 134,
        products: 11,
        customers: 8,
    },
    {
        date: '2024-08-21',
        sales: 104,
        products: 9,
        customers: 8,
    },
    {
        date: '2024-08-22',
        sales: 127,
        products: 12,
        customers: 10,
    },
    {
        date: '2024-08-23',
        sales: 146,
        products: 12,
        customers: 9,
    },
    {
        date: '2024-08-24',
        sales: 139,
        products: 12,
        customers: 9,
    },
    {
        date: '2024-08-25',
        sales: 185,
        products: 18,
        customers: 16,
    },
    {
        date: '2024-08-26',
        sales: 119,
        products: 11,
        customers: 9,
    },
    {
        date: '2024-08-27',
        sales: 137,
        products: 13,
        customers: 9,
    },
    {
        date: '2024-08-28',
        sales: 110,
        products: 12,
        customers: 7,
    },
    {
        date: '2024-08-29',
        sales: 157,
        products: 17,
        customers: 15,
    },
    {
        date: '2024-08-30',
        sales: 170,
        products: 21,
        customers: 15,
    },
    {
        date: '2024-08-31',
        sales: 178,
        products: 19,
        customers: 11,
    },
    {
        date: '2024-09-01',
        sales: 169,
        products: 18,
        customers: 11,
    },
    {
        date: '2024-09-02',
        sales: 125,
        products: 10,
        customers: 9,
    },
    {
        date: '2024-09-03',
        sales: 100,
        products: 10,
        customers: 7,
    },
    {
        date: '2024-09-04',
        sales: 143,
        products: 17,
        customers: 13,
    },
    {
        date: '2024-09-05',
        sales: 127,
        products: 15,
        customers: 9,
    },
    {
        date: '2024-09-06',
        sales: 147,
        products: 18,
        customers: 12,
    },
    {
        date: '2024-09-07',
        sales: 136,
        products: 11,
        customers: 11,
    },
    {
        date: '2024-09-08',
        sales: 183,
        products: 15,
        customers: 16,
    },
    {
        date: '2024-09-09',
        sales: 85,
        products: 7,
        customers: 8,
    },
    {
        date: '2024-09-10',
        sales: 117,
        products: 11,
        customers: 7,
    },
    {
        date: '2024-09-11',
        sales: 129,
        products: 14,
        customers: 12,
    },
    {
        date: '2024-09-12',
        sales: 112,
        products: 12,
        customers: 8,
    },
    {
        date: '2024-09-13',
        sales: 149,
        products: 12,
        customers: 10,
    },
    {
        date: '2024-09-14',
        sales: 162,
        products: 13,
        customers: 11,
    },
    {
        date: '2024-09-15',
        sales: 167,
        products: 18,
        customers: 12,
    },
    {
        date: '2024-09-16',
        sales: 129,
        products: 10,
        customers: 12,
    },
    {
        date: '2024-09-17',
        sales: 100,
        products: 12,
        customers: 7,
    },
    {
        date: '2024-09-18',
        sales: 135,
        products: 11,
        customers: 9,
    },
    {
        date: '2024-09-19',
        sales: 113,
        products: 14,
        customers: 8,
    },
    {
        date: '2024-09-20',
        sales: 137,
        products: 17,
        customers: 9,
    },
    {
        date: '2024-09-21',
        sales: 179,
        products: 19,
        customers: 12,
    },
    {
        date: '2024-09-22',
        sales: 154,
        products: 17,
        customers: 11,
    },
    {
        date: '2024-09-23',
        sales: 97,
        products: 10,
        customers: 8,
    },
    {
        date: '2024-09-24',
        sales: 113,
        products: 14,
        customers: 8,
    },
    {
        date: '2024-09-25',
        sales: 140,
        products: 14,
        customers: 10,
    },
    {
        date: '2024-09-26',
        sales: 127,
        products: 12,
        customers: 9,
    },
    {
        date: '2024-09-27',
        sales: 129,
        products: 12,
        customers: 8,
    },
    {
        date: '2024-09-28',
        sales: 135,
        products: 11,
        customers: 9,
    },
    {
        date: '2024-09-29',
        sales: 157,
        products: 15,
        customers: 10,
    },
    {
        date: '2024-09-30',
        sales: 109,
        products: 12,
        customers: 7,
    },
    {
        date: '2024-10-01',
        sales: 103,
        products: 11,
        customers: 7,
    },
    {
        date: '2024-10-02',
        sales: 103,
        products: 8,
        customers: 6,
    },
    {
        date: '2024-10-03',
        sales: 122,
        products: 15,
        customers: 9,
    },
    {
        date: '2024-10-04',
        sales: 156,
        products: 19,
        customers: 10,
    },
    {
        date: '2024-10-05',
        sales: 141,
        products: 14,
        customers: 14,
    },
    {
        date: '2024-10-06',
        sales: 156,
        products: 15,
        customers: 11,
    },
    {
        date: '2024-10-07',
        sales: 98,
        products: 10,
        customers: 7,
    },
    {
        date: '2024-10-08',
        sales: 105,
        products: 8,
        customers: 7,
    },
    {
        date: '2024-10-09',
        sales: 146,
        products: 13,
        customers: 12,
    },
    {
        date: '2024-10-10',
        sales: 113,
        products: 10,
        customers: 8,
    },
    {
        date: '2024-10-11',
        sales: 169,
        products: 21,
        customers: 14,
    },
    {
        date: '2024-10-12',
        sales: 150,
        products: 15,
        customers: 10,
    },
    {
        date: '2024-10-13',
        sales: 184,
        products: 18,
        customers: 13,
    },
    {
        date: '2024-10-14',
        sales: 102,
        products: 9,
        customers: 6,
    },
    {
        date: '2024-10-15',
        sales: 132,
        products: 12,
        customers: 12,
    },
    {
        date: '2024-10-16',
        sales: 135,
        products: 12,
        customers: 13,
    },
    {
        date: '2024-10-17',
        sales: 149,
        products: 13,
        customers: 11,
    },
    {
        date: '2024-10-18',
        sales: 124,
        products: 11,
        customers: 9,
    },
    {
        date: '2024-10-19',
        sales: 154,
        products: 12,
        customers: 11,
    },
    {
        date: '2024-10-20',
        sales: 143,
        products: 13,
        customers: 10,
    },
    {
        date: '2024-10-21',
        sales: 80,
        products: 6,
        customers: 8,
    },
    {
        date: '2024-10-22',
        sales: 94,
        products: 10,
        customers: 7,
    },
    {
        date: '2024-10-23',
        sales: 119,
        products: 11,
        customers: 11,
    },
    {
        date: '2024-10-24',
        sales: 135,
        products: 16,
        customers: 12,
    },
    {
        date: '2024-10-25',
        sales: 139,
        products: 13,
        customers: 9,
    },
    {
        date: '2024-10-26',
        sales: 140,
        products: 14,
        customers: 9,
    },
    {
        date: '2024-10-27',
        sales: 183,
        products: 16,
        customers: 16,
    },
    {
        date: '2024-10-28',
        sales: 114,
        products: 11,
        customers: 10,
    },
    {
        date: '2024-10-29',
        sales: 101,
        products: 11,
        customers: 10,
    },
    {
        date: '2024-10-30',
        sales: 140,
        products: 12,
        customers: 11,
    },
    {
        date: '2024-10-31',
        sales: 146,
        products: 13,
        customers: 14,
    },
    {
        date: '2024-11-01',
        sales: 153,
        products: 17,
        customers: 12,
    },
    {
        date: '2024-11-02',
        sales: 160,
        products: 13,
        customers: 16,
    },
    {
        date: '2024-11-03',
        sales: 174,
        products: 14,
        customers: 17,
    },
    {
        date: '2024-11-04',
        sales: 125,
        products: 15,
        customers: 8,
    },
    {
        date: '2024-11-05',
        sales: 131,
        products: 13,
        customers: 13,
    },
    {
        date: '2024-11-06',
        sales: 129,
        products: 11,
        customers: 12,
    },
    {
        date: '2024-11-07',
        sales: 136,
        products: 12,
        customers: 9,
    },
    {
        date: '2024-11-08',
        sales: 129,
        products: 14,
        customers: 10,
    },
    {
        date: '2024-11-09',
        sales: 155,
        products: 15,
        customers: 10,
    },
    {
        date: '2024-11-10',
        sales: 181,
        products: 20,
        customers: 13,
    },
    {
        date: '2024-11-11',
        sales: 129,
        products: 10,
        customers: 9,
    },
    {
        date: '2024-11-12',
        sales: 95,
        products: 7,
        customers: 6,
    },
    {
        date: '2024-11-13',
        sales: 133,
        products: 14,
        customers: 8,
    },
    {
        date: '2024-11-14',
        sales: 153,
        products: 13,
        customers: 11,
    },
    {
        date: '2024-11-15',
        sales: 149,
        products: 13,
        customers: 12,
    },
    {
        date: '2024-11-16',
        sales: 177,
        products: 16,
        customers: 17,
    },
    {
        date: '2024-11-17',
        sales: 166,
        products: 18,
        customers: 16,
    },
    {
        date: '2024-11-18',
        sales: 109,
        products: 13,
        customers: 10,
    },
    {
        date: '2024-11-19',
        sales: 102,
        products: 10,
        customers: 7,
    },
    {
        date: '2024-11-20',
        sales: 125,
        products: 12,
        customers: 11,
    },
    {
        date: '2024-11-21',
        sales: 120,
        products: 10,
        customers: 10,
    },
    {
        date: '2024-11-22',
        sales: 165,
        products: 20,
        customers: 12,
    },
    {
        date: '2024-11-23',
        sales: 158,
        products: 19,
        customers: 14,
    },
    {
        date: '2024-11-24',
        sales: 156,
        products: 15,
        customers: 12,
    },
    {
        date: '2024-11-25',
        sales: 87,
        products: 9,
        customers: 6,
    },
    {
        date: '2024-11-26',
        sales: 97,
        products: 12,
        customers: 8,
    },
    {
        date: '2024-11-27',
        sales: 124,
        products: 15,
        customers: 8,
    },
    {
        date: '2024-11-28',
        sales: 133,
        products: 16,
        customers: 11,
    },
    {
        date: '2024-11-29',
        sales: 140,
        products: 11,
        customers: 10,
    },
    {
        date: '2024-11-30',
        sales: 176,
        products: 22,
        customers: 14,
    },
    {
        date: '2024-12-01',
        sales: 164,
        products: 14,
        customers: 10,
    },
    {
        date: '2024-12-02',
        sales: 91,
        products: 8,
        customers: 7,
    },
    {
        date: '2024-12-03',
        sales: 93,
        products: 10,
        customers: 6,
    },
    {
        date: '2024-12-04',
        sales: 110,
        products: 12,
        customers: 11,
    },
    {
        date: '2024-12-05',
        sales: 159,
        products: 19,
        customers: 13,
    },
    {
        date: '2024-12-06',
        sales: 160,
        products: 16,
        customers: 12,
    },
    {
        date: '2024-12-07',
        sales: 152,
        products: 12,
        customers: 10,
    },
    {
        date: '2024-12-08',
        sales: 172,
        products: 15,
        customers: 13,
    },
    {
        date: '2024-12-09',
        sales: 82,
        products: 8,
        customers: 8,
    },
    {
        date: '2024-12-10',
        sales: 92,
        products: 10,
        customers: 6,
    },
    {
        date: '2024-12-11',
        sales: 105,
        products: 9,
        customers: 7,
    },
    {
        date: '2024-12-12',
        sales: 122,
        products: 13,
        customers: 12,
    },
    {
        date: '2024-12-13',
        sales: 138,
        products: 11,
        customers: 10,
    },
    {
        date: '2024-12-14',
        sales: 147,
        products: 14,
        customers: 12,
    },
    {
        date: '2024-12-15',
        sales: 156,
        products: 15,
        customers: 10,
    },
    {
        date: '2024-12-16',
        sales: 122,
        products: 15,
        customers: 9,
    },
    {
        date: '2024-12-17',
        sales: 126,
        products: 14,
        customers: 8,
    },
    {
        date: '2024-12-18',
        sales: 107,
        products: 10,
        customers: 9,
    },
    {
        date: '2024-12-19',
        sales: 145,
        products: 16,
        customers: 11,
    },
    {
        date: '2024-12-20',
        sales: 167,
        products: 16,
        customers: 16,
    },
    {
        date: '2024-12-21',
        sales: 137,
        products: 15,
        customers: 9,
    },
    {
        date: '2024-12-22',
        sales: 190,
        products: 19,
        customers: 13,
    },
    {
        date: '2024-12-23',
        sales: 91,
        products: 11,
        customers: 6,
    },
    {
        date: '2024-12-24',
        sales: 90,
        products: 10,
        customers: 9,
    },
    {
        date: '2024-12-25',
        sales: 149,
        products: 18,
        customers: 11,
    },
    {
        date: '2024-12-26',
        sales: 160,
        products: 13,
        customers: 14,
    },
    {
        date: '2024-12-27',
        sales: 162,
        products: 14,
        customers: 16,
    },
    {
        date: '2024-12-28',
        sales: 178,
        products: 19,
        customers: 16,
    },
    {
        date: '2024-12-29',
        sales: 189,
        products: 23,
        customers: 15,
    },
    {
        date: '2024-12-30',
        sales: 116,
        products: 9,
        customers: 7,
    },
    {
        date: '2024-12-31',
        sales: 132,
        products: 11,
        customers: 10,
    },
    {
        date: '2025-01-01',
        sales: 142,
        products: 17,
        customers: 14,
    },
    {
        date: '2025-01-02',
        sales: 115,
        products: 12,
        customers: 9,
    },
    {
        date: '2025-01-03',
        sales: 127,
        products: 10,
        customers: 8,
    },
    {
        date: '2025-01-04',
        sales: 175,
        products: 17,
        customers: 15,
    },
    {
        date: '2025-01-05',
        sales: 149,
        products: 14,
        customers: 11,
    },
    {
        date: '2025-01-06',
        sales: 100,
        products: 11,
        customers: 10,
    },
    {
        date: '2025-01-07',
        sales: 136,
        products: 15,
        customers: 9,
    },
    {
        date: '2025-01-08',
        sales: 146,
        products: 14,
        customers: 13,
    },
    {
        date: '2025-01-09',
        sales: 110,
        products: 9,
        customers: 10,
    },
    {
        date: '2025-01-10',
        sales: 158,
        products: 13,
        customers: 14,
    },
    {
        date: '2025-01-11',
        sales: 180,
        products: 22,
        customers: 16,
    },
    {
        date: '2025-01-12',
        sales: 185,
        products: 16,
        customers: 15,
    },
    {
        date: '2025-01-13',
        sales: 107,
        products: 11,
        customers: 7,
    },
    {
        date: '2025-01-14',
        sales: 112,
        products: 10,
        customers: 11,
    },
    {
        date: '2025-01-15',
        sales: 140,
        products: 17,
        customers: 10,
    },
    {
        date: '2025-01-16',
        sales: 156,
        products: 19,
        customers: 12,
    },
    {
        date: '2025-01-17',
        sales: 135,
        products: 15,
        customers: 12,
    },
    {
        date: '2025-01-18',
        sales: 161,
        products: 16,
        customers: 10,
    },
    {
        date: '2025-01-19',
        sales: 180,
        products: 16,
        customers: 15,
    },
    {
        date: '2025-01-20',
        sales: 121,
        products: 11,
        customers: 10,
    },
    {
        date: '2025-01-21',
        sales: 114,
        products: 12,
        customers: 8,
    },
    {
        date: '2025-01-22',
        sales: 139,
        products: 12,
        customers: 10,
    },
    {
        date: '2025-01-23',
        sales: 123,
        products: 15,
        customers: 11,
    },
    {
        date: '2025-01-24',
        sales: 160,
        products: 13,
        customers: 13,
    },
    {
        date: '2025-01-25',
        sales: 166,
        products: 20,
        customers: 11,
    },
    {
        date: '2025-01-26',
        sales: 187,
        products: 20,
        customers: 17,
    },
    {
        date: '2025-01-27',
        sales: 125,
        products: 15,
        customers: 8,
    },
    {
        date: '2025-01-28',
        sales: 110,
        products: 10,
        customers: 11,
    },
    {
        date: '2025-01-29',
        sales: 125,
        products: 10,
        customers: 10,
    },
    {
        date: '2025-01-30',
        sales: 143,
        products: 13,
        customers: 11,
    },
    {
        date: '2025-01-31',
        sales: 124,
        products: 13,
        customers: 11,
    },
    {
        date: '2025-02-01',
        sales: 163,
        products: 14,
        customers: 10,
    },
    {
        date: '2025-02-02',
        sales: 181,
        products: 15,
        customers: 15,
    },
    {
        date: '2025-02-03',
        sales: 94,
        products: 8,
        customers: 7,
    },
    {
        date: '2025-02-04',
        sales: 115,
        products: 10,
        customers: 8,
    },
    {
        date: '2025-02-05',
        sales: 101,
        products: 10,
        customers: 7,
    },
    {
        date: '2025-02-06',
        sales: 114,
        products: 9,
        customers: 10,
    },
    {
        date: '2025-02-07',
        sales: 165,
        products: 16,
        customers: 16,
    },
    {
        date: '2025-02-08',
        sales: 144,
        products: 13,
        customers: 12,
    },
    {
        date: '2025-02-09',
        sales: 140,
        products: 11,
        customers: 14,
    },
    {
        date: '2025-02-10',
        sales: 88,
        products: 8,
        customers: 8,
    },
    {
        date: '2025-02-11',
        sales: 126,
        products: 10,
        customers: 12,
    },
    {
        date: '2025-02-12',
        sales: 125,
        products: 12,
        customers: 8,
    },
    {
        date: '2025-02-13',
        sales: 127,
        products: 11,
        customers: 10,
    },
    {
        date: '2025-02-14',
        sales: 144,
        products: 16,
        customers: 14,
    },
    {
        date: '2025-02-15',
        sales: 150,
        products: 16,
        customers: 12,
    },
    {
        date: '2025-02-16',
        sales: 145,
        products: 12,
        customers: 9,
    },
    {
        date: '2025-02-17',
        sales: 125,
        products: 12,
        customers: 11,
    },
    {
        date: '2025-02-18',
        sales: 138,
        products: 15,
        customers: 9,
    },
    {
        date: '2025-02-19',
        sales: 101,
        products: 11,
        customers: 9,
    },
    {
        date: '2025-02-20',
        sales: 118,
        products: 9,
        customers: 11,
    },
    {
        date: '2025-02-21',
        sales: 129,
        products: 16,
        customers: 12,
    },
    {
        date: '2025-02-22',
        sales: 134,
        products: 14,
        customers: 10,
    },
    {
        date: '2025-02-23',
        sales: 142,
        products: 14,
        customers: 10,
    },
    {
        date: '2025-02-24',
        sales: 84,
        products: 8,
        customers: 8,
    },
    {
        date: '2025-02-25',
        sales: 112,
        products: 12,
        customers: 8,
    },
    {
        date: '2025-02-26',
        sales: 127,
        products: 12,
        customers: 9,
    },
    {
        date: '2025-02-27',
        sales: 127,
        products: 12,
        customers: 8,
    },
    {
        date: '2025-02-28',
        sales: 121,
        products: 11,
        customers: 10,
    },
    {
        date: '2025-03-01',
        sales: 169,
        products: 16,
        customers: 16,
    },
    {
        date: '2025-03-02',
        sales: 147,
        products: 18,
        customers: 9,
    },
    {
        date: '2025-03-03',
        sales: 84,
        products: 10,
        customers: 7,
    },
    {
        date: '2025-03-04',
        sales: 119,
        products: 11,
        customers: 7,
    },
    {
        date: '2025-03-05',
        sales: 128,
        products: 11,
        customers: 10,
    },
    {
        date: '2025-03-06',
        sales: 121,
        products: 10,
        customers: 8,
    },
    {
        date: '2025-03-07',
        sales: 128,
        products: 12,
        customers: 9,
    },
    {
        date: '2025-03-08',
        sales: 137,
        products: 15,
        customers: 11,
    },
    {
        date: '2025-03-09',
        sales: 155,
        products: 19,
        customers: 15,
    },
    {
        date: '2025-03-10',
        sales: 121,
        products: 15,
        customers: 12,
    },
    {
        date: '2025-03-11',
        sales: 134,
        products: 16,
        customers: 12,
    },
    {
        date: '2025-03-12',
        sales: 143,
        products: 13,
        customers: 10,
    },
    {
        date: '2025-03-13',
        sales: 134,
        products: 14,
        customers: 9,
    },
    {
        date: '2025-03-14',
        sales: 169,
        products: 14,
        customers: 16,
    },
    {
        date: '2025-03-15',
        sales: 139,
        products: 15,
        customers: 9,
    },
    {
        date: '2025-03-16',
        sales: 185,
        products: 23,
        customers: 14,
    },
    {
        date: '2025-03-17',
        sales: 82,
        products: 9,
        customers: 6,
    },
    {
        date: '2025-03-18',
        sales: 103,
        products: 8,
        customers: 9,
    },
    {
        date: '2025-03-19',
        sales: 120,
        products: 15,
        customers: 10,
    },
    {
        date: '2025-03-20',
        sales: 137,
        products: 15,
        customers: 11,
    },
    {
        date: '2025-03-21',
        sales: 166,
        products: 13,
        customers: 12,
    },
    {
        date: '2025-03-22',
        sales: 155,
        products: 17,
        customers: 15,
    },
    {
        date: '2025-03-23',
        sales: 179,
        products: 16,
        customers: 16,
    },
    {
        date: '2025-03-24',
        sales: 102,
        products: 10,
        customers: 7,
    },
    {
        date: '2025-03-25',
        sales: 104,
        products: 9,
        customers: 10,
    },
    {
        date: '2025-03-26',
        sales: 144,
        products: 18,
        customers: 10,
    },
    {
        date: '2025-03-27',
        sales: 152,
        products: 12,
        customers: 10,
    },
    {
        date: '2025-03-28',
        sales: 168,
        products: 15,
        customers: 15,
    },
    {
        date: '2025-03-29',
        sales: 146,
        products: 12,
        customers: 12,
    },
    {
        date: '2025-03-30',
        sales: 186,
        products: 16,
        customers: 14,
    },
    {
        date: '2025-03-31',
        sales: 85,
        products: 9,
        customers: 6,
    },
    {
        date: '2025-04-01',
        sales: 109,
        products: 10,
        customers: 9,
    },
    {
        date: '2025-04-02',
        sales: 121,
        products: 15,
        customers: 8,
    },
    {
        date: '2025-04-03',
        sales: 147,
        products: 13,
        customers: 11,
    },
    {
        date: '2025-04-04',
        sales: 161,
        products: 16,
        customers: 13,
    },
    {
        date: '2025-04-05',
        sales: 177,
        products: 16,
        customers: 12,
    },
    {
        date: '2025-04-06',
        sales: 154,
        products: 14,
        customers: 11,
    },
    {
        date: '2025-04-07',
        sales: 98,
        products: 8,
        customers: 7,
    },
    {
        date: '2025-04-08',
        sales: 115,
        products: 12,
        customers: 10,
    },
    {
        date: '2025-04-09',
        sales: 102,
        products: 9,
        customers: 10,
    },
    {
        date: '2025-04-10',
        sales: 159,
        products: 13,
        customers: 11,
    },
    {
        date: '2025-04-11',
        sales: 156,
        products: 19,
        customers: 13,
    },
    {
        date: '2025-04-12',
        sales: 147,
        products: 12,
        customers: 9,
    },
    {
        date: '2025-04-13',
        sales: 174,
        products: 17,
        customers: 11,
    },
    {
        date: '2025-04-14',
        sales: 128,
        products: 10,
        customers: 10,
    },
    {
        date: '2025-04-15',
        sales: 91,
        products: 8,
        customers: 8,
    },
    {
        date: '2025-04-16',
        sales: 134,
        products: 16,
        customers: 11,
    },
    {
        date: '2025-04-17',
        sales: 113,
        products: 10,
        customers: 7,
    },
    {
        date: '2025-04-18',
        sales: 167,
        products: 13,
        customers: 11,
    },
    {
        date: '2025-04-19',
        sales: 134,
        products: 16,
        customers: 13,
    },
    {
        date: '2025-04-20',
        sales: 170,
        products: 21,
        customers: 15,
    },
    {
        date: '2025-04-21',
        sales: 110,
        products: 9,
        customers: 7,
    },
    {
        date: '2025-04-22',
        sales: 132,
        products: 14,
        customers: 8,
    },
    {
        date: '2025-04-23',
        sales: 125,
        products: 15,
        customers: 11,
    },
    {
        date: '2025-04-24',
        sales: 150,
        products: 13,
        customers: 10,
    },
    {
        date: '2025-04-25',
        sales: 126,
        products: 11,
        customers: 8,
    },
    {
        date: '2025-04-26',
        sales: 176,
        products: 19,
        customers: 16,
    },
    {
        date: '2025-04-27',
        sales: 164,
        products: 16,
        customers: 10,
    },
    {
        date: '2025-04-28',
        sales: 83,
        products: 10,
        customers: 6,
    },
    {
        date: '2025-04-29',
        sales: 108,
        products: 9,
        customers: 8,
    },
    {
        date: '2025-04-30',
        sales: 117,
        products: 13,
        customers: 9,
    },
    {
        date: '2025-05-01',
        sales: 114,
        products: 11,
        customers: 8,
    },
    {
        date: '2025-05-02',
        sales: 134,
        products: 16,
        customers: 13,
    },
    {
        date: '2025-05-03',
        sales: 163,
        products: 14,
        customers: 14,
    },
    {
        date: '2025-05-04',
        sales: 143,
        products: 17,
        customers: 14,
    },
    {
        date: '2025-05-05',
        sales: 97,
        products: 12,
        customers: 8,
    },
    {
        date: '2025-05-06',
        sales: 111,
        products: 12,
        customers: 9,
    },
    {
        date: '2025-05-07',
        sales: 106,
        products: 8,
        customers: 7,
    },
    {
        date: '2025-05-08',
        sales: 146,
        products: 12,
        customers: 9,
    },
    {
        date: '2025-05-09',
        sales: 124,
        products: 13,
        customers: 9,
    },
    {
        date: '2025-05-10',
        sales: 163,
        products: 20,
        customers: 10,
    },
    {
        date: '2025-05-11',
        sales: 156,
        products: 15,
        customers: 12,
    },
    {
        date: '2025-05-12',
        sales: 90,
        products: 10,
        customers: 6,
    },
    {
        date: '2025-05-13',
        sales: 121,
        products: 13,
        customers: 11,
    },
    {
        date: '2025-05-14',
        sales: 148,
        products: 13,
        customers: 10,
    },
    {
        date: '2025-05-15',
        sales: 112,
        products: 11,
        customers: 8,
    },
    {
        date: '2025-05-16',
        sales: 122,
        products: 15,
        customers: 9,
    },
    {
        date: '2025-05-17',
        sales: 180,
        products: 22,
        customers: 15,
    },
    {
        date: '2025-05-18',
        sales: 141,
        products: 11,
        customers: 11,
    },
    {
        date: '2025-05-19',
        sales: 121,
        products: 13,
        customers: 11,
    },
    {
        date: '2025-05-20',
        sales: 120,
        products: 12,
        customers: 10,
    },
    {
        date: '2025-05-21',
        sales: 128,
        products: 16,
        customers: 10,
    },
    {
        date: '2025-05-22',
        sales: 158,
        products: 13,
        customers: 14,
    },
    {
        date: '2025-05-23',
        sales: 130,
        products: 13,
        customers: 8,
    },
    {
        date: '2025-05-24',
        sales: 166,
        products: 16,
        customers: 16,
    },
    {
        date: '2025-05-25',
        sales: 154,
        products: 17,
        customers: 12,
    },
    {
        date: '2025-05-26',
        sales: 124,
        products: 15,
        customers: 8,
    },
    {
        date: '2025-05-27',
        sales: 130,
        products: 16,
        customers: 13,
    },
    {
        date: '2025-05-28',
        sales: 105,
        products: 9,
        customers: 9,
    },
    {
        date: '2025-05-29',
        sales: 143,
        products: 15,
        customers: 11,
    },
    {
        date: '2025-05-30',
        sales: 143,
        products: 15,
        customers: 14,
    },
    {
        date: '2025-05-31',
        sales: 141,
        products: 17,
        customers: 14,
    },
    {
        date: '2025-06-01',
        sales: 183,
        products: 20,
        customers: 18,
    },
    {
        date: '2025-06-02',
        sales: 117,
        products: 10,
        customers: 9,
    },
    {
        date: '2025-06-03',
        sales: 105,
        products: 13,
        customers: 10,
    },
    {
        date: '2025-06-04',
        sales: 108,
        products: 12,
        customers: 9,
    },
    {
        date: '2025-06-05',
        sales: 137,
        products: 11,
        customers: 9,
    },
    {
        date: '2025-06-06',
        sales: 125,
        products: 11,
        customers: 12,
    },
    {
        date: '2025-06-07',
        sales: 169,
        products: 21,
        customers: 16,
    },
    {
        date: '2025-06-08',
        sales: 165,
        products: 18,
        customers: 15,
    },
    {
        date: '2025-06-09',
        sales: 115,
        products: 14,
        customers: 11,
    },
    {
        date: '2025-06-10',
        sales: 120,
        products: 15,
        customers: 10,
    },
    {
        date: '2025-06-11',
        sales: 124,
        products: 12,
        customers: 11,
    },
    {
        date: '2025-06-12',
        sales: 159,
        products: 15,
        customers: 13,
    },
    {
        date: '2025-06-13',
        sales: 143,
        products: 15,
        customers: 13,
    },
    {
        date: '2025-06-14',
        sales: 167,
        products: 16,
        customers: 15,
    },
    {
        date: '2025-06-15',
        sales: 149,
        products: 13,
        customers: 11,
    },
    {
        date: '2025-06-16',
        sales: 93,
        products: 8,
        customers: 6,
    },
    {
        date: '2025-06-17',
        sales: 130,
        products: 10,
        customers: 13,
    },
    {
        date: '2025-06-18',
        sales: 140,
        products: 15,
        customers: 10,
    },
    {
        date: '2025-06-19',
        sales: 141,
        products: 17,
        customers: 9,
    },
    {
        date: '2025-06-20',
        sales: 163,
        products: 20,
        customers: 11,
    },
    {
        date: '2025-06-21',
        sales: 173,
        products: 14,
        customers: 11,
    },
    {
        date: '2025-06-22',
        sales: 141,
        products: 11,
        customers: 12,
    },
    {
        date: '2025-06-23',
        sales: 129,
        products: 14,
        customers: 10,
    },
    {
        date: '2025-06-24',
        sales: 97,
        products: 8,
        customers: 9,
    },
    {
        date: '2025-06-25',
        sales: 122,
        products: 13,
        customers: 8,
    },
    {
        date: '2025-06-26',
        sales: 156,
        products: 15,
        customers: 14,
    },
    {
        date: '2025-06-27',
        sales: 131,
        products: 13,
        customers: 13,
    },
    {
        date: '2025-06-28',
        sales: 139,
        products: 12,
        customers: 9,
    },
    {
        date: '2025-06-29',
        sales: 159,
        products: 15,
        customers: 13,
    },
    {
        date: '2025-06-30',
        sales: 114,
        products: 9,
        customers: 11,
    },
    {
        date: '2025-07-01',
        sales: 114,
        products: 14,
        customers: 7,
    },
    {
        date: '2025-07-02',
        sales: 124,
        products: 13,
        customers: 12,
    },
    {
        date: '2025-07-03',
        sales: 116,
        products: 14,
        customers: 11,
    },
    {
        date: '2025-07-04',
        sales: 147,
        products: 14,
        customers: 9,
    },
    {
        date: '2025-07-05',
        sales: 160,
        products: 16,
        customers: 16,
    },
    {
        date: '2025-07-06',
        sales: 147,
        products: 18,
        customers: 14,
    },
    {
        date: '2025-07-07',
        sales: 128,
        products: 10,
        customers: 8,
    },
    {
        date: '2025-07-08',
        sales: 101,
        products: 10,
        customers: 8,
    },
];

const chartConfig = {
    performance: {
        label: 'Performance',
    },
    sales: {
        label: 'Sales',
        color: 'var(--chart-1)',
    },
    products: {
        label: 'Products',
        color: 'var(--chart-2)',
    },
    customers: {
        label: 'Customers',
        color: 'var(--chart-3)',
    },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
    const [timeRange, setTimeRange] = React.useState('7d');
    const [type, setType] = React.useState('monotone');

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date("2025-07-08"); // TODO: change to now
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
                        Showing total performance for the last{' '}
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
