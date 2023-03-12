import { memo } from "react";

import AvatarIcon from "public/svg/avatar.svg";

interface AvatarProps {
  readonly image?: string | null | undefined;
  readonly name?: string | null | undefined;
  readonly isSmall?: boolean;
}

export const Avatar = memo<AvatarProps>(({ image, name, isSmall = false }) => {
  const size = isSmall ? 10 : 14;
  const text = isSmall ? "lg" : "2xl";

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={`h-${size} w-${size} rounded-full`} src={image} alt="" />
    );
  }

  if (name) {
    return (
      <span
        className={`inline-flex text-${text} h-${size} w-${size} items-center justify-center rounded-full`}
        style={{ backgroundColor: "#fcce54" }}
      >
        <span className="font-medium leading-none text-white">{name[0]}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-block h-${size} w-${size} overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800`}
    >
      <AvatarIcon className="h-full w-full text-gray-300 dark:text-gray-600" />
    </span>
  );
});

Avatar.displayName = "Avatar";
