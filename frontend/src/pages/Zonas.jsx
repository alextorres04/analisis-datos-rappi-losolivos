import { useEffect, useState } from "react";
import axios from "axios";
import ZonasChart from "../components/ZonasChart";

export default function Zonas() {
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/pedidos-por-zona")
      .then(r => { setZonas(r.data); setLoading(false); });
  }, []);

  if (loading) return (
    <div style={{ textAlign: "center", padding: 80 }}>
      <p style={{ fontSize: 20, color: "#FF6B35" }}>⏳ Cargando zonas...</p>
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: "bold", color: "#1A1A2E", marginBottom: 4 }}>
        Mapa de Zonas
      </h1>
      <p style={{ color: "#64748B", marginBottom: 24 }}>
        Distribución de pedidos y SLA por zona — Los Olivos
      </p>

      <ZonasChart data={zonas} />

      {/* Tabla de zonas */}
      <div style={{ background: "white", borderRadius: 12, padding: 20,
                    marginTop: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: 15, fontWeight: "bold", color: "#1E293B", marginBottom: 16 }}>
          📋 Detalle por Zona
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1A1A2E" }}>
              {["Zona / Distrito", "Total Pedidos", "SLA Promedio", "Estado"].map(h => (
                <th key={h} style={{ padding: "10px 16px", color: "white", fontSize: 12, textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {zonas.map((z, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#F8FAFC" : "white" }}>
                <td style={{ padding: "10px 16px", fontWeight: "bold", fontSize: 13 }}>
                  📍 {z.distrito || z.zona}
                </td>
                <td style={{ padding: "10px 16px", color: "#FF6B35", fontWeight: "bold" }}>
                  {z.total_pedidos?.toLocaleString()}
                </td>
                <td style={{ padding: "10px 16px", fontWeight: "bold",
                             color: z.sla_promedio >= 90 ? "#10B981" : "#EF4444" }}>
                  {z.sla_promedio?.toFixed(1)}%
                </td>
                <td style={{ padding: "10px 16px" }}>
                  {z.sla_promedio >= 90 ? "✅ Cumple" : "⚠️ Por mejorar"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}