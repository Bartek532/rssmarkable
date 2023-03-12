import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

import Logo from "public/svg/logo.svg";

import type { HeroIcon } from "../../../../types/common.types";

interface NavigationItem {
  readonly name: string;
  readonly href: string;
  readonly icon: HeroIcon;
}

interface SidebarProps {
  readonly navigation: NavigationItem[];
  readonly secondaryNavigation: Omit<NavigationItem, "current">[];
}

export const Sidebar = memo<SidebarProps>(
  ({ navigation, secondaryNavigation }) => {
    const { pathname } = useRouter();

    return (
      <>
        <div className="flex flex-shrink-0 items-center px-4">
          <Logo />
        </div>
        <nav
          className="mt-5 flex flex-1 flex-col justify-between overflow-y-auto"
          aria-label="Sidebar"
        >
          <div className="space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  pathname === item.href
                    ? "bg-indigo-800 text-white dark:bg-indigo-500/20 dark:text-indigo-200"
                    : "text-indigo-100 hover:bg-indigo-600 hover:text-white dark:text-indigo-200 dark:hover:bg-indigo-500/20",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 transition",
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <item.icon
                  className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-200 dark:text-indigo-300"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 pt-6">
            <div className="space-y-1 px-2">
              {secondaryNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    pathname === item.href
                      ? "bg-indigo-800 text-white dark:bg-indigo-500/20 dark:text-indigo-200"
                      : "text-indigo-100 hover:bg-indigo-600 hover:text-white dark:text-indigo-200 dark:hover:bg-indigo-500/20",
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 transition",
                  )}
                >
                  <item.icon
                    className="mr-4 h-6 w-6 text-indigo-200 dark:text-indigo-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </>
    );
  },
);

Sidebar.displayName = "Sidebar";
