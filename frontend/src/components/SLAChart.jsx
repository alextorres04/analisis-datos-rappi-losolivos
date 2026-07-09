import { LineChart, Line, XAxis, YAxis, CartesianGrid,
         Tooltip, Legend, ReferenceLine, ResponsiveContainer,
         Area, AreaChart } from "recharts";

const SLAChart = ({ data }) => {
  return (
    <div style={{
      background: "white", borderRadius: 12,
      padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
    }}>
      <h2 style={{ fontSize: 15, fontWeight: "bold", color: "#1E293B",
                   margin: "0 0 16px 0" }}>
        📈 Cumplimiento SLA por Hora del Día
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="slaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="hora" tick={{ fontSize: 11 }}
                 label={{ value: "Hora", position: "insideBottom", offset: -2, fontSize: 11 }} />
          <YAxis domain={[60, 100]} tick={{ fontSize: 11 }}
                 label={{ value: "SLA %", angle: -90, position: "insideLeft", fontSize: 11 }} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Legend />
          <ReferenceLine y={85} stroke="#EF4444" strokeDasharray="5 5"
                         label={{ value: "Meta 85%", fill: "#EF4444", fontSize: 11 }} />
          <Area type="monotone" dataKey="sla" stroke="#FF6B35" strokeWidth={2.5}
                fill="url(#slaGrad)" dot={{ r: 3 }} name="Cumplimiento SLA %" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SLAChart;