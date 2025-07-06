'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ComboBoxProps {
    label: string;
    datas: Data[];
    onChange: (value: string) => void;
    value?: string;
}

interface DataListProps {
    setOpen: (open: boolean) => void;
    setSelectedData: (data: Data | null) => void;
    label: string;
    datas: Data[];
    onChange: (value: string) => void;
}

type Data = {
    value: string;
    label: string;
};

export function ComboBox({ label, datas, onChange, value }: ComboBoxProps) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width: 640px)');
    const [selectedData, setSelectedData] = React.useState<Data | null>(null);

    React.useEffect(() => {
        if (value) {
            setSelectedData(datas.find((d) => d.value === value) || null);
        } else {
            setSelectedData(null);
        }
    }, [value, datas]);

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        {selectedData ? <span>{selectedData.label}</span> : <span className="text-muted-foreground">Set {label}...</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start" side="bottom" style={{ minWidth: '461.5px' }}>
                    <DataList setOpen={setOpen} setSelectedData={setSelectedData} label={label} datas={datas} onChange={onChange} />
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                    {selectedData ? <span>{selectedData.label}</span> : <span className="text-muted-foreground">Set {label}...</span>}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <DataList setOpen={setOpen} setSelectedData={setSelectedData} label={label} datas={datas} onChange={onChange} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function DataList({ setOpen, setSelectedData, label, datas, onChange }: DataListProps) {
    return (
        <Command>
            <CommandInput placeholder={`Filter ${label}...`} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {datas.map((data) => (
                        <CommandItem
                            key={data.label}
                            value={data.label}
                            onSelect={() => {
                                setSelectedData(datas.find((priority) => priority.value === data.value) || null);
                                onChange(data.value);
                                setOpen(false);
                            }}
                        >
                            {data.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
