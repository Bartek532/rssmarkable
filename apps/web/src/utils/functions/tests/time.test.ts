import { describe, it, expect } from "vitest";

import { formatTime } from "../time";

describe("formatTime", () => {
  it("should format time correctly for hours, minutes, seconds and milliseconds", () => {
    expect(formatTime(3661000)).toBe("1h 1m 1s ");
  });

  it("should format time correctly for minutes, seconds and milliseconds", () => {
    expect(formatTime(61000)).toBe("1m 1s ");
  });

  it("should format time correctly for seconds and milliseconds", () => {
    expect(formatTime(1000)).toEqual("1s ");
  });

  it("should format time correctly for milliseconds", () => {
    expect(formatTime(100)).toEqual("100ms");
  });

  it("should format time correctly for hours and seconds", () => {
    expect(formatTime(3601000)).toEqual("1h 0m 1s ");
  });

  it("should format time correctly for hours and minutes", () => {
    expect(formatTime(3720000)).toEqual("1h 2m ");
  });
});
