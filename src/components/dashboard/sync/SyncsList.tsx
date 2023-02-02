import { memo } from "react";

import { Button, BUTTON_VARIANT } from "../../common/Button";

import { SyncItem } from "./SyncItem";

import type { Sync } from "@prisma/client";

interface SyncsListProps {
  readonly syncs: Sync[];
  readonly total: number | undefined;
  readonly page: number;
  readonly perPage: number;
  readonly onPageChange: (page: number) => void;
}

export const SyncsList = memo<SyncsListProps>(
  ({ syncs, total, page, perPage, onPageChange }) => {
    return (
      <>
        <div className=" shadow sm:hidden">
          <ul
            role="list"
            className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
          >
            {syncs.map((sync) => (
              <SyncItem sync={sync} key={sync.id} />
            ))}
          </ul>

          <nav
            className="flex items-center justify-between bg-gray-50 px-4 py-3"
            aria-label="Pagination"
          >
            <div className="flex flex-1 justify-between">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Next
              </a>
            </div>
          </nav>
        </div>
        <div className="hidden sm:block">
          <div className="mx-auto max-w-6xl">
            <div className="mt-2 flex flex-col">
              <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        Sync uid
                      </th>
                      <th
                        className="whitespace-nowrap bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        Synced articles
                      </th>
                      <th
                        className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                        scope="col"
                      >
                        Status
                      </th>
                      <th
                        className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                        scope="col"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {syncs.map((sync) => (
                      <SyncItem sync={sync} key={sync.id} />
                    ))}
                  </tbody>
                </table>

                <nav
                  className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                  aria-label="Pagination"
                >
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {(page - 1) * perPage + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {total && total < perPage * page
                          ? total
                          : perPage * page}
                      </span>{" "}
                      of <span className="font-medium">{total ?? 0}</span>{" "}
                      results
                    </p>
                  </div>
                  <div className="flex flex-1 justify-between gap-2 sm:justify-end">
                    <Button
                      disabled={page === 1}
                      variant={BUTTON_VARIANT.SECONDARY}
                      onClick={() => onPageChange(page - 1)}
                    >
                      Previous
                    </Button>

                    <Button
                      disabled={(total ?? 0) < perPage * page}
                      variant={BUTTON_VARIANT.SECONDARY}
                      onClick={() => onPageChange(page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);

SyncsList.displayName = "SyncsList";
