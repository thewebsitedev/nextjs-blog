import DashboardPageLayout from "@/app/ui/dashboard/layout";
import DashboardFormEditPost from "@/app/ui/dashboard/form-edit";
import { fetchPostById } from "@/app/lib/data";
import { notFound } from 'next/navigation';
import { fetchCategories, fetchPostCategories } from "@/app/lib/data";

export default async function DashboardEditPage({ params }: { params: { postid: string } }) {
    // title, slug, content, summary, userId, status, featuredImage
    const id = params.postid;
    const post = await fetchPostById(id);

    if ( ! post ) {
        notFound();
    }

    // combine the two fetches into one
    const [categories, postCategories] = await Promise.all([
        fetchCategories(),
        id ? fetchPostCategories(id) : [],
    ]);
    let selected: string[] = [];

    if ( id ) {
        selected = postCategories.map((data: {categoryid: string}) => data.categoryid);
    }

    return (
        <DashboardPageLayout>
            <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Edit Post
                </h1>
                <DashboardFormEditPost post={post} categories={categories} selected={selected} />
            </div>
        </DashboardPageLayout>
    );
}
