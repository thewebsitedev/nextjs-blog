import { classNames } from "@/app/lib/utils"
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"

// sidebar navigation
export default function NavigationSidebar({links}:{
    links: {name: string, href: string, current: boolean, icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>}[]
}) {
    return (
        <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className="-mx-2 space-y-1">
                        {links.map((item) => (
                            <li key={item.name}>
                            <a
                                href={item.href}
                                className={classNames(
                                item.current
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                            >
                                <item.icon
                                className={classNames(
                                    item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                    'h-6 w-6 shrink-0'
                                )}
                                aria-hidden="true"
                                />
                                {item.name}
                            </a>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className="mt-auto">
                    <a
                    href="/"
                    className="group -mx-2 flex gap-x-1 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    >
                        <ArrowLeftStartOnRectangleIcon
                            className="h-5 w-5 shrink-0 text-gray-600 group-hover:text-indigo-600 self-center"
                            aria-hidden="true"
                        />
                        Homepage
                    </a>
                </li>
            </ul>
        </nav>
    )
}