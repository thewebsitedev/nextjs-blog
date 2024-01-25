import { fetchUserPaginatedPosts, fetchUserPostsPages } from "@/app/lib/data";
import { DeletePost } from "@/app/ui/dashboard/posts/buttons";
import { PencilIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import DashboardPagination from "./pagination";
import { auth } from "@/auth";
import { getUser } from "@/app/lib/data";

export default async function PostsTable({
    searchParams,
  }: {
    searchParams?: {
      query?: string,
      page?: string,
    },
}) {
    const session = await auth();
    const user = await getUser(session?.user?.email);
    const currentPage = Number(searchParams?.page) || 1;
    const query = searchParams?.query || '';
    const posts = await fetchUserPaginatedPosts(user.userid, query, currentPage);
    const { totalPages, totalPosts } = await fetchUserPostsPages(user.userid);

    const checkTime = (date: Date) => {
        let current = moment();
        let postDate = moment(date); 
        
        return current.diff(postDate, 'h');
    }

    if (totalPosts <= 0) {
        return <a
        href="/dashboard/posts/create"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
          />
        </svg>
        <span className="mt-2 block text-sm font-semibold text-gray-900">Get started by creating a new post</span>
      </a>
    } else {
        return (
            <>
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                                Title
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Created
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                            >
                                <span className="sr-only">
                                    Edit
                                </span>
                                <span className="sr-only">
                                    Delete
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {posts.map((post) => {
                            const dateText = checkTime(post.createdat) < 24 ? `${moment(post.createdat).fromNow()}` : moment(post.createdat).format('MMMM Do, YYYY');
                            return <tr key={post.postid}>
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                    {post.title}
                                    <dl className="font-normal lg:hidden">
                                        <dt className="sr-only">
                                            Title
                                        </dt>
                                        <dd className="mt-1 truncate text-gray-700">
                                            {post.title}
                                        </dd>
                                        <dt className="sr-only sm:hidden">
                                            Status
                                        </dt>
                                        <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                            {post.status}
                                        </dd>
                                    </dl>
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                    {dateText}
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {post.status === 'published' ? <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 capitalize">
                                        {post.status}
                                    </span> : ''}
                                    {post.status === 'archived' ? <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 capitalize">
                                        {post.status}
                                    </span> : ''}
                                    {post.status === 'draft' ? <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 capitalize">
                                        {post.status}
                                    </span> : ''}
                                </td>
                                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <span className="isolate inline-flex">
                                        <a
                                            href={`/dashboard/posts/${post.postid}/edit`}
                                            className="relative inline-flex items-center gap-x-1.5 px-1 py-2 text-sm text-gray-700  hover:text-indigo-500 focus:z-10"
                                            title="edit"
                                        >
                                            <PencilIcon
                                                className="w-4 h-4"
                                                aria-hidden="true"
                                            />
                                        </a>
                                        <DeletePost id={post.postid} />
                                    </span>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <DashboardPagination totalPages={totalPages} totalPosts={totalPosts} page={currentPage} />
            </>
        )
    }
}