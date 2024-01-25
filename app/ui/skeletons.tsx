// Skeletons for loading state

// table rows placeholder until posts data is fetched
export function TableRowSkeleton() {
    return (
        <tr
            className={`w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg`}
        >
            {/* Post title */}
            <td
                className={`w-full max-w-0 py-6 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0 relative overflow-hidden whitespace-nowrap`}
            >
                <div className="flex items-center gap-3">
                    <div className="h-5 w-96 rounded bg-gray-100"></div>
                </div>
            </td>
            {/* Date */}
            <td className="hidden px-3 py-6 text-sm text-gray-500 lg:table-cell whitespace-nowrap">
                <div className="h-5 w-44 rounded bg-gray-100"></div>
            </td>
            {/* Status */}
            <td className="hidden px-3 py-6 text-sm text-gray-500 sm:table-cell whitespace-nowrap">
                <div className="h-5 w-16 rounded bg-gray-100"></div>
            </td>
            {/* Actions */}
            <td className="py-6 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 whitespace-nowrap">
                <div className="flex justify-end gap-1">
                    <div className="h-[24px] w-[24px] rounded bg-gray-100"></div>
                    <div className="h-[24px] w-[24px] rounded bg-gray-100"></div>
                </div>
            </td>
        </tr>
    );
}

// pagination placeholder until pagination data is fetched
export function PaginationSkeleton() {
    return (
        <div
            className="flex items-center justify-between border-t border-gray-200 bg-white py-5"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <div className="h-5 w-48 rounded bg-gray-100  whitespace-nowrap">
                </div>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                <div
                    className="relative inline-flex rounded-md w-20 h-9 bg-gray-100 whitespace-nowrap"
                >
                </div>
                <div
                    className="relative ml-3 inline-flex  rounded-md w-14 h-9 bg-gray-100 whitespace-nowrap"
                >
                </div>
            </div>
        </div>
    );
}

// post table placeholder, wrapper for table row and pagination
export function PostsTableSkeleton() {
    return (
        <>
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                            Title
                        </th>
                        <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                            Created At
                        </th>
                        <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                            <span className="sr-only">Edit</span>
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                </tbody>
            </table>
            <PaginationSkeleton />
        </>
    );
}

// category input placeholder until categories data is fetched
export function InputCategorySkeleton() {
    return (
        <div className="col-span-full">
            <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Category
            </label>
            <div className="mt-2">
                <select
                    id="category"
                    name="category"
                    autoComplete="category-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                    <option value="">...Loading</option>
                </select>
            </div>
        </div>
    );
}

// card placeholder until post data is fetched
export function CardSkeleton() {
    return (
        <article
            className="relative isolate flex flex-col gap-8 lg:flex-row"
        >
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <div className="bg-gray-50 absolute inset-0 rounded-2xl" />
            </div>
            <div>
                <div className="flex items-center gap-x-4 text-xs">
                    <div
                        className={`w-28 text-sm font-medium text-gray-900 sm:w-auto overflow-hidden`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-3.5 w-44 bg-gray-50"></div>
                        </div>
                    </div>
                    <div
                        className="h-7 w-20 relative z-10 rounded-full bg-gray-50 px-3 py-1.5 hover:bg-gray-100 overflow-hidden whitespace-nowrap"
                    >
                    </div>
                </div>
                <div className="group relative max-w-xl">
                    <div className="w-96 h-6 mt-3 text-lg font-semibold leading-6 bg-gray-50 overflow-hidden whitespace-nowrap"></div>
                    <div className="w-full min-h-[48px] mt-5 text-sm leading-6 text-gray-600">
                        <div className="w-full h-4 mt-3 text-lg font-semibold leading-6 bg-gray-50 overflow-hidden whitespace-nowrap"></div>
                        <div className="w-full h-4 mt-3 text-lg font-semibold leading-6 bg-gray-50 overflow-hidden whitespace-nowrap"></div>
                        <div className="w-6/12 h-4 mt-3 text-lg font-semibold leading-6 bg-gray-50 overflow-hidden whitespace-nowrap"></div>
                    </div>
                </div>
                <div className="mt-6 flex border-t border-gray-50 pt-6">
                    <div className="relative flex items-center gap-x-4">
                        <div className="h-10 w-10 rounded-full bg-gray-50"></div>
                        <div className="text-sm leading-6">
                            <div className="w-32 h-5 bg-gray-50 overflow-hidden whitespace-nowrap" />
                            <div className="w-40 h-5 bg-gray-50 overflow-hidden whitespace-nowrap mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

// post placeholder until post data is fetched
export function PostSkeleton() {
    return (
        <article
            className="relative isolate flex flex-col gap-8 lg:flex-row"
        >
            <div className="animate-pulse relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <div className="bg-gray-100 absolute inset-0 rounded-2xl" />
            </div>
            <div className="animate-pulse">
                <div className="flex items-center gap-x-4 text-xs">
                    <div
                        className="w-full max-w-0 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0 relative overflow-hidden whitespace-nowrap"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-3.5 w-44 bg-gray-100"></div>
                        </div>
                    </div>
                    <div
                        className="h-7 w-20 relative z-10 rounded-full bg-gray-100 px-3 py-1.5 hover:bg-gray-100 overflow-hidden whitespace-nowrap"
                    >
                    </div>
                </div>
                <div className="group relative max-w-xl">
                    <div className="w-96 h-6 mt-3 text-lg font-semibold leading-6 bg-gray-100 overflow-hidden whitespace-nowrap"></div>
                    <div className="w-full min-h-[48px] mt-5 text-sm leading-6 text-gray-600">
                        <div className="w-full h-4 mt-3 text-lg font-semibold leading-6 bg-gray-100 overflow-hidden whitespace-nowrap"></div>
                        <div className="w-full h-4 mt-3 text-lg font-semibold leading-6 bg-gray-100 overflow-hidden whitespace-nowrap"></div>
                        <div className="w-6/12 h-4 mt-3 text-lg font-semibold leading-6 bg-gray-100 overflow-hidden whitespace-nowrap"></div>
                    </div>
                </div>
                <div className="mt-6 flex border-t border-gray-50 pt-6">
                    <div className="relative flex items-center gap-x-4">
                        <div className="h-10 w-10 rounded-full bg-gray-100"></div>
                        <div className="text-sm leading-6">
                            <div className="w-32 h-5 bg-gray-100 overflow-hidden whitespace-nowrap" />
                            <div className="w-40 h-5 bg-gray-100 overflow-hidden whitespace-nowrap mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

// posts splaceholder, wrapper for card skeleton
export function PostsSkeleton() {
    return (
        <>
            <div className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                The Latest
            </div>
            <p className="mt-2 text-lg leading-6 sm:leading-8 text-gray-600">
                Learn how to grow your business with our expert advice.
            </p>
            <div className="mt-8 space-y-16 lg:mt-12 lg:space-y-16">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </>
    );
}

// welcome text placeholder until user name is fetched
export function WelcomeSkeleton() {
    return <div className='w-64 h-7 text-xl font-bold mb-4 bg-gray-100 overflow-hidden rounded whitespace-nowrap'></div>
}

// dashboard recent posts widget placeholder
export function DashboardPostsWidgetSkeleton() {
    return (
        <div className="overflow-hidden bg-white sm:rounded-lg sm:shadow">
            <div className="border-b border-gray-200 bg-white py-4">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap px-4">
                    <div className="ml-4 mt-4">
                        <div className="w-28 h-6 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded whitespace-nowrap">
                        </div>
                        <div className="w-60 h-5 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded whitespace-nowrap">
                        </div>
                    </div>
                    <div className="ml-4 mt-4 flex-shrink-0">
                        <div
                            className="w-20 h-9 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded-md whitespace-nowrap"
                        >
                        </div>
                    </div>
                </div>
            </div>
            <ul role="list" className="divide-y divide-gray-200">
                <li>
                    <div className="block hover:bg-gray-50 px-4">
                        <div className="py-4">
                            <div className="flex items-center justify-between">
                                <div className="w-96 h-5 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded-md whitespace-nowrap">
                                </div>
                                <div className="ml-2 flex flex-shrink-0">
                                    <div
                                        className="w-16 h-5 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded-md whitespace-nowrap"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="block hover:bg-gray-50 px-4">
                        <div className="py-4">
                            <div className="flex items-center justify-between">
                                <div className="w-4/6 h-5 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded-md whitespace-nowrap">
                                </div>
                                <div className="ml-2 flex flex-shrink-0">
                                    <div
                                        className="w-16 h-5 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded-md whitespace-nowrap"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="block hover:bg-gray-50 px-4">
                        <div className="py-4">
                            <div className="flex items-center justify-between">
                                <div className="w-96 h-5 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded-md whitespace-nowrap">
                                </div>
                                <div className="ml-2 flex flex-shrink-0">
                                    <div
                                        className="w-16 h-5 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded-md whitespace-nowrap"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="block hover:bg-gray-50 px-4">
                        <div className="py-4">
                            <div className="flex items-center justify-between">
                                <div className="w-5/6 h-5 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded-md whitespace-nowrap">
                                </div>
                                <div className="ml-2 flex flex-shrink-0">
                                    <div
                                        className="w-16 h-5 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded-md whitespace-nowrap"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="block hover:bg-gray-50 px-4">
                        <div className="py-4">
                            <div className="flex items-center justify-between">
                                <div className="w-96 h-5 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded-md whitespace-nowrap">
                                </div>
                                <div className="ml-2 flex flex-shrink-0">
                                    <div
                                        className="w-16 h-5 text-xl font-bold mb-2 bg-gray-100 overflow-hidden rounded-md whitespace-nowrap"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}