import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import EmptySyncsIcon from "public/svg/empty-syncs.svg";

import { Button } from "../../components/common/button/Button";
import { Empty } from "../../components/common/empty/Empty";
import { Profile } from "../../components/dashboard/profile/Profile";
import { SyncsList } from "../../components/dashboard/sync/SyncsList";
import { Tile } from "../../components/dashboard/tile/Tile";
import { AddFeedModal } from "../../components/modal/feed/AddFeedModal";
import { DASHBOARD_CARDS } from "../../utils/consts";
import { trpc } from "../../utils/trpc";

import type { CreateFeedInput } from "../../utils/validation";
import type { Sync } from "@prisma/client";
import type { TRPCError } from "@trpc/server";

export const HomeView = () => {
  const utils = trpc.useContext();
  const { data } = useSession();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [syncs, setSyncs] = useState({
    page: 1,
    perPage: 10,
    syncs: [] as Sync[],
    total: 0,
    articles: 0,
  });

  const addFeedMutation = trpc.feed.createFeed.useMutation({
    onSuccess: () => utils.user.getUserFeeds.invalidate(),
  });

  const onAdd = async ({ url }: CreateFeedInput) => {
    await toast.promise(
      addFeedMutation.mutateAsync({
        url,
      }),
      {
        loading: "Adding feed...",
        success: ({ message }) => {
          setIsAddModalOpen(false);
          return message;
        },
        error: (err: TRPCError | Error) => err.message,
      },
    );
  };

  const { data: feeds } = trpc.user.getUserFeeds.useQuery();
  const { data: device } = trpc.user.getUserDevice.useQuery();
  trpc.user.getUserSyncs.useQuery(
    {
      page: syncs.page,
      perPage: syncs.perPage,
    },
    {
      onSuccess: ({ total, syncs, articles }) =>
        setSyncs((prev) => ({ ...prev, syncs, total, articles })),
      queryKey: [
        "user.getUserSyncs",
        { page: syncs.page, perPage: syncs.perPage },
      ],
      keepPreviousData: true,
    },
  );

  const values = [
    feeds?.length ?? 0,
    device ? "reMarkable 2" : "Not registered",
    syncs.syncs.length ? syncs.articles : "Unavailable",
  ];

  return (
    <>
      <AddFeedModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        onAdd={onAdd}
      />
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <Profile user={data?.user} isRegistered={!!device} />
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <Button
                variant="secondary"
                onClick={() => setIsAddModalOpen(true)}
              >
                Add feed
              </Button>
              <Button>Sync feeds</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Overview
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DASHBOARD_CARDS.map((card, index) => (
              <Tile
                card={{ ...card, value: values[index]! }}
                key={card.title}
              />
            ))}
          </div>
        </div>

        <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Recent syncs
          </h2>
          {syncs.syncs.length ? (
            <div className="mt-4">
              <SyncsList
                syncs={syncs.syncs}
                total={syncs.total}
                page={syncs.page}
                perPage={syncs.perPage}
                onPageChange={(page) => setSyncs((prev) => ({ ...prev, page }))}
              />
            </div>
          ) : (
            <Empty onCreateNew={() => console.log("SYNC")}>
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