import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import type { FieldError } from "react-hook-form";

type InputProps = Readonly<{
  error?: FieldError | undefined;
  isValidated?: boolean;
}> &
  JSX.IntrinsicElements["input"];

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, isValidated, children, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {children}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            ref={ref}
            {...props}
            className={twMerge(
              "block w-full rounded-md border-gray-300 py-2.5 px-4 transition ease-in-out focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 sm:text-sm",
              error && "border-red-500",
            )}
            type={props.type ?? "text"}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {error ? (
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            ) : isValidated ? (
              <CheckCircleIcon
                className="h-5 w-5 text-green-500"
                aria-hidden="true"
              />
            ) : null}
          </div>
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
