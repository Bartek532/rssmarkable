import { removeProtocolsFromUrl } from "@rssmarkable/shared";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import withErrorBoundary from "@/shared/hoc/withErrorBoundary";
import withSuspense from "@/shared/hoc/withSuspense";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Footer } from "../ui/footer";
import { Skeleton } from "../ui/skeleton";

const Component = () => {
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab | null>(null);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    setActiveTab(tabs[0] ?? null);
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-4 pb-2">
      <div className="mb-2 flex w-full items-start justify-start gap-3">
        {activeTab ? (
          <>
            <Avatar>
              <AvatarImage src={activeTab?.favIconUrl} />
              <AvatarFallback>N/A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start gap-0.5 overflow-hidden text-ellipsis">
              <span className="max-w-full overflow-hidden text-ellipsis text-[0.9rem] font-bold leading-snug">
                {activeTab?.title}
              </span>
              <p className="max-w-full overflow-hidden text-ellipsis text-muted-foreground">
                {removeProtocolsFromUrl(activeTab.url ?? "")}
              </p>
            </div>
          </>
        ) : (
          <Skeleton className="h-20 w-full" />
        )}
      </div>
      <Button className="h-8.5 w-full text-[0.8rem]">Sync now!</Button>
      <Footer />
    </div>
  );
};

export const Popup = withErrorBoundary(
  withSuspense(Component, <div> Loading... </div>),
  <div> Error occured! </div>,
);
