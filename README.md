# Brent Oil Change Point Analysis

An end-to-end data science and full-stack application for analyzing historical Brent crude oil prices, detecting structural changes using Bayesian Change Point Analysis, and visualizing results through an interactive web dashboard.

## 🚀 Live Demo

**[View the Live Dashboard](https://brent-oil-dashboard.vercel.app/)**

**Architecture:** React + Vite (Vercel) → Flask REST API (Render)

---

## 📌 Project Overview

This project analyzes historical Brent crude oil prices to identify structural changes associated with major geopolitical and economic events.

The project combines:

* Exploratory Data Analysis (EDA)
* Stationarity and volatility analysis
* Bayesian Change Point Analysis
* Flask REST API development
* Interactive React data visualization

The final application allows users to explore oil price trends, detected change points, and historical events through an interactive dashboard.

---

## 🎯 Objectives

* Analyze historical Brent crude oil prices
* Explore long-term trends and volatility
* Detect structural breaks using Bayesian Change Point Analysis
* Relate detected changes to major historical events
* Build and deploy an interactive data visualization dashboard

---

## 🔄 Project Workflow

```text
Historical Brent Oil Prices
            │
            ▼
      Data Cleaning
            │
            ▼
  Exploratory Data Analysis
            │
            ▼
 Stationarity & Volatility
            │
            ▼
 Bayesian Change Point Model
            │
            ▼
       Flask REST API
            │
            ▼
      React Dashboard
            │
            ▼
        Vercel
```

---

## 🧠 Bayesian Change Point Analysis

The Bayesian model estimates the point where the statistical behavior of Brent oil price returns changes.

### Model Parameters

* **τ (tau):** Change point
* **μ₁:** Mean return before the change point
* **μ₂:** Mean return after the change point
* **σ:** Volatility

### Sampling Configuration

* Draws: 100
* Tune: 100
* Chains: 1

### Estimated Result

**Change Point:** 25 May 1989

| Metric             | Before Change | After Change |
| ------------------ | ------------: | -----------: |
| Average log return |       -0.015% |      +0.037% |

Estimated volatility:

```text
σ ≈ 0.029
```

---

## 📊 Interactive Dashboard

The dashboard provides:

* Brent crude oil price visualization
* Bayesian change point marker
* Historical event markers
* KPI summary cards
* Date filtering
* Interactive tooltips
* Responsive layout

### Dashboard

![Dashboard](docs/dashboard.png)

### Filtered Dashboard

![Filtered Dashboard](docs/filtered_dashboard.png)

---

## 🔌 REST API

The React frontend consumes data from a Flask REST API.

| Endpoint             | Description                             |
| -------------------- | --------------------------------------- |
| `GET /prices`        | Returns historical Brent oil prices     |
| `GET /change-points` | Returns detected Bayesian change points |
| `GET /events`        | Returns major historical events         |
| `GET /kpis`          | Returns dashboard KPI statistics        |

### Production Deployment

**Frontend:** React + Vite → Vercel
**Backend:** Flask REST API → Render
**Communication:** HTTPS REST API
**CORS:** Flask-CORS

---

## 🛠️ Technologies

### Backend & Data Science

* Python
* Flask
* Pandas
* NumPy
* PyMC
* Statsmodels

### Frontend

* React
* Vite
* Recharts
* Axios
* CSS

### Development & Deployment

* Git
* GitHub
* Jupyter Notebook
* VS Code
* Vercel
* Render

---

## 📁 Project Structure

```text
brent-oil-change-point-analysis/
│
├── backend/
│   ├── app.py
│   └── data/
│       ├── prices.csv
│       ├── change_points.csv
│       └── events.csv
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── notebooks/
│   └── task2_analysis.ipynb
│
├── docs/
│   ├── dashboard.png
│   ├── filtered_dashboard.png
│   └── event_highlight.png
│
├── requirements.txt
└── README.md
```

---

## ⚙️ Key Implementation Details

The project follows a separation-of-concerns architecture:

```text
Data & Statistical Analysis
        ↓
      Flask API
        ↓
   React Frontend
        ↓
     Dashboard
```

The frontend retrieves production data through the Flask API using an environment variable:

```text
VITE_API_URL
```

This allows the frontend to communicate with the deployed backend without hardcoding the API URL into individual components.

---

## ⚠️ Limitations

Due to hardware limitations, Bayesian inference was performed on the first **1,000 observations** using **100 posterior draws**.

This configuration was chosen to demonstrate the Bayesian change point methodology while keeping computation practical on available hardware.

The resulting change point should therefore be interpreted within the scope of this reduced sample rather than as a definitive conclusion about the complete Brent oil price history.

---

## 🔮 Future Improvements

* Run Bayesian inference on the complete dataset using greater computational resources
* Incorporate macroeconomic variables such as GDP, inflation, and exchange rates
* Compare Bayesian change point detection with alternative structural break models
* Add interactive filtering by event type
* Expand the API with additional analytical endpoints

---

## 📈 Conclusion

This project demonstrates an end-to-end workflow combining **data analysis, Bayesian statistical modeling, REST API development, and interactive frontend visualization**.

The deployed application provides an accessible way to explore Brent crude oil price behavior, detected structural changes, and historical events.

### 🔗 Live Application

**https://brent-oil-dashboard.vercel.app/**
