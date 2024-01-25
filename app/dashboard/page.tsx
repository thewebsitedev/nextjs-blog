import { Metadata } from "next";
import DashboardPageLayout from "@/app/ui/dashboard/layout";
import { Suspense } from "react";
import { WelcomeSkeleton, DashboardPostsWidgetSkeleton } from "../ui/skeletons";
import Welcome from "../ui/dashboard/welcome";
import DashboardPostWidget from "../ui/dashboard/post-widget";

// Dashboard metadata
export const metadata: Metadata = {
    title: 'Dashboard',
};

// Dashboard page
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
