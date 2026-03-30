import type { PokemonListResponse } from "./types";

const BASE = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(
  limit = 151,
  offset = 0
): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch Pokémon list");
  return res.json();
}

export async function fetchPokemonDetail(nameOrId: string | number) {
  const res = await fetch(`${BASE}/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon: ${nameOrId}`);
  return res.json();
}

export async function fetchSpecies(nameOrId: string | number) {
  const res = await fetch(`${BASE}/pokemon-species/${nameOrId}`);
  if (!res.ok) return null;
  return res.json();
}