import { useState } from "react";
import type { Pokemon } from "../types";
import { TypeBadge } from "./TypeBadge";
import { pad, getSprite } from "../utils";

export function PokemonCard({ pokemon, onClick }: { pokemon: Pokemon; onClick: (p: Pokemon) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-testid="pokemon-card"
      role="button"
      tabIndex={0}
      aria-label={`View ${pokemon.name}`}
      onClick={() => onClick(pokemon)}
      onKeyDown={(e) => e.key === "Enter" && onClick(pokemon)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 20, padding: 16,
        position: "relative", overflow: "hidden", cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.14)` : "0 2px 8px rgba(0,0,0,0.07)",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
      }}
    >
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#aaa", marginBottom: 4 }}>
        #{pad(pokemon.id)}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <img src={getSprite(pokemon.id)} alt={pokemon.name} width={100} height={100}
          style={{ objectFit: "contain" }}
          onError={(e) => { (e.target as HTMLImageElement).src = pokemon.sprites?.front_default ?? ""; }}
        />
      </div>
      <div style={{
        fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700,
        color: "#111", marginBottom: 10, textTransform: "capitalize"
      }}>
        {pokemon.name}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {pokemon.types.map((t) => <TypeBadge key={t.type.name} type={t.type.name} small />)}
      </div>
    </div>
  );
}