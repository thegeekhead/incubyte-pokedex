import { useState, useEffect } from "react";
import type { Pokemon } from "../types";
import { fetchPokemonList, fetchPokemonDetail } from "../api";

export function usePokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const list = await fetchPokemonList(151, 0);
        const details = await Promise.all(
          list.results.map((p) => fetchPokemonDetail(p.name))
        );
        if (!cancelled) { setPokemon(details); setLoading(false); }
      } catch (err) {
        if (!cancelled) { setError((err as Error).message); setLoading(false); }
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { pokemon, loading, error };
}