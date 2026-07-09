## 🎯 Problem Statement

Rappi's delivery service in Los Olivos district faced 
a **7.58% SLA non-compliance rate**, causing customer 
dissatisfaction. The challenge was to **predict delivery 
delays before they happen** and identify the root causes.

**Key finding:** Restaurant wait time (r=0.78) impacts 
delivery time MORE than driver distance (r=0.50) — 
contradicting the initial assumption.

## 📊 Key Results

### Correlation Analysis
> **Key finding:** Restaurant wait time (r=0.78) impacts delivery 
> performance MORE than driver distance (r=0.50)

[Correlacion](imagenes/correlacion_variables.png)

---

### Anomaly Detection
> **5% of orders** were flagged as anomalies — high delivery times 
> regardless of distance, suggesting external causes

![Anomalias](imagenes/anomalias.png)

---

### Linear Regression — Real vs Predicted
> Model shows strong fit between real and predicted delivery times,
> especially in the **10-35 min range** (core of all orders)

![Regresion](imagenes/real_vs_predicho.png)

---

### SLA Compliance by Hour
> SLA drops to **67-72%** during lunch (12pm-2pm) 
> and dinner (7pm-9pm) peak hours

![SLA](imagenes/cumplimiento_sla.png)

---

### Model Evaluation
> XGBoost achieved **92.85% accuracy** — best performing model

![Modelo](imagenes/fase2_visualizacion.png)

## 💼 Business Impact & Recommendations

### What the data revealed
The model discovered that **optimizing restaurant 
preparation times** would have 56% more impact than 
optimizing driver routes — a counter-intuitive finding 
that changes the entire operational strategy.

### Actionable recommendations
1. **Pre-alert restaurants** 15 min before driver arrival
   → Estimated reduction: 2-3 min per order
   
2. **Increase driver availability 30%** during 12pm-2pm 
   and 7pm-9pm peak hours
   → Expected SLA recovery: 85%+
   
3. **Deploy XGBoost model** in production
   → Auto-reassign when SLA probability < 60%
## 🛠️ Technical Skills Demonstrated

### Data Engineering
- Built a **Snowflake schema Datamart** with 1 fact table 
  and 11 dimension tables in MySQL
- Implemented **ETL pipeline**: Bronze → Silver → Gold
- Generated and processed **10,000 realistic records** 
  with Python simulation

### Machine Learning
- Compared **4 algorithms**: Logistic Regression, 
  Random Forest, XGBoost, Linear Regression
- Applied **K-Means clustering** for zone segmentation
- Used **Isolation Forest** for anomaly detection
- Addressed **class imbalance** (92.4% vs 7.6%) 
  with SMOTE technique

### Data Visualization
- Built **interactive Power BI dashboard** with 5 KPIs,
  heatmap and drill-through analysis
- Created **REST API** with FastAPI exposing ML predictions
- Developed **React dashboard** consuming real-time data

### Statistical Analysis
- Correlation matrix revealed key relationships
- Residual analysis validated model assumptions
- P-values confirmed statistical significance
- R² measured model explanatory power

- ##  Quick Start

### Prerequisites
- Python 3.14+, Node.js 18+, MySQL 8.0+

### Run in 3 steps
# 1. Setup database
mysql -u root -p < rappi.sql

# 2. Start API
cd backend && uvicorn main:app --reload

# 3. Start Dashboard  
cd frontend && npm install && npm start

# Access
Dashboard → http://localhost:3000
API Docs  → http://localhost:8000/docs
