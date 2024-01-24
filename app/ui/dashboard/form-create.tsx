'use client';

import { PhotoIcon } from "@heroicons/react/24/solid";
import { useFormState } from 'react-dom';
import { createPost } from "@/app/lib/actions";
import { Category } from "@/app/lib/types";
import InputCategory from "./input-category";
import { Suspense } from "react";
import { InputCategorySkeleton } from "../skeletons";

export default function DashboardFormCreatePost() {
    const initialState = { message: "", errors: {} };
    const [state, dispatch] = useFormState(createPost, initialState);

    console.log(state);

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
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Be creative with your title"
                                        aria-describedby="error-title"
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
                                    placeholder="Write in as much detail as possible"
                                    aria-describedby="error-content"
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
                                    aria-describedby="error-status"
                                >
                                   <option value='draft'>Draft</option>
                                   <option value='published'>Published</option>
                                   <option value='archive'>Archive</option>
                                </select>
                            </div>
                            <div id="error-status" aria-live="polite" aria-atomic="true">
                                {state.errors?.status &&
                                    state.errors.status.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* <Suspense fallback={<InputCategorySkeleton />}>
                            <InputCategory postid={null} />
                        </Suspense> */}

                        {/* <div className="col-span-full">
                            <label
                                htmlFor="featured-image"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Featured Image
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon
                                        className="mx-auto h-12 w-12 text-gray-300"
                                        aria-hidden="true"
                                    />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="featured-image"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="featured-image"
                                                name="featured-image"
                                                type="file"
                                                className="sr-only"
                                            />
                                        </label>
                                        <p className="pl-1">
                                            or drag and drop
                                        </p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div> */}
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
                    Add Post
                </button>
            </div>
        </form>
    );
}