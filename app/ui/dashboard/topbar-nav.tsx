'use client';

import { usePathname } from 'next/navigation';
import { classNames } from "@/app/lib/utilities";

export default function DashboardTopBarNav() {
    const pathname = usePathname();
    const navigation = [
        { name: 'Dashboard', href: '/dashboard', current: pathname === '/dashboard'},
        { name: 'Posts', href: '/dashboard/posts', current: pathname === '/dashboard/posts'},
    ]
    return (
        <>
            {navigation.map((item) => (
                <a
                key={item.name}
                href={item.href}
                className={classNames(
                    item.current
                        ? 'border-indigo-500'
                        : 'border-transparent',
                    'inline-flex items-center border-b-2  px-1 pt-1 text-sm font-medium text-gray-900 h-full lg:hidden'
                )}
                >
                    {item.name}
                </a>
            ))}
        </>
    );
}
