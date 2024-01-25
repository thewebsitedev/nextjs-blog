import DashboardPageLayout from '@/app/ui/dashboard/layout';
import Welcome from '../ui/dashboard/welcome';
import { Suspense } from 'react';
import { WelcomeSkeleton, DashboardPostsWidgetSkeleton } from '../ui/skeletons';
import { Metadata } from 'next';
import DashboardPostWidget from '../ui/dashboard/post-widget';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function DashboardPostsPage() {
    return (
        <DashboardPageLayout>
            <Suspense fallback={<WelcomeSkeleton />}>
                <Welcome />
            </Suspense>
            <Suspense fallback={<DashboardPostsWidgetSkeleton />}>
                <DashboardPostWidget />
            </Suspense>
        </DashboardPageLayout>
    )
}
