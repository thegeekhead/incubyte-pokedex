export interface FlavorTextEntry {
  flavor_text: string;
  language: { name: string };
  version: { name: string };
}

export interface PokemonSpecies {
  name: string;
  flavor_text_entries: FlavorTextEntry[];
}