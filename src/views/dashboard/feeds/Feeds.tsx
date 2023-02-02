import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-hot-toast";

import EmptyFeedsIcon from "public/svg/empty-feeds.svg";

import { Button } from "../../../components/common/Button";
import { Empty } from "../../../components/common/Empty";
import { Heading } from "../../../components/dashboard/heading/Heading";
import { AddFeedModal } from "../../../components/modal/feed/AddFeedModal";
import { FeedTile } from "../../../components/tile/feedTile/FeedTile";
import { useGenericLoader } from "../../../hooks/useGenericLoader";
import { trpc } from "../../../utils/trpc";

import type { TRPCError } from "@trpc/server";

export const FeedsView = () => {
  const utils = trpc.useContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: feeds, isLoading: areFeedsLoading } =
    trpc.user.getUserFeeds.useQuery();

  const deleteFeedMutation = trpc.feed.deleteFeed.useMutation({
    onSuccess: () => utils.user.getUserFeeds.invalidate(),
  });

  useGenericLoader(areFeedsLoading);

  const handleDeleteFeed = async ({ url }: { url: string }) => {
    await toast.promise(
      deleteFeedMutation.mutateAsync({
        url,
      }),
      {
        loading: "Deleting feed...",
        success: ({ message }) => message,
        error: (err: TRPCError | Error) => err.message,
      },
    );
  };

  return (
    <>
      <AddFeedModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
        <div className="flex w-full items-center justify-between">
          <Heading level={2}>All feeds</Heading>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <PlusIcon className="h-6 w-6" /> Add feed
          </Button>
        </div>
        {feeds?.length ? (
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {feeds.map((feed) => (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <FeedTile
                url={feed.url}
                key={feed.id}
                onDelete={handleDeleteFeed}
              />
            ))}
          </div>
        ) : (
          <Empty onCreateNew={() => setIsAddModalOpen(true)}>
            <EmptyFeedsIcon className="h-50 mx-auto w-40 text-gray-400" />
            <span className="mt-6 block text-lg font-medium text-gray-900">
              You haven&apos;t added any feed yet!
            </span>
          </Empty>
        )}
      </section>
    </>
  );
};
