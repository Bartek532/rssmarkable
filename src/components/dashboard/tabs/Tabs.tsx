import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import type { ChangeEvent } from "react";

interface Tab {
  readonly label: string;
  readonly pathname: string;
}

interface TabsProps {
  readonly tabs: Tab[];
}

export const Tabs = ({ tabs }: TabsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const tab = tabs.find(({ pathname }) => pathname === event.target.value);

    if (tab) {
      router.push(tab.pathname);
    }
  };

  return (
    <>
      <select
        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 sm:text-sm md:hidden"
        aria-label="Select a tab"
        value={pathname ?? ""}
        onChange={handleSelectChange}
      >
        {tabs.map(({ label, pathname }) => (
          <option key={label} value={pathname}>
            {label}
          </option>
        ))}
      </select>
      <nav className="hidden space-x-8 border-b border-gray-200 md:flex">
        {tabs.map((tab) => (
          <Link
            key={tab.pathname}
            href={tab.pathname}
            className={twMerge(
              "cursor-pointer whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
              tab.pathname === pathname
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </>
  );
};
