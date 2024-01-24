import { fetchPostBySlug } from "../lib/data";
import Header from "../ui/header";
import Post from "../ui/post";
import { auth } from "@/auth";

export default async function PostPage({params}:{params: {slug: string}}) {
    const session = await auth();
    const post = await fetchPostBySlug(params.slug);
    return (
        <>
            <Header session={session} />
            <Post post={post} />
        </>
    );
}