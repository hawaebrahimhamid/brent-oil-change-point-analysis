from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Load price data
prices_df = pd.read_csv("backend/data/prices.csv")

prices_df["Date"] = pd.to_datetime(prices_df["Date"])

prices_df = prices_df.sort_values("Date")


@app.route("/")
def home():
    return jsonify({
        "message": "Brent Oil Dashboard API",
        "status": "running",
        "available_endpoints": [
            "/prices",
            "/events",
            "/change-points"
        ]
    })

@app.route("/prices")
def get_prices():
    try:
        prices = pd.read_csv("backend/data/prices.csv")
        return jsonify(prices.to_dict(orient="records"))

    except FileNotFoundError:
        return jsonify({
            "error": "prices.csv not found"
        }), 404

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

@app.route("/events")
def get_events():
    try:
        events = pd.read_csv("backend/data/events.csv")
        return jsonify(events.to_dict(orient="records"))

    except FileNotFoundError:
        return jsonify({
            "error": "events.csv not found"
        }), 404

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500
    
@app.route("/kpis")
def kpis():

    average_price = prices_df["Price"].mean()

    volatility = prices_df["Price"].pct_change().std()

    return jsonify({
        "average_price": round(average_price, 2),
        "volatility": round(volatility, 4)
    })

@app.route("/change-points")
def get_change_points():
    try:
        change_points = pd.read_csv("backend/data/change_points.csv")
        return jsonify(change_points.to_dict(orient="records"))

    except FileNotFoundError:
        return jsonify({
            "error": "change_points.csv not found"
        }), 404

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)
