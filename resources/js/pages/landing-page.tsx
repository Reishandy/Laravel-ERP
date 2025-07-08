import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowUpRight, BarChart3, Code, Cpu, FolderGit2, Github, Globe, LineChart, Package, ShieldCheck, Users } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function LandingPage() {
    const featuresRef = useRef<HTMLDivElement>(null);
    const screenshotsRef = useRef<HTMLDivElement>(null);
    const benefitsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 },
        );

        if (featuresRef.current) {
            const featureCards = featuresRef.current.querySelectorAll('.feature-card');
            featureCards.forEach((card, index) => {
                observer.observe(card);
                (card as HTMLElement).style.transitionDelay = `${index * 100}ms`;
            });
        }

        if (screenshotsRef.current) {
            const screenshotCards = screenshotsRef.current.querySelectorAll('.screenshot-card');
            screenshotCards.forEach((card, index) => {
                observer.observe(card);
                (card as HTMLElement).style.transitionDelay = `${index * 100}ms`;
            });
        }

        if (benefitsRef.current) {
            const benefitItems = benefitsRef.current.querySelectorAll('.benefit-item');
            benefitItems.forEach((item, index) => {
                observer.observe(item);
                (item as HTMLElement).style.transitionDelay = `${index * 100}ms`;
            });
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Navigation */}
            <nav className="fixed z-50 w-full bg-background/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-background/90">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <div className="flex flex-shrink-0 items-center">
                                <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] transition-transform duration-300 hover:scale-110 hover:rotate-12 dark:text-white" />
                                <span className="ml-2 text-xl font-bold text-foreground">Rei's ERP</span>
                            </div>
                        </div>
                        <div className="hidden items-center space-x-8 md:flex">
                            <a href="#features" className="text-foreground transition-all duration-300 hover:scale-105 hover:text-primary">
                                Features
                            </a>
                            <a href="#screenshots" className="text-foreground transition-all duration-300 hover:scale-105 hover:text-primary">
                                Screenshots
                            </a>
                            <a href="#benefits" className="text-foreground transition-all duration-300 hover:scale-105 hover:text-primary">
                                Benefits
                            </a>
                        </div>
                        <div className="flex items-center">
                            <Button asChild variant="link">
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:scale-105 hover:text-primary"
                                >
                                    Sign In
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link
                                    href={route('register')}
                                    className="ml-4 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-300 hover:scale-105 hover:bg-primary"
                                >
                                    Register
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-background pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            <span className="animate-fade-in block text-muted-foreground opacity-0 [animation-delay:100ms]">
                                Streamline Your Business
                            </span>
                            <span className="animate-fade-in mt-2 block text-foreground opacity-0 [animation-delay:300ms]">With Rei's ERP</span>
                        </h1>
                        <p className="animate-fade-in mx-auto mt-3 max-w-md text-base text-muted-foreground opacity-0 [animation-delay:500ms] sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                            Enterprise resource planning solution for sales, inventory, customer management, and business analytics.
                        </p>
                        <div className="animate-fade-in mx-auto mt-8 max-w-md opacity-0 [animation-delay:700ms]">
                            <Button
                                asChild
                                size="lg"
                                className="rounded-md bg-foreground px-8 py-4 text-lg font-medium text-background transition-all duration-300 hover:scale-105 hover:bg-primary"
                            >
                                <Link href={route('register')}>
                                    Get Started <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" ref={featuresRef} className="bg-background py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="animate-fade-in text-base font-semibold tracking-wide text-muted-foreground uppercase opacity-0">Features</h2>
                        <p className="animate-fade-in mt-2 text-3xl font-extrabold tracking-tight text-foreground opacity-0 [animation-delay:200ms] sm:text-4xl">
                            Everything You Need to Run Your Business
                        </p>
                        <p className="animate-fade-in mx-auto mt-4 max-w-2xl text-lg text-muted-foreground opacity-0 [animation-delay:400ms]">
                            ERP solution to integrates all aspects of your business into one powerful platform.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-card pt-6 opacity-0 transition-all duration-500">
                                    <div className="flow-root rounded-lg bg-muted px-6 pb-8 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                        <div className="-mt-6">
                                            <div>
                                                <span className="inline-flex items-center justify-center rounded-md bg-foreground p-3 text-background shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-6 hover:bg-primary">
                                                    {feature.icon}
                                                </span>
                                            </div>
                                            <h3 className="mt-8 text-lg font-medium tracking-tight text-foreground">{feature.title}</h3>
                                            <p className="mt-5 text-base text-muted-foreground">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Screenshots Section */}
            <div id="screenshots" ref={screenshotsRef} className="bg-muted py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="animate-fade-in text-base font-semibold tracking-wide text-muted-foreground uppercase opacity-0">Interface</h2>
                        <p className="animate-fade-in mt-2 text-3xl font-extrabold tracking-tight text-foreground opacity-0 [animation-delay:200ms] sm:text-4xl">
                            Intuitive & Modern Interface
                        </p>
                        <p className="animate-fade-in mx-auto mt-4 max-w-2xl text-lg text-muted-foreground opacity-0 [animation-delay:400ms]">
                            Designed for efficiency with a clean, user-friendly interface that makes complex tasks simple.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                        {screenshots.map((screenshot, index) => (
                            <div
                                key={index}
                                className="screenshot-card overflow-hidden rounded-lg bg-background opacity-0 shadow-xl transition-all duration-500 hover:shadow-2xl"
                            >
                                <div className="p-1">
                                    <div className="w-full rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted">
                                        <img
                                            src={screenshot.image}
                                            alt={screenshot.title}
                                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-foreground">{screenshot.title}</h3>
                                    <p className="mt-2 text-muted-foreground">{screenshot.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div id="benefits" ref={benefitsRef} className="bg-background py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="animate-fade-in text-base font-semibold tracking-wide text-muted-foreground uppercase opacity-0">Benefits</h2>
                        <p className="animate-fade-in mt-2 text-3xl font-extrabold tracking-tight text-foreground opacity-0 [animation-delay:200ms] sm:text-4xl">
                            Why Choose Rei's ERP
                        </p>
                        <p className="animate-fade-in mx-auto mt-4 max-w-2xl text-lg text-muted-foreground opacity-0 [animation-delay:400ms]">
                            Rei's ERP is built with developers in mind, offering a modern, open-source solution that is both powerful and flexible.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:grid md:grid-cols-2 md:space-y-0 md:gap-x-8 md:gap-y-10">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="benefit-item flex opacity-0 transition-all duration-500">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-foreground text-background transition-all duration-300 hover:scale-110 hover:rotate-6 hover:bg-primary">
                                            {benefit.icon}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-foreground">{benefit.title}</h4>
                                        <p className="mt-2 text-muted-foreground">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-foreground py-12">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-16">
                    <div className="lg:w-2/3">
                        <h2 className="text-3xl font-extrabold tracking-tight text-background sm:text-4xl">
                            <span className="animate-fade-in block opacity-0 [animation-delay:100ms]">Ready to transform your business?</span>
                            <span className="animate-fade-in block text-muted opacity-0 [animation-delay:300ms]">Start using Rei's ERP today!</span>
                        </h2>
                        <p className="animate-fade-in mt-4 max-w-3xl text-lg text-muted opacity-0 [animation-delay:500ms]">
                            Try the demo or set up your own instance to experience the power of Rei's ERP.
                        </p>
                    </div>
                    <div className="mt-8 flex gap-x-2 lg:mt-0 lg:flex-shrink-0">
                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                            className="animate-fade-in text-foreground opacity-0 transition-all duration-300 [animation-delay:700ms] hover:scale-105"
                        >
                            <Link href={route('register')}>
                                Get Started <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="link"
                            className="animate-fade-in text-lg font-medium text-background opacity-0 transition-all duration-300 [animation-delay:900ms] hover:scale-105"
                        >
                            <a href="https://github.com/Reishandy/Laravel-ERP" target="_blank">
                                Repository <ArrowUpRight className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-muted">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex items-center">
                            <div className="flex flex-shrink-0 items-center">
                                <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] transition-transform duration-300 hover:scale-110 hover:rotate-12 dark:text-white" />
                                <span className="ml-2 text-xl font-bold text-foreground">Rei's ERP</span>
                            </div>
                            <p className="ml-4 text-base text-muted-foreground md:border-l md:border-muted-foreground/20 md:pl-4">
                                &copy; {new Date().getFullYear()} All rights reserved 'Reishandy'. AGPL-3.0 License.
                            </p>
                        </div>
                        <div className="mt-8 flex space-x-6 md:order-2 md:mt-0">
                            <a
                                href="https://reishandy.my.id"
                                target="_blank"
                                className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-foreground"
                            >
                                <span className="sr-only">My Website</span>
                                <Globe className="h-6 w-6" />
                            </a>
                            <a
                                href="https://github.com/Reishandy"
                                target="_blank"
                                className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-foreground"
                            >
                                <span className="sr-only">GitHub</span>
                                <Github className="h-6 w-6" />
                            </a>
                            <a
                                href="https://github.com/Reishandy/Laravel-ERP"
                                target="_blank"
                                className="text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-foreground"
                            >
                                <span className="sr-only">Repository</span>
                                <FolderGit2 className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Feature data
const features = [
    {
        icon: <LineChart className="h-6 w-6" />,
        title: 'Sales Management',
        description: 'Complete sales lifecycle management with order tracking, invoicing, and customer communication.',
    },
    {
        icon: <Package className="h-6 w-6" />,
        title: 'Inventory Control',
        description: 'Real-time inventory tracking, stock alerts, and automated reordering to prevent shortages.',
    },
    {
        icon: <Users className="h-6 w-6" />,
        title: 'Customer CRM',
        description: 'Centralized customer database with interaction history, segmentation, and communication tools.',
    },
    {
        icon: <BarChart3 className="h-6 w-6" />,
        title: 'Business Analytics',
        description: 'Real-time dashboards and customizable reports to track KPIs and make data-driven decisions.',
    },
];

// Screenshot data
const screenshots = [
    {
        title: 'Dashboard Overview',
        description: 'Real-time business metrics and performance indicators at a glance.',
        image: '/images/dashboard.webp',
    },
    {
        title: 'Sales Management',
        description: 'Complete sales lifecycle tracking with order processing and fulfillment.',
        image: '/images/sales.webp',
    },
];

// Benefits data
const benefits = [
    {
        icon: <Github className="h-6 w-6" />,
        title: 'Open Source Foundation',
        description: 'Completely open-source under AGPL-3.0 license, allowing for transparency, community contributions, and customization.',
    },
    {
        icon: <Code className="h-6 w-6" />,
        title: 'Modern Tech Stack',
        description:
            'Built with cutting-edge technologies: React, TypeScript, Tailwind CSS, and Laravel for optimal performance and developer experience.',
    },
    {
        icon: <Cpu className="h-6 w-6" />,
        title: 'Modular Architecture',
        description: 'Clean, well-structured codebase following best practices for easy maintenance and extensibility.',
    },
    {
        icon: <ShieldCheck className="h-6 w-6" />,
        title: 'Community Driven',
        description: 'Designed for developers by developers, with active community support and regular updates.',
    },
];
