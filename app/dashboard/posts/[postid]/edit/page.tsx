import DashboardPageLayout from "@/app/ui/dashboard/layout";
import { fetchCategories } from "@/app/lib/data";
import DashboardFormEditPost from "@/app/ui/dashboard/form-edit";
import { fetchPostById } from "@/app/lib/data";
import { notFound } from 'next/navigation';

export default async function DashboardEditPage({ params }: { params: { postid: string } }) {
    // title, slug, content, summary, userId, status, featuredImage
    const id = params.postid;
    const [post, categories] = await Promise.all([
        fetchPostById(id),
        fetchCategories(),
    ]);

    if ( !post ) {
        notFound();
    }

    return (
        <DashboardPageLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Edit Post
                </h1>
                <DashboardFormEditPost post={post} />
            </div>
        </DashboardPageLayout>
    );
}
