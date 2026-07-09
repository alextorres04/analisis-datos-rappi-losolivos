import { BarChart, Bar, XAxis, YAxis, CartesianGrid,
         Tooltip, ResponsiveContainer, Cell } from "recharts";

const getColor = (value) => {
  if (value > 4) return "#EF4444";
  if (value > 2) return "#F59E0B";
  return "#10B981";
};

const RestaurantesChart = ({ data }) => {
  return (
    <div style={{
      background: "white", borderRadius: 12,
      padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
    }}>
      <h2 style={{ fontSize: 15, fontWeight: "bold", color: "#1E293B",
                   margin: "0 0 16px 0" }}>
        🍕 Top 10 Restaurantes con Mayor Retraso
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis type="number" tick={{ fontSize: 10 }}
                 label={{ value: "Retraso (min)", position: "insideBottom", offset: -2, fontSize: 11 }} />
          <YAxis type="category" dataKey="nombre_sucursal"
                 width={90} tick={{ fontSize: 10 }} />
          <Tooltip formatter={(v) => [`${Number(v).toFixed(2)} min`, "Retraso"]} />
          <Bar dataKey="retraso_promedio" radius={[0, 6, 6, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={getColor(entry.retraso_promedio)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 11, color: "#64748B" }}>
        <span>🟢 Bajo (&lt;2 min)</span>
        <span>🟡 Medio (2-4 min)</span>
        <span>🔴 Alto (&gt;4 min)</span>
      </div>
    </div>
  );
};

export default RestaurantesChart;