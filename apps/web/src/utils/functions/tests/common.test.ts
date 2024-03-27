import { describe, it, expect } from "vitest";

import { nonNullable } from "../common";

describe("nonNullable", () => {
  it("should return false if the value is null", () => {
    expect(nonNullable(null)).toBe(false);
  });

  it("should return false if the value is undefined", () => {
    expect(nonNullable(undefined)).toBe(false);
  });

  it.each(["test", 0, false, {}, []])(
    "should return true if the value is a non-null and non-undefined value: %s",
    (value) => {
      expect(nonNullable(value)).toBe(true);
    },
  );
});
