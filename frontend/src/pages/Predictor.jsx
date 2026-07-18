import { useState } from "react";
import axios from "axios";

export default function Predictor() {
  const [form, setForm] = useState({
    dist_asignacion_km: "",
    tiempo_espera_rest_min: "",
    tiempo_total_min: "",
    minutos_retraso: ""
  });
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/predecir-sla", {
        dist_asignacion_km: parseFloat(form.dist_asignacion_km),
        tiempo_espera_rest_min: parseFloat(form.tiempo_espera_rest_min),
        tiempo_total_min: parseFloat(form.tiempo_total_min),
        minutos_retraso: parseFloat(form.minutos_retraso)
      });
      setResultado(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const campos = [
    { name: "dist_asignacion_km", label: "Distancia Asignación (km)", placeholder: "ej: 1.5" },
    { name: "tiempo_espera_rest_min", label: "Espera Restaurante (min)", placeholder: "ej: 8" },
    { name: "tiempo_total_min", label: "Tiempo Estimado (min)", placeholder: "ej: 20" },
    { name: "minutos_retraso", label: "Minutos Retraso", placeholder: "ej: 0" },
  ];

  const ejemplos = [
    { label: "✅ Cumple SLA", color: "#ECFDF5", border: "#10B981",
      vals: { dist_asignacion_km: "1.2", tiempo_espera_rest_min: "5", tiempo_total_min: "15", minutos_retraso: "0" } },
    { label: "⚠️ Caso límite", color: "#FFFBEB", border: "#F59E0B",
      vals: { dist_asignacion_km: "2.5", tiempo_espera_rest_min: "12", tiempo_total_min: "28", minutos_retraso: "1" } },
    { label: "❌ No cumple", color: "#FEF2F2", border: "#EF4444",
      vals: { dist_asignacion_km: "4.5", tiempo_espera_rest_min: "20", tiempo_total_min: "45", minutos_retraso: "10" } },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: "bold", color: "#1A1A2E", marginBottom: 4 }}>
        Predictor SLA
      </h1>
      <p style={{ color: "#64748B", marginBottom: 24 }}>
        Modelo XGBoost — Predicción en tiempo real del cumplimiento del SLA
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 16 }}>

        {/* Formulario */}
        <div style={{ background: "white", borderRadius: 12, padding: 24,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize: 15, fontWeight: "bold", color: "#1E293B", marginBottom: 20 }}>
             Ingresa los datos del pedido
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {campos.map(campo => (
              <div key={campo.name}>
                <label style={{ fontSize: 11, color: "#64748B", fontWeight: 600,
                               textTransform: "uppercase", display: "block" }}>
                  {campo.label}
                </label>
                <input
                  type="number"
                  name={campo.name}
                  value={form[campo.name]}
                  onChange={handleChange}
                  placeholder={campo.placeholder}
                  style={{
                    width: "100%", padding: "10px 12px", marginTop: 4,
                    border: "2px solid #E2E8F0", borderRadius: 8,
                    fontSize: 14, outline: "none", boxSizing: "border-box"
                  }}
                  onFocus={e => e.target.style.borderColor = "#FF6B35"}
                  onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handlePredict}
            disabled={loading}
            style={{
              width: "100%", padding: "14px", marginTop: 20,
              background: loading ? "#94A3B8" : "#FF6B35",
              color: "white", border: "none", borderRadius: 8,
              fontSize: 15, fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "⏳ Prediciendo..." : "🤖 Predecir SLA"}
          </button>
        </div>

        {/* Resultado */}
        <div style={{ background: "white", borderRadius: 12, padding: 24,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize: 15, fontWeight: "bold", color: "#1E293B", marginBottom: 20 }}>
             Resultado de la Predicción
          </h2>
          {!resultado ? (
            <div style={{ textAlign: "center", padding: 40, color: "#94A3B8" }}>
              <p style={{ fontSize: 48, margin: 0 }}>🤖</p>
              <p style={{ marginTop: 12 }}>Ingresa los datos y presiona Predecir</p>
            </div>
          ) : (
            <div>
              <div style={{
                padding: 24, borderRadius: 12, textAlign: "center",
                background: resultado.cumple_sla ? "#ECFDF5" : "#FEF2F2",
                border: `2px solid ${resultado.cumple_sla ? "#10B981" : "#EF4444"}`,
                marginBottom: 20
              }}>
                <p style={{ fontSize: 48, margin: 0 }}>
                  {resultado.cumple_sla ? "✅" : "❌"}
                </p>
                <p style={{
                  fontSize: 22, fontWeight: "bold", margin: "8px 0",
                  color: resultado.cumple_sla ? "#10B981" : "#EF4444"
                }}>
                  {resultado.resultado}
                </p>
              </div>

              {/* Barra probabilidad */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "#64748B" }}>Probabilidad de cumplir</span>
                  <span style={{ fontSize: 14, fontWeight: "bold", color: "#10B981" }}>
                    {resultado.probabilidad_cumple}%
                  </span>
                </div>
                <div style={{ background: "#F1F5F9", borderRadius: 8, height: 12 }}>
                  <div style={{
                    width: `${resultado.probabilidad_cumple}%`,
                    background: resultado.probabilidad_cumple >= 85 ? "#10B981" : "#EF4444",
                    height: "100%", borderRadius: 8, transition: "width 0.5s"
                  }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "#ECFDF5", borderRadius: 8, padding: 12, textAlign: "center" }}>
                  <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>Cumple SLA</p>
                  <p style={{ fontSize: 22, fontWeight: "bold", color: "#10B981", margin: 0 }}>
                    {resultado.probabilidad_cumple}%
                  </p>
                </div>
                <div style={{ background: "#FEF2F2", borderRadius: 8, padding: 12, textAlign: "center" }}>
                  <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>No Cumple SLA</p>
                  <p style={{ fontSize: 22, fontWeight: "bold", color: "#EF4444", margin: 0 }}>
                    {resultado.probabilidad_no_cumple}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ejemplos rápidos */}
      <div style={{ background: "white", borderRadius: 12, padding: 20,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: 14, fontWeight: "bold", color: "#1E293B", marginBottom: 12 }}>
           Ejemplos rápidos — clic para cargar
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {ejemplos.map((ej, i) => (
            <button
              key={i}
              onClick={() => setForm(ej.vals)}
              style={{
                background: ej.color, border: `1px solid ${ej.border}`,
                borderRadius: 8, padding: 12, cursor: "pointer", textAlign: "left"
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: 13, margin: "0 0 6px 0" }}>{ej.label}</p>
              <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>
                Dist: {ej.vals.dist_asignacion_km}km | Espera: {ej.vals.tiempo_espera_rest_min}min
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}