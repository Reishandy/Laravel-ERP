import { User } from '@/types';
// import AppLogoIcon from './app-logo-icon';
import { usePage } from '@inertiajs/react';

interface PageProps {
    auth: {
        user: User;
    };
    [key: string]: unknown; // Add index signature to satisfy Inertia.js requirements
}

export default function AppLogo() {

    const { auth } = usePage<PageProps>().props;

    return (
        <>
            {/*<div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">*/}
            {/*    /!*<AppLogoIcon className="size-5 fill-current text-white dark:text-black" />*!/*/}
            {/*</div>*/}
            <div className="ml-1 grid flex-1 text-left">
                <span className="mb-0.5 line-clamp-3 leading-tight font-semibold">
                    {auth.user?.company || 'ERP'}
                </span>
            </div>
        </>
    );
}
