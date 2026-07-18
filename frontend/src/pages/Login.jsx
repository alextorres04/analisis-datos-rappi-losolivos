import { useState } from "react";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (usuario === "admin" && password === "rappi2024") {
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)"
    }}>
      <div style={{
        background: "white", borderRadius: 16, padding: 40,
        width: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            background: "#FF6B35", borderRadius: 12,
            padding: "12px 24px", display: "inline-block", marginBottom: 16
          }}>
            <span style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
              📦 Rappi BI
            </span>
          </div>
          <h2 style={{ color: "#1A1A2E", fontSize: 20, fontWeight: "bold", margin: 0 }}>
            Dashboard Operativo
          </h2>
          <p style={{ color: "#64748B", fontSize: 13, marginTop: 4 }}>
            Los Olivos — Sistema de Análisis
          </p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>USUARIO</label>
          <input
            type="text"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            placeholder="admin"
            style={{
              width: "100%", padding: "10px 12px", marginTop: 4,
              border: "2px solid #E2E8F0", borderRadius: 8,
              fontSize: 14, outline: "none", boxSizing: "border-box"
            }}
            onFocus={e => e.target.style.borderColor = "#FF6B35"}
            onBlur={e => e.target.style.borderColor = "#E2E8F0"}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>CONTRASEÑA</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%", padding: "10px 12px", marginTop: 4,
              border: "2px solid #E2E8F0", borderRadius: 8,
              fontSize: 14, outline: "none", boxSizing: "border-box"
            }}
            onFocus={e => e.target.style.borderColor = "#FF6B35"}
            onBlur={e => e.target.style.borderColor = "#E2E8F0"}
          />
        </div>

        {error && (
          <div style={{
            background: "#FEF2F2", border: "1px solid #FECACA",
            borderRadius: 8, padding: "10px 12px", marginBottom: 16,
            color: "#EF4444", fontSize: 13, textAlign: "center"
          }}>
            ❌ {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%", padding: "12px",
            background: "#FF6B35", color: "white",
            border: "none", borderRadius: 8, fontSize: 15,
            fontWeight: "bold", cursor: "pointer"
          }}
          onMouseEnter={e => e.target.style.background = "#E55A2B"}
          onMouseLeave={e => e.target.style.background = "#FF6B35"}
        >
          Iniciar Sesión
        </button>

        <p style={{ textAlign: "center", color: "#94A3B8", fontSize: 12, marginTop: 16 }}>
          Usuario: <b>admin</b> | Contraseña: <b>rappi2024</b>
        </p>
      </div>
    </div>
  );
}