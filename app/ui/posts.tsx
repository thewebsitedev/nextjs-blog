import { fetchPaginatedPosts } from "../lib/data";
import DashboardPagination from "./dashboard/posts/pagination";
import Post from "./post";
import { fetchPostsPages } from "../lib/data";

export default async function Posts({
    searchParams,
  }: {
    searchParams?: {
      query?: string,
      page?: string,
    },
}) {
    const currentPage = Number(searchParams?.page) || 1;
    const query = searchParams?.query || '';
    const posts = await fetchPaginatedPosts(query, currentPage);
    const { totalPages, totalPosts } = await fetchPostsPages(query );

    return (
        <div className="py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        The Latest
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p>
                    <div className="mt-8 space-y-16 lg:mt-12 lg:space-y-16">
                        {posts.map((post) => (
                            <Post key={post.postid} post={post} />
                        ))}
                    </div>
                </div>
                <div className="mt-16"></div>
                <DashboardPagination totalPages={totalPages} totalPosts={totalPosts} page={currentPage} />
            </div>
        </div>
    );
}
