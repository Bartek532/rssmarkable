import clsx from "clsx";
import {
  Children,
  isValidElement,
  type NamedExoticComponent,
  type SyntheticEvent,
} from "react";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function onPromise<T>(promise: (event: SyntheticEvent) => Promise<T>) {
  return (event: SyntheticEvent) => {
    promise(event).catch((error) => {
      console.log("Unexpected error", error);
    });
  };
}

export const nonNullable = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const retrieveChild = (
  children: React.ReactNode,
  childType?: string,
) => {
  return (
    childType &&
    Children.toArray(children).find(
      (child) =>
        isValidElement(child) &&
        ((typeof child.type === "object" &&
          (child.type as NamedExoticComponent).displayName === childType) ||
          (typeof child.type === "function" && child.type.name === childType)),
    )
  );
};

const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth;

export const lockScroll = () => {
  const scrollbarWidth = getScrollbarWidth();

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
};

export const unlockScroll = () => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = ``;
};

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;
