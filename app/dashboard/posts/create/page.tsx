import DashboardPageLayout from "@/app/ui/dashboard/layout";
import { fetchCategories } from "@/app/lib/data";
import DashboardFormCreatePost from "@/app/ui/dashboard/form-create";

export default function DashboardPage() {
    // title, slug, content, summary, userId, status, featuredImage

    return (
        <DashboardPageLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Add New Post
                </h1>
                <DashboardFormCreatePost />
            </div>
        </DashboardPageLayout>
    );
}
