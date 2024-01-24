import DashboardPageLayout from '@/app/ui/dashboard/layout';
import Welcome from '../ui/dashboard/welcome';
import { Suspense } from 'react';
import { WelcomeSkeleton } from '../ui/skeletons';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function DashboardPostsPage() {
    return (
        <DashboardPageLayout>
            <Suspense fallback={<WelcomeSkeleton />}>
                <Welcome />
            </Suspense>
            <p className='text-sm'>Recent posts with all posts button + some other widgets</p>
        </DashboardPageLayout>
    )
}
