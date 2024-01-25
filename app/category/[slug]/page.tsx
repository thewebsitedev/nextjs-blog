import Header from "@/app/ui/header";
import CategoryPosts from "@/app/ui/category-posts";
import { auth } from "@/auth";
import Main from "@/app/ui/main";
import Footer from "@/app/ui/footer";
import { Suspense } from "react";
import { PostsSkeleton } from "@/app/ui/skeletons";

// Dynamic metadata
// export async function generateMetadata({ params }:{params: {slug: string}}) {
//     const post = await fetchPostBySlug(params.slug);

//     if ( ! post ) {
//         notFound();
//     }

//     const user = await getUserById(post.userid);
//     return {
//         title: post.title,
//         description: post.summary,
//         authors: [{ name: user.name }],
//     }
// }

// This is the page that is loaded when the user visits a post.
export default async function CategoryPage({
    params,
}: {
    params?: {
        slug?: string;
        query?: string;
        page?: string;
    };
}) {

    // We use the auth function to get the session object. This is used to determine if the user is logged in or not.
    const session = await auth();
    
    return (
        <>
            <Header session={session} />
            <Main>
                <Suspense fallback={<PostsSkeleton />}>
                    <CategoryPosts searchParams={params} />
                </Suspense>
            </Main>
            <Footer />
        </>
    );
}