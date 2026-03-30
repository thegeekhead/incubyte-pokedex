import { usePokemonDetail } from "../hooks/usePokemonDetail";
import { TypeBadge } from "./TypeBadge";
import { StatBar } from "./StatBar";
import { getTypeColor } from "../typeColors";
import { pad, getSprite, getFlavorText } from "../utils";

interface Props {
  nameOrId: string | number;
  onBack: () => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: 13, fontWeight: 700,
      color: "#aaa", letterSpacing: 1.5,
      textTransform: "uppercase", marginBottom: 10,
    }}>
      {children}
    </div>
  );
}

export function DetailPage({ nameOrId, onBack }: Props) {
  const { detail, species, loading, error } = usePokemonDetail(nameOrId);

  if (loading) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <div style={{
          width: 32, height: 32,
          border: "3px solid #eee",
          borderTop: "3px solid #E63946",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 16px",
        }} />
        <p style={{ color: "#888", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
          Loading…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <p style={{ color: "#c0392b", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
          ⚠ {error}
        </p>
        <button onClick={onBack} style={{
          marginTop: 16, padding: "8px 20px",
          background: "#E63946", color: "#fff",
          border: "none", borderRadius: 8, cursor: "pointer",
        }}>
          Go back
        </button>
      </div>
    );
  }

  if (!detail) return null;

  const primaryType = detail.types[0]?.type.name ?? "normal";
  const c = getTypeColor(primaryType);
  const flavorText = getFlavorText(species);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

      <button onClick={onBack} style={{
        background: "none", border: "0.5px solid #ddd",
        borderRadius: 8, padding: "6px 14px",
        cursor: "pointer", fontSize: 13, color: "#555",
        display: "flex", alignItems: "center", gap: 6,
        marginBottom: 24, fontFamily: "'DM Mono', monospace",
      }}>
        ← back
      </button>

      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
        gap: 24,
      }}>

        <div>
          <div style={{
            background: c.light, borderRadius: 24, padding: 32,
            display: "flex", flexDirection: "column", alignItems: "center",
            position: "relative", overflow: "hidden",
            border: `1px solid ${c.bg}33`,
          }}>
            <div style={{
              position: "absolute", width: 220, height: 220,
              borderRadius: "50%", border: `60px solid ${c.bg}15`,
              top: -40, right: -40,
            }} />
            <img
              src={getSprite(detail.id)}
              alt={detail.name}
              width={200} height={200}
              style={{ objectFit: "contain", position: "relative", zIndex: 1 }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = detail.sprites?.front_default ?? "";
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12, justifyContent: "center" }}>
            {[detail.sprites?.front_default, detail.sprites?.front_shiny, detail.sprites?.back_default]
              .filter(Boolean)
              .map((src, i) => (
                <img key={i} src={src!} alt={`${detail.name} sprite ${i}`}
                  width={56} height={56}
                  style={{
                    objectFit: "contain", background: "#f5f5f0",
                    borderRadius: 12, border: "0.5px solid #eee", padding: 4,
                  }}
                />
              ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#aaa", marginBottom: 4 }}>
            #{pad(detail.id)}
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800,
            color: "#111", letterSpacing: -1, textTransform: "capitalize", marginBottom: 10,
          }}>
            {detail.name}
          </h1>

          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {detail.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>

          {flavorText && (
            <p style={{
              fontSize: 14, color: "#555", lineHeight: 1.7,
              marginBottom: 20, fontStyle: "italic",
              borderLeft: `3px solid ${c.bg}`, paddingLeft: 12,
            }}>
              {flavorText}
            </p>
          )}

          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Height", value: `${(detail.height / 10).toFixed(1)} m` },
              { label: "Weight", value: `${(detail.weight / 10).toFixed(1)} kg` },
              { label: "Base EXP", value: detail.base_experience ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} style={{
                flex: 1, background: "#f8f8f5",
                borderRadius: 12, padding: "12px 14px",
                border: "0.5px solid #eee",
              }}>
                <div style={{ fontSize: 11, color: "#aaa", fontFamily: "'DM Mono', monospace", marginBottom: 2 }}>
                  {label}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Syne', sans-serif", color: "#111" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <SectionTitle>Abilities</SectionTitle>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {detail.abilities.map((a) => (
                <span key={a.ability.name} style={{
                  background: "#f0f0ea", border: "0.5px solid #ddd",
                  borderRadius: 8, padding: "5px 12px", fontSize: 13,
                  textTransform: "capitalize",
                  color: a.is_hidden ? "#888" : "#333",
                  fontStyle: a.is_hidden ? "italic" : "normal",
                }}>
                  {a.ability.name.replace("-", " ")}
                  {a.is_hidden && (
                    <span style={{ fontSize: 10, color: "#aaa", marginLeft: 4 }}>(hidden)</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>Base Stats</SectionTitle>
            {detail.stats.map((s) => (
              <StatBar key={s.stat.name} label={s.stat.name} value={s.base_stat} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionTitle>Moves</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {detail.moves.slice(0, 20).map((m) => (
            <span key={m.move.name} style={{
              background: "#f5f5f0", border: "0.5px solid #e5e5e0",
              borderRadius: 6, padding: "3px 10px", fontSize: 12,
              color: "#555", textTransform: "capitalize",
              fontFamily: "'DM Mono', monospace",
            }}>
              {m.move.name.replace(/-/g, " ")}
            </span>
          ))}
          {detail.moves.length > 20 && (
            <span style={{ fontSize: 12, color: "#aaa", padding: "3px 10px" }}>
              +{detail.moves.length - 20} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}