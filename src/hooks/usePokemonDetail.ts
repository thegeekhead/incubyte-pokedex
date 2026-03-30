import { useState, useEffect } from "react";
import type { Pokemon, PokemonSpecies } from "../types";
import { fetchPokemonDetail, fetchSpecies } from "../api";

interface UsePokemonDetailResult {
  detail: Pokemon | null;
  species: PokemonSpecies | null;
  loading: boolean;
  error: string | null;
}

export function usePokemonDetail(nameOrId: string | number): UsePokemonDetailResult {
  const [detail, setDetail] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nameOrId) return;
    let cancelled = false;

    setLoading(true);
    setDetail(null);
    setSpecies(null);

    async function load() {
      try {
        const [d, s] = await Promise.all([
          fetchPokemonDetail(nameOrId),
          fetchSpecies(nameOrId),
        ]);
        if (!cancelled) {
          setDetail(d);
          setSpecies(s);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [nameOrId]);

  return { detail, species, loading, error };
}