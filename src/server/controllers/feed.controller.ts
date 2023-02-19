import { SyncStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { parse } from "rss-to-json";

import { syncArticle } from "../../pages/api/sync";
import { ApiError, HTTP_STATUS_CODE } from "../../utils/exceptions";
import {
  createFeed,
  deleteFeed,
  getAllFeeds,
  getFeedByUrl,
  getFeedsFromOPML,
} from "../services/feed.service";
import { getApi } from "../services/remarkable.service";
import { createSync, updateSync } from "../services/sync.service";
import {
  deleteFeedFromUser,
  getUserById,
  getUserFeedByUrl,
} from "../services/user.service";

import type { FeedApi } from "../../../types/feed.types";
import type {
  CreateAndConnectFeedInput,
  CreateFeedsFromOPMLInput,
  DeleteAndDisconnectFeedInput,
  GetWebsiteDetailsInput,
  SyncArticleInput,
} from "../../utils/validation";

export const createFeedHandler = async ({
  url,
  id,
}: CreateAndConnectFeedInput) => {
  try {
    const isFeedExists = await getUserFeedByUrl({ url, id });
    if (isFeedExists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "You've already added this feed!",
      });
    }

    const response = await fetch(url);

    if (
      response.status !== HTTP_STATUS_CODE.OK ||
      !response.headers.get("content-type")?.includes("xml")
    ) {
      throw new ApiError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Error occured! Please check your provided url and try again!",
      );
    }

    const feed = await createFeed({ url, id });

    return {
      status: "Success",
      message: `Successfully added feed!`,
      feed,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createFeedsFromOPMLHandler = async ({
  content,
  id,
}: CreateFeedsFromOPMLInput) => {
  const urls = getFeedsFromOPML(content);

  await Promise.all(
    urls.map(async (url) => {
      try {
        await createFeedHandler({ url, id });
      } catch (_err) {}
    }),
  );

  return {
    status: "Success",
    message: `Successfully added feeds!`,
  };
};

export const deleteFeedHandler = async ({
  url,
  id,
}: DeleteAndDisconnectFeedInput) => {
  try {
    const feed = await getFeedByUrl({ url });
    if (!feed) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post with that ID not found",
      });
    }

    if (feed.users.length > 1) {
      await deleteFeedFromUser({ id, url });
    } else {
      await deleteFeed({ url });
    }

    return {
      status: "Success",
      message: `Successfully deleted feed!`,
      feed,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const syncArticleHandler = async ({
  id,
  url,
}: SyncArticleInput & { id: number }) => {
  try {
    const user = await getUserById({ id });

    if (!user) {
      throw new ApiError(HTTP_STATUS_CODE.NOT_FOUND, "User not found!");
    }

    if (!user.device) {
      console.log(`Device not found for user ${user.email ?? user.id}!`);
      throw new ApiError(
        HTTP_STATUS_CODE.NOT_FOUND,
        "Device not found, register it first!",
      );
    }

    const api = await getApi({ token: user.device.token });
    const sync = await createSync({ id: user.id });

    try {
      await syncArticle({ article: { link: url }, api });

      await updateSync({
        id: sync.id,
        data: {
          finishedAt: new Date(),
          syncedArticlesCount: 1,
          status: SyncStatus.SUCCESS,
        },
      });

      return {
        status: "Success",
        message: `Successfully synced article!`,
        url,
      };
    } catch (err) {
      await updateSync({
        id: sync.id,
        data: {
          finishedAt: new Date(),
          syncedArticlesCount: 0,
          status: SyncStatus.FAILED,
        },
      });

      throw err;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getFeedDetailsHandler = async ({
  url,
}: GetWebsiteDetailsInput) => {
  try {
    const feed = (await parse(url)) as FeedApi; // TODO: fix title

    return {
      status: "Success",
      feed: {
        title: feed.title,
        description: feed.description,
        image: feed.image,
        url: feed.link,
      },
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllFeedsHandler = async () => {
  try {
    const feeds = await getAllFeeds();

    return {
      status: "Success",
      feeds,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
