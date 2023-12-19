"use server";

import { revalidatePath } from "next/cache";

import type {
  CreateFeedInput,
  DeleteFeedsInput,
} from "@/utils/validation/types";

import { api } from "@/trpc/server";

export const createFeed = async (data: CreateFeedInput) => {
  const response = await api.feed.createFeed.mutate(data);
  revalidatePath("/dashboard/feeds");
  return response;
};

export const deleteFeeds = async (data: DeleteFeedsInput) => {
  const response = await api.user.deleteUserFeeds.mutate(data);
  revalidatePath("/dashboard/feeds");
  return response;
};
