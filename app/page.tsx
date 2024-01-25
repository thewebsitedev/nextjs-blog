"use server";

import Header from "@/app/ui/header";
import Posts from "./ui/posts";
import { Suspense } from "react";
import { PostsSkeleton } from "./ui/skeletons";
import Footer from "./ui/footer";
import { auth } from "@/auth";
import Main from "./ui/main";

// This is the main page of the app. It is the first page that is loaded when the user visits the site.
export default async function Home({
    searchParams,
}: {
    searchParams?: {
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
                    <Posts searchParams={searchParams} />
                </Suspense>
            </Main>
            <Footer />
        </>
    );
}
