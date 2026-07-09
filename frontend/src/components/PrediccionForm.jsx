import { useState } from "react";
import axios from "axios";

const PrediccionForm = () => {
  const [form, setForm] = useState({
    dist_asignacion_km: "",
    tiempo_espera_rest_min: "",
    tiempo_total_min: "",
    minutos_retraso: ""
  });
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h2 className="text-lg font-bold text-gray-700 mb-4">
        🤖 Predictor de SLA en Tiempo Real
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "dist_asignacion_km", label: "Distancia (km)" },
          { name: "tiempo_espera_rest_min", label: "Espera Restaurante (min)" },
          { name: "tiempo_total_min", label: "Tiempo Estimado (min)" },
          { name: "minutos_retraso", label: "Minutos Retraso" }
        ].map((field) => (
          <div key={field.name}>
            <label className="text-sm text-gray-500">{field.label}</label>
            <input
              type="number"
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="0.0"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handlePredict}
        disabled={loading}
        className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition"
      >
        {loading ? "Prediciendo..." : "🔮 Predecir SLA"}
      </button>

      {resultado && (
        <div className={`mt-4 p-4 rounded-lg text-center font-bold text-lg
          ${resultado.cumple_sla ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          <p>{resultado.resultado}</p>
          <p className="text-sm font-normal mt-1">
            Probabilidad de cumplir: {resultado.probabilidad_cumple}%
          </p>
        </div>
      )}
    </div>
  );
};

export default PrediccionForm;