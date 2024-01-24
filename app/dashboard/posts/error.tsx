'use client';
 
import { useEffect } from 'react';
import DashboardPageLayout from '@/app/ui/dashboard/layout';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <DashboardPageLayout>
        <div className="flex flex-col justify-center -mx-4 mt-8 sm:-mx-0">
          <h2 className="text-center">Something went wrong!</h2>
          <button
            className="self-center w-24 mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-500"
            onClick={
              // Attempt to recover by trying to re-render the posts route
              () => reset()
            }
          >
            Try again
          </button>
        </div>
    </DashboardPageLayout>
  );
}