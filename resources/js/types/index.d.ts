import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    company: string
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Customer {
    id: number
    user_id: number
    customer_number: string
    name: string
    email: string
    avatar?: string
    type: "individual" | "business"
    created_at: string;
    updated_at: string;
    sales_count?: number;
    [key: string]: unknown;
}

export interface Product {
    id: number
    user_id: string
    product_number: string
    name: string
    description?: string
    image?: string
    price: number
    quantity: number
    created_at: string;
    updated_at: string;
    sales_count?: number;
    [key: string]: unknown;
}

export interface Sale {
    id: number
    user_id: number
    product_id: number
    customer_id: number
    sale_number: string
    quantity: number
    price_at_sale: number
    total_price: number
    status: "pending" | "processing" | "completed"
    created_at: string | Date
    updated_at: string | Date
    [key: string]: unknown;
}
