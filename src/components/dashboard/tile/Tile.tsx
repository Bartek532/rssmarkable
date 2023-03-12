import Link from "next/link";
import { memo } from "react";

import type { HeroIcon } from "../../../../types/common.types";

interface Card {
  readonly title: string;
  readonly value: string | number;
  readonly icon: HeroIcon;
  readonly link: string;
  readonly href: string;
}

interface TileProps {
  readonly card: Card;
}

export const Tile = memo<TileProps>(({ card }) => {
  return (
    <div
      key={card.title}
      className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-slate-800/20 dark:shadow-slate-900"
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <card.icon
              className="h-6 w-6 text-gray-400 dark:text-gray-300"
              aria-hidden="true"
            />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                {card.title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {card.value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 px-5 py-3 dark:bg-slate-800/30">
        <div className="text-sm">
          <Link
            href={card.href}
            className="font-medium text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-400"
          >
            {card.link}
          </Link>
        </div>
      </div>
    </div>
  );
});

Tile.displayName = "Tile";
