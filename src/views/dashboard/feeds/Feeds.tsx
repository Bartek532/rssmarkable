import {
  ArrowPathIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-hot-toast";

import EmptyFeedsIcon from "public/svg/empty-feeds.svg";

import { Button } from "../../../components/common/Button";
import { Checkbox } from "../../../components/common/Checkbox";
import { Empty } from "../../../components/common/Empty";
import { ConfirmModal } from "../../../components/modal/ConfirmModal";
import { AddFeedModal } from "../../../components/modal/feed/AddFeedModal";
import { FeedTile } from "../../../components/tile/feedTile/FeedTile";
import { useGenericLoader } from "../../../hooks/useGenericLoader";
import { onPromise } from "../../../utils/functions";
import { trpc } from "../../../utils/trpc";

import type { TRPCError } from "@trpc/server";

export const FeedsView = () => {
  const utils = trpc.useContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [checkedFeeds, setCheckedFeeds] = useState<string[]>([]);

  const { data: feeds, isLoading: areFeedsLoading } =
    trpc.user.getUserFeeds.useQuery();

  const deleteFeedMutation = trpc.feed.deleteFeed.useMutation({
    onSuccess: () => utils.user.getUserFeeds.invalidate(),
  });

  const syncFeedsMutation = trpc.user.syncUserFeeds.useMutation();

  const handleFeedCheckChange = (url: string, state: boolean) => {
    if (state) {
      return setCheckedFeeds((feeds) => [...feeds, url]);
    }

    return setCheckedFeeds((feeds) => feeds.filter((feed) => feed !== url));
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && feeds) {
      return setCheckedFeeds(feeds.map(({ url }) => url));
    }

    return setCheckedFeeds([]);
  };

  const handleFeedsSync = async (feeds: string[]) => {
    await toast.promise(
      syncFeedsMutation.mutateAsync({ feeds: feeds.map((url) => ({ url })) }),
      {
        loading: `Syncing ${feeds.length} feed(s)...`,
        success: () => "Sync completed successfully!",
        error: (err: TRPCError | Error) => err.message,
      },
    );
  };

  const handleFeedsDelete = async (feeds: string[]) => {
    setCheckedFeeds((checkedFeeds) =>
      checkedFeeds.filter((url) => !feeds.includes(url)),
    );

    await toast.promise(
      Promise.all(feeds.map((url) => deleteFeedMutation.mutateAsync({ url }))),
      {
        loading: `Deleting ${feeds.length} feed(s)...`,
        success: () => "Feeds deleted successfully!",
        error: (err: TRPCError | Error) => err.message,
      },
    );
  };

  useGenericLoader(areFeedsLoading);

  return (
    <>
      <AddFeedModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        content={`You are about to delete ${
          checkedFeeds.length
        } feed(s):\n\n${checkedFeeds.join("\n")}`}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onConfirm={() => handleFeedsDelete(checkedFeeds)}
      />
      <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:mt-12 lg:px-8">
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            All feeds
          </h2>
          <div className="flex gap-3">
            {checkedFeeds.length ? (
              <>
                <Button
                  onClick={onPromise(() => handleFeedsSync(checkedFeeds))}
                  variant="secondary"
                >
                  <ArrowPathIcon className="h-6 w-6" />{" "}
                  <span className="hidden sm:inline">Sync</span>
                </Button>
                <Button
                  onClick={() => setIsConfirmModalOpen(true)}
                  variant="danger"
                >
                  <TrashIcon className="h-6 w-6" />{" "}
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </>
            ) : null}
            <Button onClick={() => setIsAddModalOpen(true)}>
              <PlusIcon className="h-6 w-6" />{" "}
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </div>

        {feeds?.length ? (
          <>
            <label className="mt-4 ml-auto flex w-fit cursor-pointer gap-7 font-medium dark:text-gray-300">
              <Checkbox
                name="all"
                onChange={handleSelectAllChange}
                isChecked={feeds.length === checkedFeeds.length}
              />
              Select all
            </label>
            <ul className="mt-5 flex flex-col gap-5">
              {feeds.map((feed) => (
                <FeedTile
                  url={feed.url}
                  key={feed.id}
                  isChecked={checkedFeeds.some((url) => url === feed.url)}
                  onChange={(e) =>
                    handleFeedCheckChange(feed.url, e.target.checked)
                  }
                />
              ))}
            </ul>
          </>
        ) : (
          <Empty onCreateNew={() => setIsAddModalOpen(true)}>
            <EmptyFeedsIcon className="h-50 mx-auto w-40 text-gray-400 dark:text-gray-500" />
            <span className="mt-6 block text-lg font-medium text-gray-900 dark:text-white">
              You haven&apos;t added any feed yet!
            </span>
          </Empty>
        )}
      </section>
    </>
  );
};
