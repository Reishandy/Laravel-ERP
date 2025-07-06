import React from 'react';
import { Button } from '@/components/ui/button';


interface QuickAddProps {
    setData: (key: string, value: number) => void;
    number: number;
    processing: boolean;
    children: React.ReactNode;
}

export default function QuickAdd({ setData, number, processing, children }: QuickAddProps) {
    return (
        <div className="items-center flex flex-row gap-x-1">
            <div className="flex flex-row items-center gap-x-1">
                <Button
                    variant="outline"
                    size="sm"
                    className="p-2 "
                    onClick={() => setData('quantity', Math.max(0, number - 100))}
                    disabled={processing || number < 100}
                >
                    - 100
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="p-2 "
                    onClick={() => setData('quantity', Math.max(0, number - 10))}
                    disabled={processing || number < 10}
                >
                    - 10
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="p-2 "
                    onClick={() => setData('quantity', Math.max(0, number - 1))}
                    disabled={processing || number < 1}
                >
                    - 1
                </Button>
            </div>

            {children}

            <div className="flex flex-row items-center gap-x-1">
                <Button
                    variant="outline"
                    size="sm"
                    className="p-2 "
                    onClick={() => setData('quantity', number + 1)}
                    disabled={processing}
                >
                    + 1
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="p-2 "
                    onClick={() => setData('quantity', number + 10)}
                    disabled={processing}
                >
                    + 10
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="p-2 "
                    onClick={() => setData('quantity', number + 100)}
                    disabled={processing}
                >
                    + 100
                </Button>
            </div>
        </div>
    )
}
