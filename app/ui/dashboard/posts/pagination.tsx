'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export default function DashboardPagination({totalPages, totalPosts, page}:{totalPages: number, totalPosts: number, page: number}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };
    
    return (
        <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white py-5"
        aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{page}</span> to <span className="font-medium">{totalPages}</span> of{' '}
                <span className="font-medium">{totalPosts}</span> results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                <a
                href={page > 1 ? createPageURL(page - 1) : '#'}
                className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${page <= 1 ? 'disabled bg-gray-50 cursor-not-allowed text-gray-400' : 'bg-white text-gray-900'}`}
                >
                    Previous
                </a>
                <a
                href={createPageURL(page + 1)}
                className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                >
                    Next
                </a>
            </div>
        </nav>
        // <div className="flex justify-center items-center gap-2">
        //     {pages.map((page) => (
        //         <a
        //             key={page}
        //             href={hrefBuilder(page)}
        //             className={`px-4 py-2 rounded-md ${
        //                 page === current
        //                     ? "bg-gray-900 text-white"
        //                     : "bg-gray-100 text-gray-900"
        //             }`}
        //         >
        //             {page}
        //         </a>
        //     ))}
        // </div>
    );
}