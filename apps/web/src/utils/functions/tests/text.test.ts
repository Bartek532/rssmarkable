import { describe, it, expect } from "vitest";

import { capitalize, truncateTextByWordsCount } from "../text";

describe("capitalize", () => {
  it("should capitalize the first letter of the string", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("should leave the string unchanged if the first letter is already capitalized", () => {
    expect(capitalize("World")).toBe("World");
  });

  it("should leave the string unchanged if it does not start with a letter", () => {
    expect(capitalize("123")).toBe("123");
  });
});

describe("truncateTextByWordsCount", () => {
  it("should truncate the text to the specified number of words", () => {
    expect(
      truncateTextByWordsCount(
        "The quick brown fox jumps over the lazy dog",
        5,
      ),
    ).toBe("The quick brown fox jumps...");
  });

  it("should leave the text unchanged if it contains fewer words than the specified number", () => {
    expect(truncateTextByWordsCount("The quick brown fox", 5)).toBe(
      "The quick brown fox",
    );
  });

  it("should return an empty string if the specified number of words is zero", () => {
    expect(truncateTextByWordsCount("The quick brown fox", 0)).toBe("...");
  });
});
