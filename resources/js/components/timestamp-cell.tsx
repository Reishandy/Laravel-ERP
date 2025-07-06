import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import * as React from 'react';
import { Button } from '@/components/ui/button';

interface TimestampCellProps {
    primaryDate: string | Date;
    secondaryDate?: string | Date;
    locale: string;
    timezone: string;
    primaryLabel?: string;
    secondaryLabel?: string;
}

function getTimeDiffText(primary: Date, secondary: Date) {
    const diffMs = Math.abs(primary.getTime() - secondary.getTime());

    const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
    if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;

    const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
    if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;

    return 'Just now';
}

function getRelativeTimeText(date: Date) {
    const now = new Date();
    return getTimeDiffText(now, date);
}

function InfoDisplay({
    primary,
    secondary,
    locale,
    timezone,
    primaryLabel,
    secondaryLabel,
}: {
    primary: Date;
    secondary: Date | null;
    locale: string;
    timezone: string;
    primaryLabel: string;
    secondaryLabel: string;
}) {
    return (
        <>
            <h3 className="font-medium text-muted-foreground">Timestamp Details:</h3>
            <p>
                {primaryLabel}:{' '}
                {primary.toLocaleString(locale, {
                    timeZone: timezone,
                    dateStyle: 'full',
                    timeStyle: 'medium',
                })}
            </p>
            {secondary && (
                <>
                    <p>
                        {secondaryLabel}:{' '}
                        {secondary.toLocaleString(locale, {
                            timeZone: timezone,
                            dateStyle: 'full',
                            timeStyle: 'medium',
                        })}
                    </p>
                    <p>Difference: {getTimeDiffText(primary, secondary)}</p>
                </>
            )}
        </>
    );
}

export default function TimestampCell({
    primaryDate,
    secondaryDate,
    locale,
    timezone,
    primaryLabel = 'Date',
    secondaryLabel = 'Related date',
}: TimestampCellProps) {
    const primary = new Date(primaryDate);
    const secondary = secondaryDate ? new Date(secondaryDate) : null;
    const isDesktop = useMediaQuery('(min-width: 640px)');
    const [open, setOpen] = React.useState(false);

    const triggerContent = (
        <Button
            variant="outline"
            onClick={() => !isDesktop && setOpen(true)}
            onMouseEnter={() => isDesktop && setOpen(true)}
            onMouseLeave={() => isDesktop && setOpen(false)}
        >
            <span>{getRelativeTimeText(primary)}</span>
        </Button>
    );

    return (
        <div className="text-center">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>{triggerContent}</PopoverTrigger>
                <PopoverContent className="w-auto">
                    <InfoDisplay
                        primary={primary}
                        secondary={secondary}
                        locale={locale}
                        timezone={timezone}
                        primaryLabel={primaryLabel}
                        secondaryLabel={secondaryLabel}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
