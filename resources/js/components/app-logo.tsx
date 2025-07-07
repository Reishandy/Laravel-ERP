import { User } from '@/types';
import AppLogoIcon from './app-logo-icon';
import { usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

interface PageProps {
    auth: {
        user: User;
    };
    [key: string]: unknown; // Add index signature to satisfy Inertia.js requirements
}

export default function AppLogo() {

    const { auth } = usePage<PageProps>().props;
    const getInitials = useInitials();

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
                {auth.user?.avatar ? (
                    <Avatar className="size-8 overflow-hidden rounded-full">
                        <AvatarImage src={'/storage/' + auth.user.avatar} alt={auth.user.name} />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(auth.user?.name || 'ERP')}
                        </AvatarFallback>
                    </Avatar>
                ) : <AppLogoIcon/>}
            </div>
            <div className="ml-1 grid flex-1 text-left">
                <span className="mb-0.5 line-clamp-3 leading-tight font-semibold">
                    {auth.user?.company || 'ERP'}
                </span>
            </div>
        </>
    );
}
