import { memo } from "react";

import type { SyntheticEvent } from "react";

interface EmptyProps {
  readonly children: React.ReactNode;
  readonly onCreateNew: (event: SyntheticEvent) => void;
}

export const Empty = memo<EmptyProps>(({ children, onCreateNew }) => {
  return (
    <button
      type="button"
      className="relative mt-8 flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-16 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:hover:border-gray-600"
      onClick={onCreateNew}
    >
      {children}
    </button>
  );
});

Empty.displayName = "Empty";
