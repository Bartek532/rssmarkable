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
  url: z.string().min(1, "Url is required.").url("Url must be a valid url."),
});

export const createAndConnectSchema = z.object({
  url: z.string().url(),
  id: z.number(),
});

export const deleteFeedSchema = z.object({
  url: z.string().url(),
});

export const deleteAndDisconnectFeedSchema = z.object({
  url: z.string().url(),
  id: z.number(),
});

export const getWebsiteDetailsSchema = z.object({
  url: z.string().url(),
});

export const registerDeviceSchema = z.object({
  code: z
    .string()
    .min(8, "Enter valid one-time code.")
    .max(8, "Enter valid one-time code."),
});

export const registerAndConnectDeviceSchema = z.object({
  code: z
    .string()
    .min(8, "Enter valid one-time code.")
    .max(8, "Enter valid one-time code."),
  id: z.number(),
});

export const unregisterAndDisconnectDeviceSchema = z.object({
  id: z.number(),
});

export const updateUserNameSchema = z.object({
  content: z.string().min(1, "Name is required."),
});

export const updateUserEmailSchema = z.object({
  content: z.string().email("Email must be a valid email."),
});

export const updateUserPasswordSchema = z.object({
  content: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
    ),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type CreateFeedInput = TypeOf<typeof createFeedSchema>;
export type CreateAndConnectFeedInput = TypeOf<typeof createAndConnectSchema>;
export type DeleteFeedInput = TypeOf<typeof deleteFeedSchema>;
export type DeleteAndDisconnectFeedInput = TypeOf<
  typeof deleteAndDisconnectFeedSchema
>;
export type GetWebsiteDetailsInput = TypeOf<typeof getWebsiteDetailsSchema>;
export type RegisterDeviceInput = TypeOf<typeof registerDeviceSchema>;
export type RegisterAndConnectDeviceInput = TypeOf<
  typeof registerAndConnectDeviceSchema
>;
export type UnregisterAndDisconnectDeviceInput = TypeOf<
  typeof unregisterAndDisconnectDeviceSchema
>;
