import math
import os
import requests
import certifi
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Optional: PyMongo (Leave space for the Mongo URI connection)
try:
    from flask_pymongo import PyMongo
    MONGO_AVAILABLE = True
except ImportError:
    MONGO_AVAILABLE = False

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database Setup Placeholder
app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/shramik")
if MONGO_AVAILABLE and os.getenv("MONGO_URI") != "mongodb+srv://<username>:<password>@cluster0.mongodb.net/shramik?retryWrites=true&w=majority":
    try:
        mongo = PyMongo(app, tlsCAFile=certifi.where())
        db = mongo.db
        print("✅ MongoDB Connected")
    except Exception as e:
        print(f"⚠️ MongoDB Connection Failed: {e}")
        db = None
else:
    print("⚠️ MongoDB URI missing or using placeholder: Proceeding with In-Memory Mode")
    db = None

class LogisticRegression:
    def __init__(self):
        self.weights = {
            'intercept': -2.1403,
            'city_flood_risk': 1.8247,
            'city_aqi_risk': 0.9631,
            'city_heat_risk': 0.7842,
            'zone_waterlogging': 1.4518,
            'rainfall_30d_norm': 0.6873,
            'income_volatility': 0.5214,
            'claim_history_rate': 1.2361,
            'platform_exposure': 0.4127,
        }

    def sigmoid(self, z):
        return 1 / (1 + math.exp(-z))

    def predict(self, features):
        z = self.weights['intercept']
        breakdown = [{'name': 'Intercept', 'contribution': self.weights['intercept']}]
        for k, v in features.items():
            if k in self.weights:
                contrib = self.weights[k] * v
                z += contrib
                breakdown.append({'name': k.replace('_', ' '), 'contribution': contrib})
                
        prob = self.sigmoid(z)
        risk_class = 'HIGH' if prob > 0.65 else 'MEDIUM' if prob > 0.40 else 'LOW'
        
        return {
            'riskProbability': prob,
            'riskClass': risk_class,
            'logit': z,
            'breakdown': breakdown
        }

    def premium_from_risk(self, base, prob):
        loading = 1 + (prob - 0.35) * 1.6
        return max(round(base * 0.70), round(base * loading))


class TASNeuralNet:
    def relu(self, x):
        return max(0, x)

    def sigmoid(self, x):
        return 1 / (1 + math.exp(-x))

    def infer(self, signals):
        vals = list(signals.values()) if signals else [0]
        avg = sum(vals) / len(vals) if len(vals) > 0 else 0
        h1 = self.relu(avg * 1.24 - 15)
        h2 = self.relu(h1 * 0.89 + 8)
        fraud_prob = self.sigmoid(h2 * 0.15 - 2.1)
        tas_score = round((1 - fraud_prob) * 100)
        return {
            'tasScore': max(0, min(100, tas_score)),
            'fraudProbability': fraud_prob,
            'isFraud': fraud_prob > 0.7
        }


CITY_FEATURES = {
    'bengaluru': {'city_flood_risk': 0.45, 'city_aqi_risk': 0.35, 'city_heat_risk': 0.15},
    'delhi':     {'city_flood_risk': 0.30, 'city_aqi_risk': 0.85, 'city_heat_risk': 0.55},
    'mumbai':    {'city_flood_risk': 0.90, 'city_aqi_risk': 0.40, 'city_heat_risk': 0.20},
    'chennai':   {'city_flood_risk': 0.55, 'city_aqi_risk': 0.30, 'city_heat_risk': 0.45},
    'ahmedabad': {'city_flood_risk': 0.25, 'city_aqi_risk': 0.55, 'city_heat_risk': 0.85},
}
ZONE_WATERLOGGING = {'safe': 0.1, 'moderate': 0.5, 'highrisk': 0.9}
PLATFORM_EXPOSURE = {'zomato': 0.8, 'swiggy': 0.8, 'ola': 0.5, 'ubereats': 0.75}
FORECAST_RAINFALL = {'clear': 0.05, 'normal': 0.35, 'rainy': 0.70, 'extreme': 0.95}

lr_model = LogisticRegression()
tas_net = TASNeuralNet()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "db_connected": db is not None})

@app.route('/api/ml/calculate-premium', methods=['POST'])
def calculate_premium():
    data = request.json
    tier = data.get('tier', 'standard').lower()
    city = data.get('city', 'bengaluru').lower()
    zone = data.get('zone', 'moderate').lower()
    platform = data.get('platform', 'zomato').lower()
    forecast = data.get('forecast', 'normal').lower()
    prior_claims = data.get('priorClaims', 'none').lower()

    base_premiums = {'basic': 40, 'standard': 65, 'premium': 95}
    base = base_premiums.get(tier, 65)
    city_f = CITY_FEATURES.get(city, CITY_FEATURES['bengaluru'])
    
    features = {
        **city_f,
        'zone_waterlogging': ZONE_WATERLOGGING.get(zone, 0.5),
        'rainfall_30d_norm': FORECAST_RAINFALL.get(forecast, 0.35),
        'income_volatility': 0.22,
        'claim_history_rate': 2.1 if prior_claims == 'high' else 0.8 if prior_claims == 'low' else 0.0,
        'platform_exposure': PLATFORM_EXPOSURE.get(platform, 0.8)
    }

    result = lr_model.predict(features)
    final_premium = lr_model.premium_from_risk(base, result['riskProbability'])

    return jsonify({
        'base': base,
        'finalPremium': final_premium,
        'riskProbability': result['riskProbability'],
        'riskClass': result['riskClass'],
        'riskScore': round(result['riskProbability'] * 100),
        'breakdown': result['breakdown']
    })

@app.route('/api/ml/verify-tas', methods=['POST'])
def verify_tas():
    data = request.json
    signals = data.get('signals', {})
    result = tas_net.infer(signals)
    return jsonify(result)

# --- NEW INTEGRATIONS ---

@app.route('/api/triggers/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', 'bengaluru').capitalize()
    api_key = os.getenv("OPENWEATHER_API_KEY")
    
    # Check if API key is missing or is the placeholder String
    if not api_key or api_key == "your_openweathermap_api_key_here":
        # Fallback to mock data to prevent app crash if user hasn't added keys yet
        return jsonify({
            "source": "mock_fallback",
            "rain_1h": 0,
            "temp": 31,
            "desc": "clear sky"
        })
        
    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city},IN&appid={api_key}&units=metric"
        resp = requests.get(url, timeout=5)
        resp.raise_for_status()
        data = resp.json()
        
        rain = data.get('rain', {}).get('1h', 0)
        temp = data.get('main', {}).get('temp', 31)
        desc = data.get('weather', [{}])[0].get('description', '')
        
        return jsonify({
            "source": "api.openweathermap.org",
            "rain_1h": rain,
            "temp": temp,
            "desc": desc
        })
    except Exception as e:
        return jsonify({"error": str(e), "source": "mock_fallback", "rain_1h": 0, "temp": 31}), 500

@app.route('/api/policies/create', methods=['POST'])
def create_policy():
    data = request.json
    if db is not None:
        try:
            # Save to MongoDB
            policy_id = db.policies.insert_one(data).inserted_id
            return jsonify({"status": "success", "policy_id": str(policy_id)})
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
    else:
        # In-Memory Fallback
        return jsonify({"status": "success", "message": "Saved to In-Memory DB (No MongoDB Provided)", "mock_id": "123"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
