import DashboardPageLayout from "@/app/ui/dashboard/layout";
import DashboardFormEditPost from "@/app/ui/dashboard/form-edit";
import { fetchPostById, fetchCategories, fetchPostCategories } from "@/app/lib/data";
import { notFound } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Dashboard edit post page
export default async function DashboardEditPage({ params }: { params: { postid: string } }) {
    // Get post id from params
    const id = params.postid;
    // Fetch post by id
    const post = await fetchPostById(id);

    // if post is not found, return 404
    if ( ! post ) {
        notFound();
    }

    // combine the two fetches
    const [categories, postCategories] = await Promise.all([
        fetchCategories(),
        id ? fetchPostCategories(id) : [],
    ]);

    // get the selected categories
    let selected: string[] = [];
    if ( id ) {
        selected = postCategories.map((data: {categoryid: string}) => data.categoryid);
    }

    return (
        <DashboardPageLayout>
            <ToastContainer />
            <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Edit Post
                </h1>
                <DashboardFormEditPost post={post} categories={categories} selected={selected} />
            </div>
        </DashboardPageLayout>
    );
}
