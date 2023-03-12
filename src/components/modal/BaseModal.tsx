import { Transition } from "@headlessui/react";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { useOnKeydown } from "../../hooks/useOnKeydown";
import { lockScroll, unlockScroll } from "../../utils/pageScroll";

import { FocusFirst } from "./FocusFirst";

import type { ReactNode } from "react";

type BaseModalProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}>;

export const BaseModal = ({
  isOpen,
  onClose,
  className,
  children,
}: BaseModalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useOnKeydown("Escape", onClose);

  useEffect(() => {
    if (isOpen) {
      lockScroll();
    }
  }, [isOpen]);

  return (
    <Transition
      className="fixed top-0 left-0 z-50 flex h-full w-full overflow-y-auto bg-gray-500/75 p-3 transition-opacity duration-200 dark:bg-black/75"
      show={isOpen}
      onClick={onClose}
      afterLeave={unlockScroll}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        ref={containerRef}
        className={twMerge(
          "m-auto flex w-full flex-col overflow-hidden rounded-lg bg-white dark:bg-slate-900",
          className,
        )}
        onClick={(event) => {
          // stop propagation to avoid triggering `onClick` on the backdrop behind the modal
          event.stopPropagation();
        }}
      >
        <FocusFirst containerRef={containerRef}>{children}</FocusFirst>
      </div>
    </Transition>
  );
};
