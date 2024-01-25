import { fetchPosts } from "@/app/lib/data";
import { LinkIcon } from "@heroicons/react/20/solid";
import LinkButton from "../link";

// posts widget
export default async function DashboardPostsWidget() {
    // fetch posts
    const posts = await fetchPosts(5);

    return (
        <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
            <div className="border-b border-gray-200 bg-white py-4">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap px-4">
                    <div className="ml-4 mt-4">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            Recent Posts
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Latest five posts are displayed below.
                        </p>
                    </div>
                    <div className="ml-4 mt-4 flex-shrink-0">
                        <LinkButton
                            href="/dashboard/posts"
                            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            content="All Posts"
                        />
                    </div>
                </div>
            </div>
            {/* posts */}
            <ul role="list" className="divide-y divide-gray-200">
                {
                    posts.map((post) => (
                        <li key={post.postid}>
                            <div className="block hover:bg-gray-50 px-4">
                                <div className="py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="truncate text-sm font-medium text-gray-600">
                                            {post.title}
                                        </div>
                                        <div className="ml-2 flex flex-shrink-0">
                                            <a
                                                href={`/${post.slug}`}
                                                target="_blank"
                                                className="inline-flex items-center gap-x-1 rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                <LinkIcon className="-ml-0.5 h-3.5 w-3.5 text-xs font-semibold text-gray-600" aria-hidden="true" />
                                                View
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
