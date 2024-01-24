import { notFound } from "next/navigation";
import { fetchPostBySlug, getUserById } from "../lib/data";
import Header from "../ui/header";
import Post from "../ui/post";
import { auth } from "@/auth";
import { Metadata } from "next";

// Dynamic metadata
export async function generateMetadata({ params }:{params: {slug: string}}) {
    const post = await fetchPostBySlug(params.slug);
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
            <Post post={post} />
        </>
    );
}