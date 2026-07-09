import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier
from database import query_to_df

# Cargar datos y entrenar modelo al iniciar
def train_model():
    df = query_to_df("""
        SELECT dist_asignacion_km, tiempo_espera_rest_min,
               tiempo_total_min, minutos_retraso, cumple_sla
        FROM fact_pedidos LIMIT 5000
    """)

    X = df[["dist_asignacion_km", "tiempo_espera_rest_min",
            "tiempo_total_min", "minutos_retraso"]]
    y = df["cumple_sla"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    modelo = XGBClassifier(
        n_estimators=100, random_state=42,
        eval_metric="logloss", verbosity=0
    )
    modelo.fit(X_train, y_train)

    print(f"Modelo entrenado correctamente")
    return modelo

# Modelo global
modelo_xgb = train_model()

def predecir(dist_km: float, espera_min: float,
             tiempo_min: float, retraso_min: float) -> dict:
    datos = pd.DataFrame([{
        "dist_asignacion_km": dist_km,
        "tiempo_espera_rest_min": espera_min,
        "tiempo_total_min": tiempo_min,
        "minutos_retraso": retraso_min
    }])

    prediccion = modelo_xgb.predict(datos)[0]
    probabilidad = modelo_xgb.predict_proba(datos)[0]

    return {
        "cumple_sla": bool(prediccion),
        "probabilidad_cumple": round(float(probabilidad[1]) * 100, 2),
        "probabilidad_no_cumple": round(float(probabilidad[0]) * 100, 2),
        "resultado": "CUMPLE SLA" if prediccion == 1 else "❌ NO CUMPLE SLA"
    }