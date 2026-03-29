import { describe, it, expect } from "vitest";
import { pad } from "../utils";

describe("pad()", () => {
  it("pads single-digit number to 3 digits", () => {
    expect(pad(1)).toBe("001");
  });
  it("pads double-digit number", () => {
    expect(pad(42)).toBe("042");
  });
  it("leaves 3-digit number unchanged", () => {
    expect(pad(151)).toBe("151");
  });
});