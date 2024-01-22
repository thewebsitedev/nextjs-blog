import Header from "@/app/ui/header";
import Posts from "./ui/posts";
import { Suspense } from "react";
import { PostsSkeleton } from "./ui/skeletons";

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<PostsSkeleton/>}>
        <Posts />
      </Suspense>
    </>
  );
}
