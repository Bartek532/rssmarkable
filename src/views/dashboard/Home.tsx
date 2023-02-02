import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import EmptySyncsIcon from "public/svg/empty-syncs.svg";

import { Button, BUTTON_VARIANT } from "../../components/common/Button";
import { Empty } from "../../components/common/Empty";
import { Heading } from "../../components/dashboard/heading/Heading";
import { Profile } from "../../components/dashboard/profile/Profile";
import { SyncsList } from "../../components/dashboard/sync/SyncsList";
import { Tile } from "../../components/dashboard/tile/Tile";
import { AddFeedModal } from "../../components/modal/feed/AddFeedModal";
import { DASHBOARD_CARDS } from "../../config/dashboard";
import { useGenericLoader } from "../../hooks/useGenericLoader";
import { onPromise } from "../../utils/functions";
import { trpc } from "../../utils/trpc";

import type { Sync } from "@prisma/client";
import type { TRPCError } from "@trpc/server";

export const HomeView = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [{ page, perPage, syncs, total, articles }, setSyncsData] = useState(
    () => ({
      page: 1,
      perPage: 10,
      syncs: [] as Sync[],
      total: 0,
      articles: 0,
    }),
  );
  const utils = trpc.useContext();
  const { data } = useSession();

  const syncFeedsMutation = trpc.user.syncUserFeeds.useMutation({
    onSuccess: () => utils.user.getUserSyncs.invalidate(),
  });

  const { data: feeds, isLoading: areFeedsLoading } =
    trpc.user.getUserFeeds.useQuery();
  const { data: device, isLoading: isDeviceLoading } =
    trpc.user.getUserDevice.useQuery();
  trpc.user.getUserSyncs.useQuery(
    {
      page: page,
      perPage: perPage,
    },
    {
      onSuccess: ({ total, syncs, articles }) =>
        setSyncsData((previousData) => ({
          ...previousData,
          syncs,
          total,
          articles,
        })),
      queryKey: ["user.getUserSyncs", { page: page, perPage: perPage }],
      keepPreviousData: true,
    },
  );

  const feedsSyncHandler = async () => {
    await toast.promise(syncFeedsMutation.mutateAsync(), {
      loading: "Syncing...",
      success: () => "Sync completed successfully!",
      error: (err: TRPCError | Error) => err.message,
    });
  };

  const pageChangeHandler = useCallback(
    (page: number) =>
      setSyncsData((previousData) => ({ ...previousData, page })),
    [],
  );

  const cardsValues = [
    feeds?.length ?? 0,
    device ? "reMarkable 2" : "Not registered",
    syncs.length ? articles : "Unavailable",
  ];

  useGenericLoader([areFeedsLoading, isDeviceLoading]);

  return (
    <>
      <AddFeedModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <Profile user={data?.user} isRegistered={!!device} />
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <Button
                variant={BUTTON_VARIANT.SECONDARY}
                onClick={() => setIsAddModalOpen(true)}
              >
                Add feed
              </Button>
              <Button onClick={onPromise(feedsSyncHandler)}>Sync feeds</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Heading level={2}>Overview</Heading>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DASHBOARD_CARDS.map((card, index) => {
              const value = cardsValues[index];

              return value ? (
                <Tile card={{ ...card, value }} key={card.title} />
              ) : null;
            })}
          </div>
        </div>

        <section className="mx-auto mt-10 max-w-6xl sm:px-6 lg:mt-12 lg:px-8">
          <Heading level={2} className="px-4 sm:px-0">
            Recent syncs
          </Heading>
          {syncs.length ? (
            <div className="mt-4">
              <SyncsList
                syncs={syncs}
                total={total}
                page={page}
                perPage={perPage}
                onPageChange={pageChangeHandler}
              />
            </div>
          ) : (
            <Empty onCreateNew={onPromise(feedsSyncHandler)}>
              <EmptySyncsIcon className="h-50 mx-auto w-40 text-gray-400" />
              <span className="mt-6 block text-lg font-medium text-gray-900">
                You haven&apos;t synced any feeds yet!
              </span>
            </Empty>
          )}
        </section>
      </div>
    </>
  );
};
