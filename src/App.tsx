import { useState, useMemo, useCallback } from "react";
import type { Pokemon } from "./types";
import { usePokemonList } from "./hooks/usePokemonList";
import { PokemonCard } from "./components/PokemonCard";
import { CardSkeleton } from "./components/CardSkeleton";
import { Header } from "./components/Header";
import { DetailPage } from "./components/DetailPage";

export default function App() {
  const { pokemon, loading, error } = usePokemonList();
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [search, setSearch] = useState("");
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [sort, setSort] = useState<"id" | "name" | "hp">("id");

  const allTypes = useMemo(() => {
    const s = new Set<string>();
    pokemon.forEach((p) => p.types.forEach((t) => s.add(t.type.name)));
    return Array.from(s).sort();
  }, [pokemon]);

  const filtered = useMemo<Pokemon[]>(() => {
    let list = pokemon;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.includes(q) || String(p.id).includes(q));
    }
    if (activeTypes.length > 0) {
      list = list.filter((p) =>
        p.types.some((t) => activeTypes.includes(t.type.name))
      );
    }
    return [...list].sort((a, b) => {
      if (sort === "id") return a.id - b.id;
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "hp") return b.stats[0].base_stat - a.stats[0].base_stat;
      return 0;
    });
  }, [pokemon, search, activeTypes, sort]);

  const toggleType = useCallback((type: string) => {
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  if (selected) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAFAF7" }}>
        <Header onBack={() => setSelected(null)} />
        <DetailPage nameOrId={selected.name} onBack={() => setSelected(null)} />
      </div>
    );
  }

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
        <select data-testid="sort-select" value={sort}
          onChange={(e) => setSort(e.target.value as "id" | "name" | "hp")}
          style={{
            height: 40, padding: "0 12px", border: "0.5px solid #ddd", borderRadius: 10, fontSize: 13, background: "#fafaf7", color: "#333", cursor: "pointer", outline: "none",
          }}>
          <option value="id">Sort: #ID</option>
          <option value="name">Sort: Name</option>
          <option value="hp">Sort: HP</option>
        </select>
      </div>


      {
        allTypes.length > 0 && (
          <div style={{ padding: "12px 24px", background: "#f8f8f5", display: "flex", flexWrap: "wrap", gap: 6 }}>
            {allTypes.map((type) => (
              <button
                data-testid={`type-filter-${type}`}
                key={type}
                onClick={() => toggleType(type)}
                style={{
                  padding: "4px 12px", borderRadius: 20, border: "none", cursor: "pointer",
                  background: activeTypes.includes(type) ? "#E63946" : "#eee",
                  color: activeTypes.includes(type) ? "#fff" : "#666",
                  fontFamily: "'DM Mono',monospace", fontSize: 11
                }}>
                {type}
              </button>
            ))}
            {activeTypes.length > 0 && (
              <button onClick={() => setActiveTypes([])}
                style={{
                  padding: "4px 12px", borderRadius: 20, border: "0.5px solid #ccc",
                  background: "transparent", cursor: "pointer", fontSize: 11, color: "#888"
                }}>
                clear
              </button>
            )}
          </div>
        )
      }

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
    </div >
  );
}