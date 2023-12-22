import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DASHBOARD_CARDS } from "@/config/dashboard";
import { api } from "@/trpc/server";
import { cn } from "@/utils";

import { AddFeedDialog } from "../feeds/dialog/add-feed-dialog";
import { SyncArticleDialog } from "../feeds/dialog/sync-article-dialog";
import { Syncs } from "../syncs/syncs";

export const Home = async () => {
  const feeds = await api.user.getUserFeeds.query({});
  const device = await api.user.getUserDevice.query();
  const syncs = await api.sync.getUserSyncs.query();

  const cardsValues = [
    feeds.count ?? 0,
    device ? "reMarkable 2" : "Not registered",
    syncs.length,
    "+20 hours",
  ];

  return (
    <>
      <div className="flex flex-col justify-between gap-4 space-y-2 sm:flex-row sm:gap-8">
        <div className="flex flex-col justify-start space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, guest!
          </h1>
          <div className="ml-1 flex items-center space-x-2">
            <div
              className={cn(
                "h-3 w-3 rounded-full",
                !!device ? "bg-success" : "bg-destructive",
              )}
            ></div>
            <span className="text-sm text-muted-foreground">
              {!!device
                ? "Device registered - sync active"
                : "Device not registered - sync inactive"}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <AddFeedDialog>
            <Button variant="outline">Add feed</Button>
          </AddFeedDialog>
          <SyncArticleDialog>
            <Button>Sync article</Button>
          </SyncArticleDialog>
        </div>
      </div>

      <div className="mt-16">
        <section className="mx-auto">
          <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Overview
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DASHBOARD_CARDS.map((card, index) => {
              const value = cardsValues[index];

              return value || value === 0 ? (
                <Card key={card.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <card.icon />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
              ) : null;
            })}
          </div>
        </section>

        <section className="mx-auto mt-10 lg:mt-12">
          <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white sm:px-0">
            Recent syncs
          </h2>
          <Syncs syncs={syncs} />
        </section>
      </div>
    </>
  );
};