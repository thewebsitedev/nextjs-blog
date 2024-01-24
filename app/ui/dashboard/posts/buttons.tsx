import { deletePost } from '@/app/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';
 
export function DeletePost({ id }: { id: string }) {
  const deletePostWithId = deletePost.bind(null, id);

  // const handleFormSubmit = (e: any) => {
  //   e.preventDefault();
  //   confirm('Are you sure you want to delete this post?') && deletePostWithId();
  // }

  return (
    <form action={deletePostWithId}>
      <button className='relative -ml-px inline-flex items-center px-1 py-2 text-sm focus:z-10 cursor-pointer align-middle'
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-600" aria-hidden="true" />
      </button>
    </form>
  );
}