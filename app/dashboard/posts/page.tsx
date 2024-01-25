import { Suspense } from "react";
import DashboardPageLayout from '@/app/ui/dashboard/layout';
import PostsTable from "@/app/ui/dashboard/posts/table";
import { PostsTableSkeleton } from '@/app/ui/skeletons';
import { ToastContainer } from 'react-toastify';
import LinkButton from "@/app/ui/link";

import 'react-toastify/dist/ReactToastify.css';

// Dashboard posts page
export default function DashboardPostsPage({
    searchParams,
  }: {
    searchParams?: {
      query?: string,
      page?: string,
    },
  }) {
    return (
        <DashboardPageLayout>
            <ToastContainer />
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Posts
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the posts in your account including their title, creation date and status.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <LinkButton
                        href="/dashboard/posts/create"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        content="Add post"
                    />
                </div>
            </div>
            <div className="-mx-4 mt-8 sm:-mx-0">
                <Suspense fallback={<PostsTableSkeleton />}>
                    <PostsTable searchParams={searchParams} />
                </Suspense>
            </div>
        </DashboardPageLayout>
    )
}
