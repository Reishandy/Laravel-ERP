import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [loadingHref, setLoadingHref] = useState<string | null>(null);

    const handleClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();

        if (loadingHref) return; // Prevent multiple clicks

        setLoadingHref(href);

        router.visit(href, {
            preserveState: true,
            onFinish: () => setLoadingHref(null),
        });
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                            <a href={item.href} onClick={(e) => handleClick(e, item.href)}>
                                {loadingHref === item.href ? <Ring size="12" stroke="2" speed="2.5" color="gray" /> : item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
