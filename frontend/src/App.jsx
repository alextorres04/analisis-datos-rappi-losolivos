import { useEffect, useState } from "react";
import axios from "axios";
import KPICard from "./components/KPICard";
import SLAChart from "./components/SLAChart";
import RestaurantesChart from "./components/RestaurantesChart";
import ZonasChart from "./components/ZonasChart";
import PrediccionForm from "./components/PrediccionForm";

function App() {
  const [kpis, setKpis] = useState(null);
  const [slaHora, setSlaHora] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpisRes, slaRes, restRes, zonasRes] = await Promise.all([
          axios.get("http://localhost:8000/kpis"),
          axios.get("http://localhost:8000/sla-por-hora"),
          axios.get("http://localhost:8000/top-restaurantes"),
          axios.get("http://localhost:8000/pedidos-por-zona")
        ]);
        setKpis(kpisRes.data);
        setSlaHora(slaRes.data);
        setRestaurantes(restRes.data);
        setZonas(zonasRes.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: "100vh", background: "#1A1A2E"
    }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 28, fontWeight: "bold", color: "#FF6B35" }}>
          ⏳ Cargando Dashboard...
        </p>
        <p style={{ color: "#94A3B8", marginTop: 8 }}>
          Conectando con API Rappi Los Olivos
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F1F5F9", fontFamily: "Calibri, sans-serif" }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
        padding: "20px 30px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
      }}>
        <div>
          <h1 style={{ color: "#FF6B35", fontSize: 26, fontWeight: "bold", margin: 0 }}>
            📦 Rappi Los Olivos
          </h1>
          <p style={{ color: "#94A3B8", margin: "4px 0 0 0", fontSize: 13 }}>
            Dashboard Operativo de Entregas — Análisis en Tiempo Real
          </p>
        </div>
        <div style={{
          background: "#FF6B35", borderRadius: 20,
          padding: "6px 16px", color: "white", fontSize: 12, fontWeight: "bold"
        }}>
          🟢 API Conectada
        </div>
      </div>

      <div style={{ padding: "24px 30px" }}>

        {/* KPI CARDS */}
        {kpis && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { titulo: "Cumplimiento SLA", valor: `${kpis.cumplimiento_sla}%`, icono: "✅", borde: "#10B981", bg: "#ECFDF5" },
              { titulo: "Retraso Promedio", valor: `${kpis.retraso_promedio} min`, icono: "⏱️", borde: "#F59E0B", bg: "#FFFBEB" },
              { titulo: "Distancia Asig.", valor: `${kpis.distancia_promedio} km`, icono: "📍", borde: "#3B82F6", bg: "#EFF6FF" },
              { titulo: "Espera Rest.", valor: `${kpis.espera_restaurante} min`, icono: "🍕", borde: "#EF4444", bg: "#FEF2F2" },
              { titulo: "Tiempo Entrega", valor: `${kpis.tiempo_entrega} min`, icono: "🚴", borde: "#8B5CF6", bg: "#F5F3FF" },
            ].map((k, i) => (
              <KPICard key={i} {...k} />
            ))}
          </div>
        )}

        {/* FILA 1 — SLA + Restaurantes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <SLAChart data={slaHora} />
          <RestaurantesChart data={restaurantes} />
        </div>

        {/* FILA 2 — Zonas + Predictor */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <ZonasChart data={zonas} />
          <PrediccionForm />
        </div>

        {/* FOOTER */}
        <div style={{
          textAlign: "center", color: "#94A3B8", fontSize: 12,
          marginTop: 16, padding: "12px 0",
          borderTop: "1px solid #E2E8F0"
        }}>
          🚀 Proyecto Big Data — Rappi Los Olivos | Python • FastAPI • React • MySQL • XGBoost
        </div>
      </div>
    </div>
  );
}

export default App;