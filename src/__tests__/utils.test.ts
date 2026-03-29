import { describe, it, expect } from "vitest";
import { pad, capitalize, getFlavorText } from "../utils";
import type { PokemonSpecies } from "../types";

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

describe("capitalize()", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("bulbasaur")).toBe("Bulbasaur");
  });
  it("handles already-capitalised string", () => {
    expect(capitalize("Pikachu")).toBe("Pikachu");
  });
  it("handles single character", () => {
    expect(capitalize("a")).toBe("A");
  });
});

describe("getFlavorText()", () => {
  const species: PokemonSpecies = {
    name: "bulbasaur",
    flavor_text_entries: [
      {
        flavor_text: "A strange seed was\nplanted on its back.",
        language: { name: "en" },
        version: { name: "red" },
      },
      {
        flavor_text: "Une graine bizarre.",
        language: { name: "fr" },
        version: { name: "red" },
      },
    ],
  };

  it("returns English flavor text", () => {
    expect(getFlavorText(species)).toContain("strange seed");
  });
  it("replaces newline characters with spaces", () => {
    expect(getFlavorText(species)).toBe(
      "A strange seed was planted on its back."
    );
  });
  it("returns empty string when species is null", () => {
    expect(getFlavorText(null)).toBe("");
  });
  it("returns empty string when no English entry exists", () => {
    const s: PokemonSpecies = {
      name: "test",
      flavor_text_entries: [
        { flavor_text: "Texte", language: { name: "fr" }, version: { name: "red" } },
      ],
    };
    expect(getFlavorText(s)).toBe("");
  });
});