import { useEffect, useState } from "react";
import axios from "axios";
import KPICard from "../components/KPICard";
import SLAChart from "../components/SLAChart";
import RestaurantesChart from "../components/RestaurantesChart";

export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [slaHora, setSlaHora] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8000/kpis"),
      axios.get("http://localhost:8000/sla-por-hora"),
      axios.get("http://localhost:8000/top-restaurantes"),
    ]).then(([k, s, r]) => {
      setKpis(k.data);
      setSlaHora(s.data);
      setRestaurantes(r.data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div style={{ textAlign: "center", padding: 80 }}>
      <p style={{ fontSize: 20, color: "#FF6B35" }}>⏳ Cargando datos...</p>
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: "bold", color: "#1A1A2E", marginBottom: 4 }}>
        Dashboard Principal
      </h1>
      <p style={{ color: "#64748B", marginBottom: 24 }}>
        Resumen operativo del servicio de delivery — Rappi Los Olivos
      </p>

      {kpis && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, marginBottom: 24 }}>
          <KPICard titulo="Cumplimiento SLA" valor={`${kpis.cumplimiento_sla}%`} icono="✅" borde="#10B981" bg="#ECFDF5" />
          <KPICard titulo="Retraso Promedio" valor={`${kpis.retraso_promedio} min`} icono="⏱️" borde="#F59E0B" bg="#FFFBEB" />
          <KPICard titulo="Distancia Asig." valor={`${kpis.distancia_promedio} km`} icono="📍" borde="#3B82F6" bg="#EFF6FF" />
          <KPICard titulo="Espera Rest." valor={`${kpis.espera_restaurante} min`} icono="🍕" borde="#EF4444" bg="#FEF2F2" />
          <KPICard titulo="T. Entrega" valor={`${kpis.tiempo_entrega} min`} icono="🚴" borde="#8B5CF6" bg="#F5F3FF" />
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <SLAChart data={slaHora} />
        <RestaurantesChart data={restaurantes} />
      </div>
    </div>
  );
}