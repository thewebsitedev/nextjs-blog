import { fetchLatestPosts } from "@/app/lib/data";
import DashboardPageLayout from '@/app/ui/dashboard/layout';
import { DeletePost } from "@/app/ui/dashboard/posts/buttons";
import { Suspense } from "react";

export default async function DashboardPostsPage() {
    const posts = await fetchLatestPosts('410544b2-4001-4271-9855-fec4b6a6442a');
    return (
        <DashboardPageLayout>
            <h1>Dashboard</h1>
        </DashboardPageLayout>
    )
}
