import DashboardPageLayout from '@/app/ui/dashboard/layout';
import { Suspense } from "react";
import PostsTable from "@/app/ui/dashboard/posts/table";
import { PostsTableSkeleton } from '@/app/ui/skeletons';

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
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Posts
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the posts in your account
                        including their title, created at,
                        status and categories.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <a
                        href="/dashboard/posts/create"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add post
                    </a>
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
