import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export enum BUTTON_VARIANT {
  PRIMARY = "border-transparent bg-indigo-600 text-white enabled:hover:bg-indigo-700",
  SECONDARY = "border-gray-300 bg-white text-gray-700 enabled:hover:bg-gray-50",
  DANGER = "border-transparent bg-red-600 text-white enabled:hover:bg-red-700 focus:ring-red-500",
  TEXT = "rounded-md border-none bg-gray-100 font-medium text-indigo-600 shadow-none hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100",
}

export const Button = forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements["button"] & {
    variant?: BUTTON_VARIANT;
  }
>(({ variant = BUTTON_VARIANT.PRIMARY, className, ...props }, ref) => {
  return (
    <button
      className={twMerge(
        "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50",
        variant,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";
