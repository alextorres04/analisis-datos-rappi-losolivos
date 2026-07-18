import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,
         Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function Estadisticas() {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/kpis").then(r => setKpis(r.data));
  }, []);

  const dataSLA = kpis ? [
    { name: "Cumple SLA", value: Math.round(kpis.total_pedidos * kpis.cumplimiento_sla / 100) },
    { name: "No Cumple", value: Math.round(kpis.total_pedidos * (100 - kpis.cumplimiento_sla) / 100) },
  ] : [];

  const dataKPIs = kpis ? [
    { nombre: "Retraso (min)", valor: kpis.retraso_promedio, meta: 2 },
    { nombre: "Distancia (km)", valor: kpis.distancia_promedio, meta: 1.5 },
    { nombre: "Espera Rest.", valor: kpis.espera_restaurante, meta: 10 },
    { nombre: "T. Entrega", valor: kpis.tiempo_entrega, meta: 30 },
  ] : [];

  if (!kpis) return (
    <div style={{ textAlign: "center", padding: 80 }}>
      <p style={{ fontSize: 20, color: "#FF6B35" }}>⏳ Cargando estadísticas...</p>
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: "bold", color: "#1A1A2E", marginBottom: 4 }}>
        Análisis Estadístico
      </h1>
      <p style={{ color: "#64748B", marginBottom: 24 }}>
        Distribución y comparación de KPIs operativos
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

        {/* Pie Chart SLA */}
        <div style={{ background: "white", borderRadius: 12, padding: 20,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize: 15, fontWeight: "bold", color: "#1E293B", marginBottom: 16 }}>
             Distribución Cumplimiento SLA
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={dataSLA}
                cx="50%" cy="50%"
                innerRadius={70} outerRadius={110}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                <Cell fill="#10B981" />
                <Cell fill="#EF4444" />
              </Pie>
              <Legend />
              <Tooltip formatter={v => `${v.toLocaleString()} pedidos`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Barras KPIs vs Meta */}
        <div style={{ background: "white", borderRadius: 12, padding: 20,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize: 15, fontWeight: "bold", color: "#1E293B", marginBottom: 16 }}>
             KPIs vs Meta BSC
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dataKPIs} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="nombre" width={100} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="valor" name="Actual" fill="#FF6B35" radius={[0, 4, 4, 0]} />
              <Bar dataKey="meta" name="Meta BSC" fill="#10B981" radius={[0, 4, 4, 0]} opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla resumen */}
      <div style={{ background: "white", borderRadius: 12, padding: 20,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: 15, fontWeight: "bold", color: "#1E293B", marginBottom: 16 }}>
           Resumen Estadístico
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#1A1A2E" }}>
              {["KPI", "Valor Actual", "Meta BSC", "Estado"].map(h => (
                <th key={h} style={{
                  padding: "10px 16px", color: "white",
                  fontSize: 12, textAlign: "left"
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { kpi: "Cumplimiento SLA", valor: `${kpis.cumplimiento_sla}%`, meta: "> 90%", ok: kpis.cumplimiento_sla >= 90 },
              { kpi: "Retraso Promedio", valor: `${kpis.retraso_promedio} min`, meta: "< 2 min", ok: kpis.retraso_promedio < 2 },
              { kpi: "Distancia Asignación", valor: `${kpis.distancia_promedio} km`, meta: "< 1.5 km", ok: kpis.distancia_promedio < 1.5 },
              { kpi: "Espera Restaurante", valor: `${kpis.espera_restaurante} min`, meta: "< 10 min", ok: kpis.espera_restaurante < 10 },
              { kpi: "Tiempo de Entrega", valor: `${kpis.tiempo_entrega} min`, meta: "< 30 min", ok: kpis.tiempo_entrega < 30 },
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#F8FAFC" : "white" }}>
                <td style={{ padding: "10px 16px", fontWeight: "bold", fontSize: 13 }}>{row.kpi}</td>
                <td style={{ padding: "10px 16px", color: "#FF6B35", fontWeight: "bold", fontSize: 13 }}>{row.valor}</td>
                <td style={{ padding: "10px 16px", color: "#64748B", fontSize: 13 }}>{row.meta}</td>
                <td style={{ padding: "10px 16px", fontSize: 13 }}>
                  {row.ok ? "✅ Cumple" : "⚠️ Por mejorar"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}