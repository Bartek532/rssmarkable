import { z } from "zod";

import type { TypeOf } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

export const registerUserSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Email must be a valid email."),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
    ),
});

export const loginUserSchema = z.object({
  email: z.string().email("Email must be a valid email."),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
    ),
});

export const createFeedSchema = z.object({
  url: z.string().url(),
});

export const createAndConnectFeedSchema = z.object({
  url: z.string().url(),
  email: z.string().email(),
});

export const deleteFeedParams = z.object({
  url: z.string().url(),
  email: z.string().email(),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type CreateFeedInput = TypeOf<typeof createFeedSchema>;
export type CreateAndConnectFeedInput = TypeOf<
  typeof createAndConnectFeedSchema
>;
export type DeleteFeedInput = TypeOf<typeof deleteFeedParams>;
