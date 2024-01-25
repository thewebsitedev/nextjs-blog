"use client";

import { deletePost } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

// delete post button
export async function DeletePost({ id }: { id: string }) {
    // bind deletePost function to id, avoids exposing id
    const deletePostWithId = deletePost.bind(null, id);
    // handle form submit
    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        // confirm delete
        if (confirm("Are you sure you want to delete this post?")) {
            // delete post
            const response = await deletePostWithId();
            // notify user
            if ("success" === response.message) {
                toast.success("Post deleted successfully");
            }
        }
    };

    return (
        <button className="relative -ml-px inline-flex items-center px-1 py-2 text-sm focus:z-10 cursor-pointer align-middle">
            <span className="sr-only">Delete</span>
            <TrashIcon
                className="w-4 h-4 text-red-400 hover:text-red-600"
                aria-hidden="true"
                onClick={handleFormSubmit}
            />
        </button>
    );
}
