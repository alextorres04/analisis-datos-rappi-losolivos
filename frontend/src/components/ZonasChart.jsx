import { BarChart, Bar, XAxis, YAxis, CartesianGrid,
         Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const COLORES = ["#FF6B35", "#10B981", "#3B82F6", "#8B5CF6", "#F59E0B"];

const ZonasChart = ({ data }) => {
  return (
    <div style={{
      background: "white", borderRadius: 12,
      padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
    }}>
      <h2 style={{ fontSize: 15, fontWeight: "bold", color: "#1E293B",
                   margin: "0 0 16px 0" }}>
        🗺️ Pedidos y SLA por Zona
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="zona" tick={{ fontSize: 11 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
          <YAxis yAxisId="right" orientation="right"
                 domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(value, name) =>
              name === "SLA %" ? `${value}%` : value
            }
          />
          <Legend />
          <Bar yAxisId="left" dataKey="total_pedidos" name="Total Pedidos" radius={[4,4,0,0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORES[i % COLORES.length]} />
            ))}
          </Bar>
          <Bar yAxisId="right" dataKey="sla_promedio" name="SLA %"
               fill="#10B981" opacity={0.7} radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ZonasChart;