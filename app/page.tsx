"use server";

import Header from "@/app/ui/header";
import Posts from "./ui/posts";
import { Suspense } from "react";
import { PostsSkeleton } from "./ui/skeletons";
import Footer from "./ui/footer";
import { auth } from "@/auth";
import Main from "./ui/main";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string,
  }
}) {
  const session = await auth();
  return (
    <>
      <Header session={session} />
        <Main>
          <Suspense fallback={<PostsSkeleton/>}>
            <Posts searchParams={searchParams} />
          </Suspense>
        </Main>
      <Footer />
    </>
  );
}
