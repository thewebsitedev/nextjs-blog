import { notFound } from "next/navigation";
import { fetchPostBySlug, getUserById } from "../lib/data";
import Header from "../ui/header";
import Post from "../ui/post";
import { auth } from "@/auth";
import Main from "@/app/ui/main";
import Footer from "../ui/footer";

// Dynamic metadata
export async function generateMetadata({ params }:{params: {slug: string}}) {
    const post = await fetchPostBySlug(params.slug);

    if ( ! post ) {
        notFound();
    }

    const user = await getUserById(post.userid);
    return {
        title: post.title,
        description: post.summary,
        authors: [{ name: user.name }],
    }
}

// This is the page that is loaded when the user visits a post.
export default async function PostPage({params}:{params: {slug: string}}) {

    // We use the auth function to get the session object. This is used to determine if the user is logged in or not.
    const session = await auth();

    // We fetch the post by the slug.
    const post = await fetchPostBySlug(params.slug);

    // If the post does not exist, we return a 404 page.
    if ( ! post ) {
        notFound();
    }
    
    return (
        <>
            <Header session={session} />
            <Main>
                <Post post={post} />
            </Main>
            <Footer />
        </>
    );
}