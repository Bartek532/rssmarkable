import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";

import {
  AVAILABLE_THEMES,
  useThemeContext,
} from "../../../providers/ThemeProvider";

export const SettingsView = () => {
  const { theme, changeTheme } = useThemeContext();

  return (
    <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-black dark:text-white">Theme</span>
        </div>

        <Listbox value={theme} onChange={(value) => changeTheme(value)}>
          <div className="relative mt-1 w-32">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg- py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
              <span className="block truncate">{theme}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {AVAILABLE_THEMES.map(({ name, value }) => (
                <Listbox.Option
                  key={value}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      active && "bg-indigo-100 text-indigo-900",
                      { default: "text-gray-900" },
                    )
                  }
                  value={value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          "block truncate",
                          { selected: "font-medium" },
                          { default: "font-normal" },
                        )}
                      >
                        {name}
                      </span>

                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </div>
  );
};
