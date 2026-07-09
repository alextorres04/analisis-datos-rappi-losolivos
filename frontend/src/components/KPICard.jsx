const KPICard = ({ titulo, valor, icono, borde, bg }) => {
  return (
    <div style={{
      background: bg || "white",
      borderRadius: 12,
      padding: "20px 16px",
      borderLeft: `4px solid ${borde}`,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      transition: "transform 0.2s",
      cursor: "default"
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 11, color: "#64748B", fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>
            {titulo}
          </p>
          <p style={{ fontSize: 26, fontWeight: "bold", color: "#1E293B",
                      margin: "6px 0 0 0" }}>
            {valor}
          </p>
        </div>
        <span style={{ fontSize: 32 }}>{icono}</span>
      </div>
    </div>
  );
};

export default KPICard;