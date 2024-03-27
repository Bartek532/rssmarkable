import { removeProtocolsFromUrl } from "@rssmarkable/shared";
import { ArrowUpRight } from "lucide-react";
import { memo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/trpc/server";

type ArticleTileProps = {
  readonly url: string;
};

export const ArticleTile = memo<ArticleTileProps>(async ({ url }) => {
  const { data } = await api.feed.getUrlDetails.query({
    url,
  });

  return (
    <a
      href={url}
      className="group flex w-full flex-1 items-start justify-between gap-4 sm:gap-6"
      target="_blank"
      rel="noreferrer"
    >
      <Avatar className="mt-1 h-7 w-7 shrink-0 sm:h-8 sm:w-8">
        <AvatarImage src={data.icon} alt="" />
        <AvatarFallback>{data.title[0]}</AvatarFallback>
      </Avatar>
      <div className="mr-auto flex flex-col gap-1">
        <span className="text-sm font-bold underline group-hover:no-underline">
          {data.title}
        </span>
        <span className="text-xs text-muted-foreground">
          {removeProtocolsFromUrl(url)}
        </span>
      </div>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary sm:h-6 sm:w-6" />
    </a>
  );
});

ArticleTile.displayName = "ArticleTile";
