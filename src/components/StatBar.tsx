import { useState, useEffect } from "react";

const STAT_COLORS: Record<string, string> = {
  hp: "#E74C3C",
  attack: "#E67E22",
  defense: "#3498DB",
  "special-attack": "#9B59B6",
  "special-defense": "#1ABC9C",
  speed: "#F1C40F",
};

const SHORT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
};

interface Props {
  label: string;
  value: number;
}

export function StatBar({ label, value }: Props) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  const color = STAT_COLORS[label] ?? "#666";
  const pct = Math.min((value / 255) * 100, 100);
  const shortLabel = SHORT_LABELS[label] ?? label.toUpperCase();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 11, color: "#888",
        width: 36, textAlign: "right",
        flexShrink: 0, textTransform: "uppercase",
      }}>
        {shortLabel}
      </div>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 13, fontWeight: 500,
        width: 28, textAlign: "right",
        flexShrink: 0, color: "#222",
      }}>
        {value}
      </div>
      <div style={{
        flex: 1, height: 6,
        background: "#eee", borderRadius: 6, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 6,
          background: color,
          width: animated ? `${pct}%` : "0%",
          transition: "width 0.7s cubic-bezier(.16,1,.3,1)",
        }} />
      </div>
    </div>
  );
}