import type { PokemonSpecies } from "./types";

export const pad = (n: number): string => String(n).padStart(3, "0");

export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const getFlavorText = (species: PokemonSpecies | null): string => {
  if (!species?.flavor_text_entries) return "";
  const en = species.flavor_text_entries.find(
    (e) => e.language.name === "en"
  );
  return en?.flavor_text.replace(/[\n\f]/g, " ") ?? "";
};

export const getSprite = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;