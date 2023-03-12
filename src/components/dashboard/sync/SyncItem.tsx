import { ArrowPathIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import { memo } from "react";

import { useWindowSize } from "../../../hooks/useWindowSize";

import type { Sync } from "@prisma/client";

interface SyncItemProps {
  readonly sync: Sync;
}

const statusStyles = {
  SUCCESS: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  FAILED: "bg-red-100 text-red-800",
  UNKNOWN: "bg-gray-100 text-gray-800",
};

export const SyncItem = memo<SyncItemProps>(({ sync }) => {
  const { width } = useWindowSize();

  if (width < 640) {
    return (
      <li key={sync.id} className="sm:hidden">
        <Link
          href={`/dashboard/syncs/${sync.id}`}
          className="block bg-white px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <span className="flex items-center space-x-4">
            <span className="flex flex-1 space-x-2 truncate">
              <ArrowPathIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-300"
                aria-hidden="true"
              />
              <span className="flex flex-col items-start gap-1.5 truncate text-sm text-gray-500 dark:text-gray-400">
                <span className="truncate">{sync.id}</span>
                <span
                  className={clsx(
                    statusStyles[sync.status],
                    "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                  )}
                >
                  {sync.status.toLocaleLowerCase()}
                </span>
                <time dateTime={sync.startedAt.toString()}>
                  {dayjs(sync.startedAt).format("MMMM D, HH:mm")}
                </time>
              </span>
            </span>
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Link>
      </li>
    );
  }

  return (
    <tr key={sync.id} className="bg-white dark:bg-gray-800">
      <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
        <div className="flex">
          <Link
            href={`/dashboard/syncs/${sync.id}`}
            className="group inline-flex space-x-2 truncate text-sm"
          >
            <ArrowPathIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-400"
              aria-hidden="true"
            />
            <p className="truncate text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100">
              {sync.id}
            </p>
          </Link>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500 dark:text-gray-400">
        {sync.syncedArticlesCount}
      </td>
      <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400 md:block">
        <span
          className={clsx(
            statusStyles[sync.status],
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
          )}
        >
          {sync.status.toLocaleLowerCase()}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500 dark:text-gray-400">
        <time dateTime={sync.startedAt.toString()}>
          {dayjs(sync.startedAt).format("MMMM D, HH:mm")}
        </time>
      </td>
    </tr>
  );
});

SyncItem.displayName = "SyncItem";
