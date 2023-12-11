import { router, protectedProcedure } from "..";
import { registerDeviceSchema } from "../../../utils/validation/schema";
import {
  getUserDeviceHandler,
  getUserFeedsHandler,
  registerDeviceHandler,
  unregisterDeviceHandler,
} from "../../controllers/user.controller";

export const userRouter = router({
  getUserFeeds: protectedProcedure.query(({ ctx }) =>
    getUserFeedsHandler({ id: ctx.session.user.id }),
  ),
  getUserDevice: protectedProcedure.query(({ ctx }) =>
    getUserDeviceHandler({ id: ctx.session.user.id }),
  ),
  registerDevice: protectedProcedure
    .input(registerDeviceSchema)
    .mutation(({ input, ctx }) =>
      registerDeviceHandler({ ...input, id: ctx.session.user.id }),
    ),
  unregisterDevice: protectedProcedure.mutation(({ ctx }) =>
    unregisterDeviceHandler({ id: ctx.session.user.id }),
  ),
});
