'use client';

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Login from './login';
import type { Session } from 'next-auth';
import Logout from './logout';
import { classNames } from '@/app/lib/utils';

export default function Header({ session }:{ session: Session | null }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback( (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
      params.set('page', '1');
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 600);

  return (
    <header className="bg-gray-900">
      <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between mx-auto max-w-4xl">
              <div className="flex px-2 lg:px-0">
                {/* logo */}
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="h-8 w-8"
                    src="/logo.png"
                    alt="logo"
                    width={32}
                    height={32}
                  />
                </div>
                {/* navigation links */}
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <a
                    href="/"
                    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Home
                  </a>
                  <a
                    href="/archives"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Archives
                  </a>
                  <a
                    href="/404"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    404
                  </a>
                </div>
              </div>
              {/* search */}
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Search"
                      type="search"
                      onChange={(e) => {
                        handleSearch(e.target.value);
                      }}
                      defaultValue={searchParams.get('query')?.toString()}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-2 lg:flex lg:items-center">
                {/* Profile dropdown */}
                {
                    session?.user?.name ?
                      (
                        <Menu as="div" className="relative ml-4 flex-shrink-0">
                          <div>
                            <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <Image
                                className="h-8 w-8 rounded-full"
                                src="/author.png"
                                alt="user"
                                width={32}
                                height={32}
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="/dashboard"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                      >
                                        Dashboard
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Logout className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} />
                                    )}
                                  </Menu.Item>
                                </Menu.Items>
                          </Transition>
                        </Menu>
                      )
                      :
                      (<Login />)
                  }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Disclosure.Button
                as="a"
                href="/"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/archives"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Archives
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/404"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                404
              </Disclosure.Button>
            </div>
            {session?.user?.name ? (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="user"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">Tom Cook</div>
                    <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="/dashboard"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Dashboard
                  </Disclosure.Button>
                  <Logout className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800" />
                </div>
              </div>
            ) 
            :
            <div className="border-t border-gray-200 pb-3 pt-4"><Disclosure.Button
                as="a"
                href="/login"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
              >
                Login
              </Disclosure.Button></div>
            }
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </header>
  )
}
