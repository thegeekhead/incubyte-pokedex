import { describe, it, expect } from "vitest";
import { getTypeColor } from "../typeColors";

describe("getTypeColor()", () => {
  it("returns correct bg color for fire", () => {
    expect(getTypeColor("fire").bg).toBe("#FF6B35");
  });
  it("returns correct bg color for water", () => {
    expect(getTypeColor("water").bg).toBe("#4A90D9");
  });
  it("returns object with bg, light and text keys", () => {
    const c = getTypeColor("grass");
    expect(c).toHaveProperty("bg");
    expect(c).toHaveProperty("light");
    expect(c).toHaveProperty("text");
  });
  it("returns fallback for unknown type", () => {
    expect(getTypeColor("unknown").bg).toBe("#888");
  });
});