import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { Fragment, memo, useState } from "react";

import {
  DASHBOARD_NAVIGATION,
  DASHBOARD_SECONDARY_NAVIGATION,
} from "../../../config/dashboard";
import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";

interface DashboardLayoutProps {
  readonly children: React.ReactNode;
}

export const DashboardLayout = memo<DashboardLayoutProps>(({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Transition.Root show={isSidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setIsSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4 dark:bg-slate-900">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <Sidebar
                  navigation={DASHBOARD_NAVIGATION}
                  secondaryNavigation={DASHBOARD_SECONDARY_NAVIGATION}
                />
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true"></div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto bg-indigo-700 pt-5 pb-4 dark:border-r dark:border-slate-800/50 dark:bg-slate-900/50">
          <Sidebar
            navigation={DASHBOARD_NAVIGATION}
            secondaryNavigation={DASHBOARD_SECONDARY_NAVIGATION}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:pl-64">
        <Header
          user={data?.user}
          onSidebarOpen={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 pb-8 ">{children}</main>
      </div>
    </div>
  );
});

DashboardLayout.displayName = "DashboardLayout";
