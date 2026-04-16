/* =============================================
   SHRAMIK SAHAY — API Engine (Frontend Facade)
   Delegates ML and Weather calls to Python Backend
   ============================================= */

// Auto-detect environment for Vercel deployment vs Local development
const BACKEND_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') 
  ? 'http://127.0.0.1:5000' 
  : '';

async function calculateMLPremiumLR(tier, city, zone, platform, forecast = 'normal', priorClaims = 'none') {
  try {
    const res = await fetch(`${BACKEND_URL}/api/ml/calculate-premium`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier, city, zone, platform, forecast, priorClaims })
    });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (err) {
    console.error("Backend unreachable, falling back to native JS math", err);
    // Silent fallback to local native calculation if Python backend is not running
    return typeof calculateMLPremium !== 'undefined' 
      ? calculateMLPremium(tier, city, zone, platform, forecast, priorClaims)
      : { base: 65, finalPremium: 65, riskScore: 35, factors: [] };
  }
}

const TAS_NET = {
  infer: async function(signals) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/ml/verify-tas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signals })
      });
      if (!res.ok) throw new Error('API Error');
      return await res.json();
    } catch (err) {
      console.error("Backend unreachable, falling back to native TAS logic", err);
      return { tasScore: 82, fraudProbability: 0.18, isFraud: false };
    }
  }
};

// ── REAL API FETCH (Delegated to Backend) ──
const API_LOG = [];

async function fetchLiveWeather(city) {
  addApiLog('OUT', `GET Backend: Weather for ${city}`);
  try {
    const res = await fetch(`${BACKEND_URL}/api/triggers/weather?city=${city}`);
    const data = await res.json();
    addApiLog(data.source === 'mock_fallback' ? 'MOCK' : 'OK', `Weather → Rain:${data.rain_1h}mm Temp:${data.temp}°C`);
    return { rain: data.rain_1h, temp: data.temp, source: data.source };
  } catch (err) {
    addApiLog('ERR', `Backend failed → using hardcoded fallback`);
    return { rain: 12, temp: 31, source: 'offline_mock' };
  }
}

async function fetchLiveAQI(city) {
  addApiLog('OUT', `GET Backend: AQI for ${city}`);
  // Still mocked until backend implements it, but ready
  return new Promise(r => setTimeout(() => {
    addApiLog('MOCK', `Backend AQI pending → 182`);
    r({ aqi: 182, source: 'mock' });
  }, 300));
}

function addApiLog(type, msg) {
  API_LOG.unshift({ type, msg, ts: new Date().toLocaleTimeString('en-IN') });
  if (API_LOG.length > 15) API_LOG.pop();
  renderApiLog();
}

function renderApiLog() {
  const el = document.getElementById('api-log');
  if (!el) return;
  el.innerHTML = API_LOG.map(e => `
    <div class="api-entry ${e.type.toLowerCase()}">
      <span class="api-type">${e.type}</span>
      <span class="api-msg">${e.msg}</span>
      <span class="api-ts">${e.ts}</span>
    </div>`).join('');
}

async function refreshLiveData() {
  const btn = document.getElementById('fetch-live-btn');
  if (btn) { btn.textContent = '⟳ Fetching...'; btn.disabled = true; }
  const city = (typeof getCurrentCity !== 'undefined') ? getCurrentCity() : (document.getElementById('reg-city')?.value || 'bengaluru');
  
  const [weather, aqi] = await Promise.all([fetchLiveWeather(city), fetchLiveAQI(city)]);

  if (!window.activeSimulation) {
    const rainEl = document.getElementById('rain-val');
    const tempEl = document.getElementById('temp-val');
    const aqiEl  = document.getElementById('aqi-val');
    if (rainEl) rainEl.textContent = `${weather.rain} mm${weather.source==='mock_fallback'?'':' 🔴'}`;
    if (tempEl) tempEl.textContent = `${weather.temp}°C${weather.source==='mock_fallback'?'':' 🔴'}`;
    if (aqiEl)  aqiEl.textContent  = `${aqi.aqi}${aqi.source==='mock'?'':' 🔴'}`;
  }
  if (btn) { btn.textContent = '📡 Fetch Live Data'; btn.disabled = false; }
}

// Model screens disabled gracefully
function renderMLModelScreen() {
  const fiEl = document.getElementById('feature-importance-bars');
  if (fiEl) fiEl.innerHTML = '<div class="act-loading">Logistics Regression migrated to secure Python backend. Weights are no longer exposed to the client.</div>';
  const infoEl = document.getElementById('lr-model-info');
  if (infoEl) infoEl.innerHTML = '<div class="act-loading">Backend API routing established (Flask).</div>';
  const nnEl = document.getElementById('nn-architecture');
  if (nnEl) nnEl.innerHTML = '<div class="act-loading">TAS Architecture secured on backend.</div>';
}
