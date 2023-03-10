import {
  createFeedHandler,
  deleteFeedHandler,
  getAllFeedsHandler,
  getFeedDetailsHandler,
  syncArticleHandler,
} from "../../../server/controllers/feed.controller";
import {
  createFeedSchema,
  deleteFeedSchema,
  getWebsiteDetailsSchema,
  syncArticleSchema,
} from "../../../utils/validation";
import { router, protectedProcedure } from "../trpc";

export const feedRouter = router({
  createFeed: protectedProcedure
    .input(createFeedSchema)
    .mutation(({ input, ctx }) =>
      createFeedHandler({ ...input, id: ctx.session.user.id }),
    ),
  deleteFeed: protectedProcedure
    .input(deleteFeedSchema)
    .mutation(({ input, ctx }) =>
      deleteFeedHandler({ ...input, id: ctx.session.user.id }),
    ),
  getFeedDetails: protectedProcedure
    .input(getWebsiteDetailsSchema)
    .query(({ input }) => getFeedDetailsHandler(input)),
  getAllFeeds: protectedProcedure.query(() => getAllFeedsHandler()),
  syncArticle: protectedProcedure
    .input(syncArticleSchema)
    .mutation(({ input, ctx }) =>
      syncArticleHandler({ id: ctx.session.user.id, ...input }),
    ),
});
