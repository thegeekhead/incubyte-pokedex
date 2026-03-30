import { useEffect, useState, useMemo } from "react";
import type { Pokemon } from "./types";
import { usePokemonList } from "./hooks/usePokemonList";
import { PokemonCard } from "./components/PokemonCard";
import { CardSkeleton } from "./components/CardSkeleton";
import { Header } from "./components/Header";

export default function App() {
  const { pokemon, loading, error } = usePokemonList();
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo<Pokemon[]>(() => {
    if (!search.trim()) return pokemon;
    const q = search.trim().toLowerCase();
    return pokemon.filter(
      (p: Pokemon) => p.name.includes(q) || String(p.id).includes(q)
    );
  }, [pokemon, search]);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF7" }}>
      <Header />
      <div style={{ background: "#0d0d0d", padding: "48px 24px 40px", borderBottom: "2px solid #E63946" }}>
        <h1 style={{
          fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px,6vw,64px)",
          fontWeight: 800, color: "#fff", letterSpacing: -2
        }}>
          Pokédex
        </h1>
      </div>
      <div style={{ background: "#fff", borderBottom: "0.5px solid #eee", padding: "16px 24px" }}>
        <input
          data-testid="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Name or number…"
          style={{
            height: 40, padding: "0 12px", border: "0.5px solid #ddd",
            borderRadius: 10, fontSize: 14, width: 300, outline: "none"
          }}
        />
      </div>

      <div style={{ padding: 24 }}>
        {error && <p data-testid="error-message" style={{ color: "#c0392b" }}>⚠ {error}</p>}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16 }}>
            {Array.from({ length: 12 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div data-testid="no-results" style={{ textAlign: "center", padding: 60, color: "#aaa" }}>
            <p>No Pokémon found</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16 }}>
            {filtered.map((p) => <PokemonCard key={p.id} pokemon={p} onClick={setSelected} />)}
          </div>
        )}
      </div>
    </div>
  );
}