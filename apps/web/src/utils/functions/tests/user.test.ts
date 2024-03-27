import { describe, it, expect } from "vitest";

import { getAvatar, getName } from "../user";

import type { User } from "@rssmarkable/database";

describe("getName", () => {
  it("should return the name from user_metadata if it exists", () => {
    const user = { user_metadata: { name: "John Doe" } } as User;
    expect(getName(user)).toBe("John Doe");
  });

  it("should return the name from identity_data if it exists and user_metadata does not", () => {
    const user = {
      identities: [{ identity_data: { name: "John Doe" } }],
    } as unknown as User;
    expect(getName(user)).toBe("John Doe");
  });

  it("should return the full_name from identity_data if it exists and name does not", () => {
    const user = {
      identities: [{ identity_data: { full_name: "John Doe" } }],
    } as unknown as User;
    expect(getName(user)).toBe("John Doe");
  });

  it("should return the user_name from identity_data if it exists and full_name does not", () => {
    const user = {
      identities: [{ identity_data: { user_name: "JohnDoe" } }],
    } as unknown as User;
    expect(getName(user)).toBe("JohnDoe");
  });

  it("should return the preferred_username from identity_data if it exists and user_name does not", () => {
    const user = {
      identities: [{ identity_data: { preferred_username: "JohnDoe" } }],
    } as unknown as User;
    expect(getName(user)).toBe("JohnDoe");
  });

  it("should return undefined if no name is found", () => {
    const user = { identities: [{ identity_data: {} }] } as unknown as User;
    expect(getName(user)).toBeUndefined();
  });
});

describe("getAvatar", () => {
  it("should return the avatar_url from identity_data if it exists", () => {
    const user = {
      identities: [{ identity_data: { avatar_url: "avatar1.png" } }],
    } as unknown as User;
    expect(getAvatar(user)).toBe("avatar1.png");
  });

  it("should return the avatar_url from user_metadata if it exists and identity_data does not", () => {
    const user = {
      user_metadata: { avatar_url: "avatar2.png" },
    } as unknown as User;
    expect(getAvatar(user)).toBe("avatar2.png");
  });

  it("should return undefined if avatar_url is not a string", () => {
    const user = {
      identities: [{ identity_data: { avatar_url: 123 } }],
    } as unknown as User;
    expect(getAvatar(user)).toBeUndefined();
  });

  it("should return undefined if no avatar_url is found", () => {
    const user = { identities: [{ identity_data: {} }] } as unknown as User;
    expect(getAvatar(user)).toBeUndefined();
  });
});
