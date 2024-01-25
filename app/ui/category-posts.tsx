import { getCategoryBySlug, getRelatedPosts, fetchCategoryPostsPages } from "../lib/data";
// import { fetchPostsPages } from "../lib/data";
import DashboardPagination from "./dashboard/posts/pagination";
import Card from "./card";
import { notFound } from "next/navigation";

// blog category posts page.
export default async function CategoryPosts({
    searchParams,
  }: {
    searchParams?: {
        slug?: string;
        query?: string,
        page?: string,
    },
}) {
    const currentPage = Number(searchParams?.page) || 1;
    const query = searchParams?.query || '';
    const slug = searchParams?.slug || '';
    const category = await getCategoryBySlug(slug);

    if ( ! category ) {
        notFound();
    }

    const posts = await getRelatedPosts(category.categoryid, query, currentPage);

    if ( ! posts ) {
        notFound();
    }

    const { totalPages, totalPosts } = await fetchCategoryPostsPages(category.categoryid,query);

    // const posts:any = [];
    // const totalPages = 1;
    // const totalPosts = 1;

    return (
        <div>
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {category.name}
                </h2>
                <p className="mt-2 text-lg leading-6 sm:leading-8 text-gray-600">
                    {category.description}
                </p>
                {posts.length ? 
                <div className="mt-8 space-y-8 sm:space-y-12 lg:space-y-16 lg:mt-12">
                    {posts.map((post) => (
                        <Card key={post.postid} post={post} />
                    ))}
                </div> : <div className="text-gray-400 italic mt-12">Sorry, no posts found. Please try a different search.</div>
                }
            </div>
            {/* display posts */}
            {
            posts.length ? 
                <>
                    <div className="mt-8 sm:mt-12 lg:mt-16"></div>
                    <DashboardPagination totalPages={totalPages} totalPosts={totalPosts} page={currentPage} />
                </> : 
                ''
            }
        </div>
    );
}
