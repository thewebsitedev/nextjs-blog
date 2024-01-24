import { notFound } from "next/navigation";
import { fetchPostBySlug, getUserById } from "../lib/data";
import Header from "../ui/header";
import Post from "../ui/post";
import { auth } from "@/auth";
import { Metadata } from "next";
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

export default async function PostPage({params}:{params: {slug: string}}) {
    const session = await auth();
    const post = await fetchPostBySlug(params.slug);

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