from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from database import query_to_df
from ml_model import predecir

app = FastAPI(
    title="API Rappi Los Olivos",
    description="Backend para dashboard de delivery Rappi",
    version="1.0.0"
)

# CORS para conectar con React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Modelo para predicción ───
class PedidoInput(BaseModel):
    dist_asignacion_km: float
    tiempo_espera_rest_min: float
    tiempo_total_min: float
    minutos_retraso: float

# ─── ENDPOINT 1 — KPIs principales ───
@app.get("/kpis")
def get_kpis():
    df = query_to_df("""
        SELECT tiempo_total_min, minutos_retraso,
               dist_asignacion_km, tiempo_espera_rest_min,
               cumple_sla
        FROM fact_pedidos
    """)
    return {
        "total_pedidos": len(df),
        "cumplimiento_sla": round(df["cumple_sla"].mean() * 100, 2),
        "retraso_promedio": round(df["minutos_retraso"].mean(), 2),
        "distancia_promedio": round(df["dist_asignacion_km"].mean(), 2),
        "espera_restaurante": round(df["tiempo_espera_rest_min"].mean(), 2),
        "tiempo_entrega": round(df["tiempo_total_min"].mean(), 2)
    }

# ─── ENDPOINT 2 — SLA por hora ───
@app.get("/sla-por-hora")
def get_sla_por_hora():
    df = query_to_df("""
        SELECT t.hora_dia, f.cumple_sla
        FROM fact_pedidos f
        JOIN dim_tiempo t ON f.id_tiempo = t.id_tiempo
    """)
    resultado = df.groupby("hora_dia")["cumple_sla"].mean() * 100
    return [
        {"hora": int(h), "sla": round(float(v), 2)}
        for h, v in resultado.items()
    ]

# ─── ENDPOINT 3 — Top 10 restaurantes ───
@app.get("/top-restaurantes")
def get_top_restaurantes():
    df = query_to_df("""
        SELECT r.nombre_sucursal, AVG(f.minutos_retraso) as retraso_promedio
        FROM fact_pedidos f
        JOIN dim_restaurante r ON f.id_restaurante = r.id_restaurante
        GROUP BY r.nombre_sucursal
        ORDER BY retraso_promedio DESC
        LIMIT 10
    """)
    return df.to_dict(orient="records")

# ─── ENDPOINT 4 — Predicción ML ───
@app.post("/predecir-sla")
def predecir_sla(pedido: PedidoInput):
    resultado = predecir(
        dist_km=pedido.dist_asignacion_km,
        espera_min=pedido.tiempo_espera_rest_min,
        tiempo_min=pedido.tiempo_total_min,
        retraso_min=pedido.minutos_retraso
    )
    return resultado

# ─── ENDPOINT 5 — Pedidos por zona ───
@app.get("/pedidos-por-zona")
def get_pedidos_por_zona():
    df = query_to_df("""
        SELECT z.avenida_principal as zona, 
               COUNT(*) as total_pedidos,
               AVG(f.cumple_sla) * 100 as sla_promedio
        FROM fact_pedidos f
        JOIN dim_zona z ON f.id_zona = z.id_zona
        GROUP BY z.avenida_principal
        ORDER BY total_pedidos DESC
        LIMIT 8
    """)
    return df.to_dict(orient="records")

# ─── ENDPOINT 6 — Health check ───
@app.get("/")
def root():
    return {"status":" API Rappi funcionando correctamente"}