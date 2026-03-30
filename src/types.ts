export interface FlavorTextEntry {
  flavor_text: string;
  language: { name: string };
  version: { name: string };
}

export interface PokemonSpecies {
  name: string;
  flavor_text_entries: FlavorTextEntry[];
}

export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string; url: string };
}

export interface ListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: ListResult[];
}