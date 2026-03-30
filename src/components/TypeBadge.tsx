import { getTypeColor } from "../typeColors";

export function TypeBadge({ type, small = false }: { type: string; small?: boolean }) {
  const c = getTypeColor(type);
  return (
    <span style={{
      background: c.bg, color: "#fff",
      padding: small ? "2px 8px" : "4px 12px",
      borderRadius: 20, fontSize: small ? 10 : 12,
      fontFamily: "'DM Mono', monospace", fontWeight: 500,
      textTransform: "uppercase", display: "inline-block",
    }}>
      {type}
    </span>
  );
}