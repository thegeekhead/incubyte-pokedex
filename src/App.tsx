import { useState } from "react";
import type { Pokemon } from "./types";
import { usePokemonList } from "./hooks/usePokemonList";
import { PokemonCard } from "./components/PokemonCard";
import { CardSkeleton } from "./components/CardSkeleton";
import { Header } from "./components/Header";

export default function App() {
  const { pokemon, loading, error } = usePokemonList();
  const [selected, setSelected] = useState<Pokemon | null>(null);

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
      <div style={{ padding: 24 }}>
        {error && <p data-testid="error-message" style={{ color: "#c0392b" }}>⚠ {error}</p>}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16 }}>
            {Array.from({ length: 12 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16 }}>
            {pokemon.map((p) => <PokemonCard key={p.id} pokemon={p} onClick={setSelected} />)}
          </div>
        )}
      </div>
    </div>
  );
}