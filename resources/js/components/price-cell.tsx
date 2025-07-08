import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import * as React from 'react';

interface PriceCellProps {
    totalPrice: number | string;
    priceAtSale: number | string;
    currentPrice: number | string;
    quantity: number;
    locale: string;
    currency: string;
}

function PriceDetails({ totalPrice, priceAtSale, currentPrice, quantity, locale, currency }: PriceCellProps) {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    });

    return (
        <>
            <p className="font-medium text-muted-foreground">Sale price details:</p>
            <p>Total price: {formatter.format(Number(totalPrice))}</p>
            <p>Price at sale time: {formatter.format(Number(priceAtSale))}</p>
            <p>Current price: {formatter.format(Number(currentPrice))}</p>
            <p>Quantity: {quantity}</p>
        </>
    );
}

export default function PriceCell({ totalPrice, priceAtSale, currentPrice, quantity, locale, currency }: PriceCellProps) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width: 640px)');
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    });

    const formattedPrice = formatter.format(Number(totalPrice));
    const hasChanged = totalPrice !== Math.round((Number(currentPrice) * quantity + Number.EPSILON) * 100) / 100;

    return (
        <div className="text-center font-medium">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="h-auto px-2 py-0 font-medium"
                        onClick={() => !isDesktop && setOpen(true)}
                        onMouseEnter={() => isDesktop && setOpen(true)}
                        onMouseLeave={() => isDesktop && setOpen(false)}
                    >
                        <div>
                            {formattedPrice}
                            {hasChanged && <span className="text-xl text-primary">*</span>}
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                    <PriceDetails
                        totalPrice={totalPrice}
                        priceAtSale={priceAtSale}
                        currentPrice={currentPrice}
                        quantity={quantity}
                        locale={locale}
                        currency={currency}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
