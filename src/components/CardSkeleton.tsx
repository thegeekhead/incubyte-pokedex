export function CardSkeleton() {
  const s = {
    background: "linear-gradient(90deg,#f0f0ea 25%,#e8e8e2 50%,#f0f0ea 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
    borderRadius: 8,
  } as React.CSSProperties;

  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: 16 }}>
      <div style={{ ...s, height: 140, borderRadius: 16, marginBottom: 12 }} />
      <div style={{ ...s, height: 10, width: "40%", marginBottom: 8 }} />
      <div style={{ ...s, height: 16, width: "70%", marginBottom: 12 }} />
    </div>
  );
}