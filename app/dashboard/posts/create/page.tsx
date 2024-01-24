import DashboardPageLayout from "@/app/ui/dashboard/layout";
import DashboardFormCreatePost from "@/app/ui/dashboard/form-create";
import { fetchCategories } from "@/app/lib/data";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function DashboardPage() {
    // title, slug, content, summary, userId, status, featuredImage
    const categories = await fetchCategories();
    
    return (
        <DashboardPageLayout>
            <ToastContainer />
            <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Add New Post
                </h1>
                <DashboardFormCreatePost categories={categories} />
            </div>
        </DashboardPageLayout>
    );
}
