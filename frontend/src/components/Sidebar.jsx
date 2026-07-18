export default function Sidebar({ activePage, setActivePage, onLogout }) {
  const menuItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard Principal" },
    { id: "estadisticas", icon: "📈", label: "Análisis Estadístico" },
    { id: "predictor", icon: "🤖", label: "Predictor SLA" },
    { id: "zonas", icon: "🗺️", label: "Zonas" },
  ];

  return (
    <div style={{
      width: 240, minHeight: "100vh",
      background: "linear-gradient(180deg, #1A1A2E 0%, #0F3460 100%)",
      position: "fixed", left: 0, top: 0,
      display: "flex", flexDirection: "column",
      boxShadow: "4px 0 20px rgba(0,0,0,0.2)"
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ background: "#FF6B35", borderRadius: 10, padding: "8px 16px", display: "inline-block" }}>
          <span style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>📦 Rappi BI</span>
        </div>
        <p style={{ color: "#94A3B8", fontSize: 11, margin: "8px 0 0 0" }}>
          Los Olivos — Panel Operativo
        </p>
      </div>

      {/* Menú */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            style={{
              width: "100%", padding: "12px 16px",
              display: "flex", alignItems: "center", gap: 12,
              background: activePage === item.id ? "rgba(255,107,53,0.2)" : "transparent",
              border: activePage === item.id ? "1px solid rgba(255,107,53,0.4)" : "1px solid transparent",
              borderRadius: 8, cursor: "pointer", marginBottom: 4,
              color: activePage === item.id ? "#FF6B35" : "#94A3B8",
              fontSize: 13, fontWeight: activePage === item.id ? "bold" : "normal",
              textAlign: "left", transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              if (activePage !== item.id) {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "white";
              }
            }}
            onMouseLeave={e => {
              if (activePage !== item.id) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#94A3B8";
              }
            }}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <button
          onClick={onLogout}
          style={{
            width: "100%", padding: "10px 16px",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 8, color: "#EF4444",
            cursor: "pointer", fontSize: 13, fontWeight: "bold"
          }}
        >
          🚪 Cerrar Sesión
        </button>
        <p style={{ color: "#475569", fontSize: 10, textAlign: "center", marginTop: 8 }}>
          Rappi Los Olivos © 2026
        </p>
      </div>
    </div>
  );
}