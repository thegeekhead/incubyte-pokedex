export function Header({ onBack }: { onBack?: () => void }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100, background: "#0d0d0d",
      padding: "0 24px", height: 52, display: "flex", alignItems: "center", gap: 12
    }}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "#fff" }}>
        Poké<span style={{ color: "#E63946" }}>dex</span>
      </div>
      <span style={{
        fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#E63946",
        background: "#1a0304", border: "0.5px solid #E63946", borderRadius: 4, padding: "2px 6px"
      }}>
        GEN I
      </span>
      {onBack && (
        <button onClick={onBack} style={{
          marginLeft: "auto", background: "none",
          border: "0.5px solid #333", borderRadius: 6, padding: "4px 12px",
          color: "#888", cursor: "pointer", fontFamily: "'DM Mono',monospace", fontSize: 11
        }}>
          ← back
        </button>
      )}
    </nav>
  );
}