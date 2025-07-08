import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface HighlightCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendDirection?: 'up' | 'down';
    description?: string;
    comparisonText?: string;
    icon?: LucideIcon;
}

export default function HighlightCard({ title, value, trend, trendDirection = 'up', description, comparisonText, icon: Icon }: HighlightCardProps) {
    const TrendIcon = trendDirection === 'up' ? TrendingUp : TrendingDown;

    return (
        <Card className="w-full min-w-0 justify-center rounded-2xl bg-sidebar shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <CardContent className="p-8">
                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-row items-baseline justify-between">
                        <span className="text-lg text-muted-foreground">{title}</span>
                        {trend && (
                            <Badge variant="secondary">
                                {Icon ? <Icon /> : <TrendIcon />} {trend}
                            </Badge>
                        )}
                    </div>
                    <span className="text-5xl font-black break-all 2xl:text-4xl">{value}</span>
                </div>
            </CardContent>
            {(description || comparisonText) && (
                <CardFooter>
                    <div className="flex flex-col gap-y-1">
                        {description && (
                            <span className="text-md flex flex-row gap-x-2 text-muted-foreground">
                                {description} <TrendIcon />
                            </span>
                        )}
                        {comparisonText && <span className="text-sm text-muted-foreground">{comparisonText}</span>}
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
