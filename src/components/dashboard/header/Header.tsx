import { Menu, Transition } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { BellIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Fragment, memo } from "react";

import { onPromise } from "../../../utils/functions";
import { Avatar } from "../../common/Avatar";

import type { Session } from "next-auth";

interface HeaderProps {
  readonly user: Session["user"];
  readonly onSidebarOpen: () => void;
}

export const Header = memo<HeaderProps>(({ user, onSidebarOpen }) => {
  return (
    <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-slate-900 lg:border-none">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:border-gray-700 lg:hidden"
        onClick={onSidebarOpen}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-end px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-black dark:bg-transparent dark:text-gray-300"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex max-w-xs items-center gap-2 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800 lg:rounded-md lg:p-2">
                <Avatar image={user?.image} name={user?.name} isSmall />
                <span className="ml-3 hidden text-sm font-medium text-gray-700 dark:text-gray-300 lg:block">
                  <span className="sr-only">Open user menu for </span>
                  {user?.name?.split(" ")[0] ?? user?.email ?? "Guest"}
                </span>
                <ChevronDownIcon
                  className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                  aria-hidden="true"
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-900">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/dashboard/settings"
                      className={clsx(
                        active ? "bg-gray-100 dark:bg-gray-700" : "",
                        "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 dark:hover:bg-slate-800",
                      )}
                    >
                      Settings
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(
                        active ? "bg-gray-100 dark:bg-gray-700" : "",
                        "block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 dark:hover:bg-slate-800",
                      )}
                      onClick={onPromise(() => signOut())}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
});

Header.displayName = "Header";
