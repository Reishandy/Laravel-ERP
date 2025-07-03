import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Download, LucideIcon, Plus } from 'lucide-react';

type ActionButtonsProps = {
    exportLabel?: string;
    addLabel?: string;
    onExport?: () => void;
    addHref: string;
    ExportIcon?: LucideIcon;
    AddIcon?: LucideIcon;
};

export default function ActionButtons({
    exportLabel = 'Export All',
    addLabel = 'Add New',
    onExport,
    addHref,
    ExportIcon = Download,
    AddIcon = Plus,
}: ActionButtonsProps) {
    return (
        <div className="flex flex-row items-center sm:justify-center gap-x-4">
            <Button asChild>
                <Link href={addHref} className="flex items-center gap-x-2">
                    <AddIcon className="size-5" />
                    {addLabel}
                </Link>
            </Button>

            <Button variant="ghost" onClick={onExport} className="flex items-center gap-x-2 hover:cursor-pointer">
                <ExportIcon className="size-5" />
                {exportLabel}
            </Button>
        </div>
    );
}
