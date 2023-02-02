import { twMerge } from "tailwind-merge";

import type { HTMLAttributes } from "react";

const variants = {
  1: "text-2xl",
  2: "text-xl",
  3: "text-lg",
  4: "text-base",
  5: "text-sm",
  6: "text-xs",
} as const;

type HeadingProps = Readonly<{
  level: keyof typeof variants;
}> &
  HTMLAttributes<HTMLHeadingElement>;

export const Heading = ({ level, className, ...props }: HeadingProps) => {
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={twMerge(
        "font-medium leading-6 text-gray-900",
        variants[level],
        className,
      )}
      {...props}
    />
  );
};
