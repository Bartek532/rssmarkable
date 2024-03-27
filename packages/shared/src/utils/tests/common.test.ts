import { describe, it, expect } from "vitest";

import { removeProtocolsFromUrl } from "../common";

describe("removeProtocolsFromUrl", () => {
  it("should remove http:// from the start of the URL", () => {
    expect(removeProtocolsFromUrl("http://example.com")).toBe("example.com");
  });

  it("should remove https:// from the start of the URL", () => {
    expect(removeProtocolsFromUrl("https://example.com")).toBe("example.com");
  });

  it("should remove www. from the start of the URL", () => {
    expect(removeProtocolsFromUrl("www.example.com")).toBe("example.com");
  });

  it("should remove protocol and www. from the start of the URL", () => {
    expect(removeProtocolsFromUrl("https://www.example.com")).toBe(
      "example.com",
    );
  });

  it("should not remove anything if the URL does not start with a protocol or www.", () => {
    expect(removeProtocolsFromUrl("example.com")).toBe("example.com");
  });
});
