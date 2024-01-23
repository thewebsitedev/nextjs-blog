import { fetchPostBySlug } from "../lib/data";
import Header from "../ui/header";
import Post from "../ui/post";

export default async function PostPage({params}:{params: {slug: string}}) {
    // console.log(params)
    const post = await fetchPostBySlug(params.slug);
    return (
        <>
            <Header/>
            <Post post={post} />
        </>
    );
}