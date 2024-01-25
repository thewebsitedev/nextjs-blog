'use client';

import { PhotoIcon } from "@heroicons/react/24/solid";
import { useFormState } from 'react-dom';
import { updatePost } from "@/app/lib/actions";
import { Category, Post } from "@/app/lib/types";
import InputCategory from "./input-category";
import { Suspense } from "react";
import { InputCategorySkeleton } from "../skeletons";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Markdown from "react-markdown";

export default function DashboardFormEditPost(
    { post, categories, selected } : { post: Post, categories: Category[], selected: string[]}
    ) {

    const updatePostWithId = updatePost.bind(null, post.postid);

    const initialState = { message: "", errors: {} };
    const [state, dispatch] = useFormState(updatePostWithId, initialState);
    const [content, setContent] = useState(post.content);
    const router = useRouter();

    useEffect(() => {
        if ('success' === state.message) {
            toast.success("Post edited successfully");
            const timer = setTimeout(() => {
                router.push('/dashboard/posts');
            }, 1000); // Delay
          
            // Cleanup function to clear the timeout
            return () => clearTimeout(timer);
        }
        // check errors length
        const length = state.errors?.title?.length || 0;
        if ( length > 0 ) {
            toast.error("Please fix the errors");
        }
    }, [state, router]);

    return (
        <form action={dispatch}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <div className="col-span-full">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="title"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={post.title}
                                    />
                                </div>
                            </div>
                            <div id="error-title" aria-live="polite" aria-atomic="true">
                                {state.errors?.title &&
                                    state.errors.title.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-full">
                            <div className="col-span-full">
                                <label
                                    htmlFor="slug"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Slug
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="slug"
                                        id="slug"
                                        autoComplete="slug"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={post.slug}
                                    />
                                </div>
                            </div>
                            <div id="error-slug" aria-live="polite" aria-atomic="true">
                                {state.errors?.slug &&
                                    state.errors.slug.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Status
                            </label>
                            <div className="mt-2">
                                <select
                                    id="status"
                                    name="status"
                                    autoComplete="status-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={post.status}
                                >
                                   <option value='draft'>Draft</option>
                                   <option value='published'>Published</option>
                                   <option value='archived'>Archived</option>
                                </select>
                            </div>
                        </div>

                        <Suspense fallback={<InputCategorySkeleton />}>
                            <InputCategory categories={categories} selected={selected} />
                        </Suspense>

                        <div className="col-span-full sm:col-span-3">
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Content
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="content"
                                    name="content"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={post.content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div id="error-content" aria-live="polite" aria-atomic="true">
                                {state.errors?.content &&
                                    state.errors.content.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label
                                htmlFor="preview"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Preview
                            </label>
                            <div className="post mt-2">
                                <Markdown>
                                    {content}
                                </Markdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <a
                    href="/dashboard/posts"
                    className="text-sm font-semibold leading-6 text-gray-900"
                >
                    Cancel
                </a>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Edit Post
                </button>
            </div>
        </form>
    );
}