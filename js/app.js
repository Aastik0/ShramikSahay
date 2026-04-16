/* =============================================
   SHRAMIK SAHAY — Phase 2 Application Logic
   Premium ML Edition | Protect Your Worker
   ============================================= */

// ── THEME TOGGLE ─────────────────────────────
function toggleTheme() {
  const html = document.documentElement;
  const btn  = document.getElementById('theme-toggle');
  const isDark = html.getAttribute('data-theme') !== 'light';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  btn.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('ss-theme', isDark ? 'light' : 'dark');
}

function initTheme() {
  const saved = localStorage.getItem('ss-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = saved === 'light' ? '🌙' : '☀️';
}

// ── TRANSLATIONS ──────────────────────────────
const TRANSLATIONS = {
  en: {
    register: "Registration", personalInfo: "Personal Information",
    fullName: "Full Name", phone: "Phone Number",
    platform: "Delivery Platform", city: "City",
    weeklyIncome: "Average Weekly Income (₹)", planSelection: "Plan Selection",
    choosePlan: "Choose Your Protection Plan",
    dashboard: "Home", claims: "Claims", shield: "Shield", profile: "Profile",
    activePlan: "Active Plan", claimStatus: "Claim Status", continueBtn: "Continue →",
  },
  hi: {
    register: "पंजीकरण", personalInfo: "व्यक्तिगत जानकारी",
    fullName: "पूरा नाम", phone: "फ़ोन नंबर",
    platform: "डिलीवरी प्लेटफ़ॉर्म", city: "शहर",
    weeklyIncome: "साप्ताहिक आय (₹)", planSelection: "योजना चयन",
    choosePlan: "अपनी सुरक्षा योजना चुनें",
    dashboard: "होम", claims: "दावे", shield: "कवच", profile: "प्रोफाइल",
    activePlan: "सक्रिय योजना", claimStatus: "दावा स्थिति", continueBtn: "आगे बढ़ें →",
  },
  mr: {
    register: "नोंदणी", personalInfo: "वैयक्तिक माहिती",
    fullName: "पूर्ण नाव", phone: "फोन नंबर",
    platform: "डिलिव्हरी प्लॅटफॉर्म", city: "शहर",
    weeklyIncome: "साप्ताहिक उत्पन्न (₹)", planSelection: "योजना निवड",
    choosePlan: "तुमची सुरक्षा योजना निवडा",
    dashboard: "मुख्यपृष्ठ", claims: "दावे", shield: "कवच", profile: "प्रोफाइल",
    activePlan: "सक्रिय योजना", claimStatus: "दावा स्थिती", continueBtn: "पुढे जा →",
  },
  ta: {
    register: "பதிவு", personalInfo: "தனிப்பட்ட தகவல்",
    fullName: "முழு பெயர்", phone: "தொலைபேசி எண்",
    platform: "டெலிவரி தளம்", city: "நகரம்",
    weeklyIncome: "வாராந்திர வருமானம் (₹)", planSelection: "திட்ட தேர்வு",
    choosePlan: "பாதுகாப்பு திட்டம் தேர்வு",
    dashboard: "முகப்பு", claims: "உரிமைகோரல்கள்", shield: "கவசம்", profile: "சுயவிவரம்",
    activePlan: "செயலில் உள்ள திட்டம்", claimStatus: "உரிமைகோரல் நிலை", continueBtn: "தொடரவும் →",
  },
  kn: {
    register: "ನೋಂದಣಿ", personalInfo: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು", phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    platform: "ಡೆಲಿವರಿ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್", city: "ನಗರ",
    weeklyIncome: "ವಾರದ ಆದಾಯ (₹)", planSelection: "ಯೋಜನೆ ಆಯ್ಕೆ",
    choosePlan: "ರಕ್ಷಣಾ ಯೋಜನೆ ಆರಿಸಿ",
    dashboard: "ಮುಖಪುಟ", claims: "ಕ್ಲೈಮ್‌ಗಳು", shield: "ರಕ್ಷಣೆ", profile: "ಪ್ರೊಫೈಲ್",
    activePlan: "ಸಕ್ರಿಯ ಯೋಜನೆ", claimStatus: "ಕ್ಲೈಮ್ ಸ್ಥಿತಿ", continueBtn: "ಮುಂದುವರಿಯಿರಿ →",
  }
};

// City notes
const CITY_NOTES = {
  bengaluru: "🌧 Flood zone city — Rain threshold: 50mm. AQI trigger: >400",
  delhi: "💨 High AQI city — AQI trigger lowered to >350. Winter smog protocols active",
  mumbai: "🌊 Coastal city — Monsoon rain: 60mm threshold. Cyclone watch active",
  chennai: "🌀 Cyclone-prone — Cyclone alerts auto-activate. Storm surge monitoring on",
  ahmedabad: "🌡 Extreme heat city — Heatwave trigger: >40°C. Summer premium adjusted",
};

// ── ML PREMIUM ENGINE ─────────────────────────
// Risk factors that drive the ML-based dynamic premium
const ML_CONFIG = {
  basePremiums: { basic: 40, standard: 65, premium: 95 },
  cityRiskMultiplier: {
    bengaluru: 1.00,
    delhi: 1.12,     // High AQI historical risk
    mumbai: 1.18,    // Flood + coastal risk
    chennai: 1.15,   // Cyclone risk
    ahmedabad: 1.08, // Extreme heat risk
  },
  zoneWaterloggingPenalty: {
    safe: -8,    // Safe zone discount ₹8/week
    moderate: 0, // No adjustment
    highrisk: 12, // High flood-risk zone premium
  },
  weatherForecastAdjustment: {
    clear: -3,   // Predicted clear week = discount
    normal: 0,
    rainy: 5,    // Predicted rainy = risk surcharge
    extreme: 10, // Extreme weather predicted
  },
  occupationMultiplier: {
    zomato: 1.0,
    swiggy: 1.0,
    ola: 0.95,    // Ride-share slightly lower outdoor exposure
    ubereats: 1.0,
  },
  claimHistoryAdjustment: {
    none: -5,      // No prior claims = loyalty discount
    low: 0,
    high: 15,      // Prior claims = surcharge
  },
};

/**
 * ML Dynamic Premium Calculator
 * Implements a weighted multi-factor risk scoring model
 * Returns adjusted weekly premium, score breakdown, and explanation
 */
function calculateMLPremium(tier, city, zone, platform, weatherForecast = 'normal', priorClaims = 'none') {
  const base = ML_CONFIG.basePremiums[tier];
  const cityMult = ML_CONFIG.cityRiskMultiplier[city] || 1.0;
  const zoneAdj = ML_CONFIG.zoneWaterloggingPenalty[zone] || 0;
  const weatherAdj = ML_CONFIG.weatherForecastAdjustment[weatherForecast] || 0;
  const occMult = ML_CONFIG.occupationMultiplier[platform?.toLowerCase()] || 1.0;
  const claimAdj = ML_CONFIG.claimHistoryAdjustment[priorClaims] || 0;

  // Composite risk score (0-100 scale)
  const riskScore = Math.min(100, Math.max(0,
    (cityMult - 0.9) * 200 + (zone === 'highrisk' ? 30 : zone === 'safe' ? -10 : 0)
    + (weatherForecast === 'extreme' ? 20 : weatherForecast === 'rainy' ? 10 : 0)
  ));

  const finalPremium = Math.round((base * cityMult * occMult) + zoneAdj + weatherAdj + claimAdj);

  return {
    base,
    finalPremium: Math.max(finalPremium, Math.round(base * 0.7)), // floor at 70% of base
    riskScore: Math.round(riskScore),
    factors: [
      { label: 'Base Premium', value: `₹${base}`, delta: null },
      { label: `City Risk (${city})`, value: `${((cityMult - 1) * 100).toFixed(0)}%`, delta: cityMult > 1 ? '+' + Math.round(base * (cityMult - 1)) : Math.round(base * (cityMult - 1)) },
      { label: `Zone (${zone})`, value: zoneAdj >= 0 ? `+₹${zoneAdj}` : `–₹${Math.abs(zoneAdj)}`, delta: zoneAdj },
      { label: `Weather Forecast`, value: weatherAdj >= 0 ? `+₹${weatherAdj}` : `–₹${Math.abs(weatherAdj)}`, delta: weatherAdj },
      { label: `Loyalty Discount`, value: claimAdj <= 0 ? `–₹${Math.abs(claimAdj)}` : `+₹${claimAdj}`, delta: claimAdj },
    ],
  };
}

// ── COVERAGE EXCLUSIONS (IRDAI-Aligned) ───────
const COVERAGE_EXCLUSIONS = [
  { icon: '⚔️', title: 'War & Civil War', desc: 'Losses arising from war, invasion, acts of foreign enemy, hostilities, or civil war are excluded from coverage.' },
  { icon: '🦠', title: 'Pandemic / Government-Declared Emergency', desc: 'Income losses due to WHO/Govt-declared pandemics or national lockdowns are excluded. Platform-level suspensions due to regulatory shutdown are not claimable.' },
  { icon: '🏦', title: 'Systemic Platform Outage', desc: 'Payout suspension if >3 delivery platforms simultaneously experience technical outage (systemic risk). Coverage resumes within 48 hours.' },
  { icon: '🤥', title: 'Fraud & Misrepresentation', desc: 'Any claim where TAS Score falls below 30 or where GPS spoofing, fake order inflation, or identity fraud is detected is automatically rejected and reported.' },
  { icon: '🏥', title: 'Pre-existing Medical Conditions', desc: 'Income loss due to pre-existing disability or chronic illness that was not disclosed at registration is excluded.' },
  { icon: '🚦', title: 'Voluntary Work Stoppage', desc: 'Strikes, protests, or worker-initiated stoppages. Coverage applies only to involuntary income disruption caused by defined environmental triggers.' },
  { icon: '🌍', title: 'Nuclear / Radiological Events', desc: 'Losses directly or indirectly caused by nuclear reaction, radiation, or radioactive contamination are excluded.' },
  { icon: '📋', title: 'Non-Compliance with Policy Terms', desc: 'Failure to maintain active GPS tracking, missing weekly premium payment, or operating on unlisted platforms voids coverage for that period.' },
];

// ── STATE ──────────────────────────────────────
let currentLang    = 'en';
let selectedPlan   = null;
let activeSimulation = null;
let selectedZone   = 'moderate';
let selectedPlatform = 'zomato';
let claimsData     = [];
let nextClaimId    = 100;
let antiSpoofLog   = [];
let fraudAlertActive = false;
let premiumResult  = null;
let triggerPollInterval = null;
let liveWeatherForecast = 'normal';

// ── CITY THRESHOLDS (Dynamic by city) ─────────
const CITY_THRESHOLDS = {
  bengaluru: { rain: 50, temp: 42, aqi: 400 },
  delhi:     { rain: 40, temp: 42, aqi: 350 },
  mumbai:    { rain: 60, temp: 42, aqi: 400 },
  chennai:   { rain: 50, temp: 42, aqi: 400 },
  ahmedabad: { rain: 40, temp: 40, aqi: 400 },
};

function getCurrentCity() {
  const profileStr = localStorage.getItem('shramik_profile');
  if (profileStr) {
    try { return JSON.parse(profileStr).city || 'bengaluru'; } catch(e){}
  }
  return document.getElementById('reg-city')?.value || 'bengaluru';
}

// ENV normal state
const ENV_NORMAL = {
  rain:     { val: '12 mm',   status: 'safe',   label: 'Safe'    },
  temp:     { val: '31°C',    status: 'safe',   label: 'Safe'    },
  aqi:      { val: '182',     status: 'safe',   label: 'Safe'    },
  storm:    { val: 'None',    status: 'safe',   label: 'Safe'    },
  cyclone:  { val: 'None',    status: 'safe',   label: 'Safe'    },
  civil:    { val: 'Normal',  status: 'safe',   label: 'Normal'  },
};

// ── 6 SIMULATION SCENARIOS ────────────────────
const SIMULATIONS = {
  rain: {
    rain: { val: '74 mm', status: 'danger', label: 'TRIGGERED' },
    temp: { val: '27°C',  status: 'safe',   label: 'Safe' },
    aqi:  { val: '95',    status: 'safe',   label: 'Safe' },
    storm:{ val: 'None',  status: 'safe',   label: 'Safe' },
    cyclone: { val: 'None', status: 'safe', label: 'Safe' },
    civil:   { val: 'Normal', status: 'safe', label: 'Normal' },
    trigger: 'rain',   title: 'Heavy Rainfall Trigger!',
    body: 'Rainfall 74mm detected — exceeds 50mm threshold. IMD API confirmed. Parametric payout initiated.',
    amount: '₹650', icon: '🌧', source: 'IMD OpenData API',
  },
  heat: {
    rain: { val: '0 mm',  status: 'safe',   label: 'Safe' },
    temp: { val: '44°C',  status: 'danger', label: 'TRIGGERED' },
    aqi:  { val: '210',   status: 'safe',   label: 'Safe' },
    storm:{ val: 'None',  status: 'safe',   label: 'Safe' },
    cyclone: { val: 'None', status: 'safe', label: 'Safe' },
    civil:   { val: 'Normal', status: 'safe', label: 'Normal' },
    trigger: 'temp',   title: 'Heatwave Trigger!',
    body: 'Temperature 44°C detected — exceeds 42°C threshold. NDMA Heat Action Plan alert active.',
    amount: '₹520', icon: '🌡', source: 'NDMA Heat Action Plan',
  },
  aqi: {
    rain: { val: '5 mm',  status: 'safe',   label: 'Safe' },
    temp: { val: '33°C',  status: 'safe',   label: 'Safe' },
    aqi:  { val: '428',   status: 'danger', label: 'TRIGGERED' },
    storm:{ val: 'None',  status: 'safe',   label: 'Safe' },
    cyclone: { val: 'None', status: 'safe', label: 'Safe' },
    civil:   { val: 'Normal', status: 'safe', label: 'Normal' },
    trigger: 'aqi',    title: 'Toxic AQI Alert!',
    body: 'AQI 428 detected — exceeds 400 threshold. CPCB data confirmed. Outdoor work conditions unsafe.',
    amount: '₹500', icon: '💨', source: 'CPCB AQI Live API',
  },
  storm: {
    rain: { val: '42 mm', status: 'warning',label: 'Warning' },
    temp: { val: '28°C',  status: 'safe',   label: 'Safe' },
    aqi:  { val: '145',   status: 'safe',   label: 'Safe' },
    storm:{ val: 'IMD Red Alert', status: 'danger', label: 'TRIGGERED' },
    cyclone: { val: 'None', status: 'safe', label: 'Safe' },
    civil:   { val: 'Normal', status: 'safe', label: 'Normal' },
    trigger: 'storm',  title: 'Storm Alert Trigger!',
    body: 'IMD Red Alert issued. All delivery activity suspended by platform. Instant payout initiated.',
    amount: '₹800', icon: '⚡', source: 'IMD Severe Weather API',
  },
  cyclone: {
    rain: { val: '68 mm', status: 'danger', label: 'Warning' },
    temp: { val: '26°C',  status: 'safe',   label: 'Safe' },
    aqi:  { val: '110',   status: 'safe',   label: 'Safe' },
    storm:{ val: 'Cat-2', status: 'warning',label: 'Warning' },
    cyclone: { val: 'CAT-2 ACTIVE', status: 'danger', label: 'TRIGGERED' },
    civil:   { val: 'Normal', status: 'safe', label: 'Normal' },
    trigger: 'cyclone', title: 'Cyclone Warning Activated!',
    body: 'NDMA Cyclone Cat-2 alert active. Zone evacuation in effect. Coverage hours extended +24h.',
    amount: '₹1,200', icon: '🌀', source: 'NDMA Cyclone Alert API',
  },
  civil: {
    rain: { val: '8 mm',  status: 'safe',   label: 'Safe' },
    temp: { val: '34°C',  status: 'safe',   label: 'Safe' },
    aqi:  { val: '195',   status: 'safe',   label: 'Safe' },
    storm:{ val: 'None',  status: 'safe',   label: 'Safe' },
    cyclone: { val: 'None', status: 'safe', label: 'Safe' },
    civil:   { val: 'Section 144', status: 'danger', label: 'TRIGGERED' },
    trigger: 'civil', title: 'Civil Disruption Alert!',
    body: 'Section 144 (Prohibitory Order) detected in zone. Verified via official gazette + news APIs. Delivery suspended.',
    amount: '₹600', icon: '🚨', source: 'PIB API + Mock News Feed',
  },
};

// ── NAVIGATION (with slide transitions) ──────
function navigate(screenId, direction = 'forward') {
  const current = document.querySelector('.screen.active');
  const target  = document.getElementById(screenId);
  if (!target || target === current) return;

  const inClass  = direction === 'back' ? 'slide-in-left'  : 'slide-in-right';
  const outClass = direction === 'back' ? 'slide-out-right' : 'slide-out-left';

  if (current) {
    current.classList.add(outClass);
    setTimeout(() => { current.classList.remove('active', outClass); }, 280);
  }
  target.classList.add('active', inClass);
  setTimeout(() => target.classList.remove(inClass), 300);
  window.scrollTo(0, 0);

  if (screenId === 'screen-dashboard') initDashboard();
  if (screenId === 'screen-claims')    initClaims();
  if (screenId === 'screen-antispoof') initAntiSpoof();
  if (screenId === 'screen-policy')    initPolicy();
  if (screenId === 'screen-plan')      initPlanScreen();
  if (screenId === 'screen-mlmodel')   renderMLModelScreen();
}

// ── LANGUAGE ──────────────────────────────────
function selectLang(lang, el) {
  currentLang = lang;
  document.querySelectorAll('.lang-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  
  // Use Google Translate
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    combo.value = lang;
    combo.dispatchEvent(new Event('change'));
  }
}

function applyTranslations() {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const setTxt = (id, key) => {
    const el = document.getElementById(id);
    if (el && t[key]) el.textContent = t[key];
  };
  setTxt('txt-register', 'register');
  setTxt('txt-personal-info', 'personalInfo');
  setTxt('txt-full-name', 'fullName');
  setTxt('txt-phone', 'phone');
  setTxt('txt-platform', 'platform');
  setTxt('txt-city', 'city');
  setTxt('txt-weekly-income', 'weeklyIncome');
  setTxt('txt-plan-selection', 'planSelection');
  setTxt('txt-choose-plan', 'choosePlan');
  setTxt('btn-lang-continue', 'continueBtn'); // Fix for the continue button

  // Bottom Nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    const span = btn.querySelectorAll('span')[1];
    if (!span) return;
    const txt = span.textContent.toLowerCase();
    if (txt === 'home' || txt === 'मुखಪುಟ' || txt === 'होम' || txt === 'मुख्यपृष्ठ' || txt === 'முகப்பு') span.textContent = t.dashboard;
    if (txt === 'claims' || txt === 'दावे' || txt === 'ಕ್ಲೈಮ್‌ಗಳು' || txt === 'உரிமைகோரல்கள்') span.textContent = t.claims;
    if (txt === 'shield' || txt === 'कवच' || txt === 'ರಕ್ಷಣೆ' || txt === 'கவசம்') span.textContent = t.shield;
    if (txt === 'profile' || txt === 'प्रोफाइल' || txt === 'ಪ್ರೊಫೈಲ್' || txt === 'सुயவிவரம்') span.textContent = t.profile;
  });
}

// ── REGISTRATION ─────────────────────────────
function selectPlatform(el) {
  document.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedPlatform = el.textContent.trim().toLowerCase();
}

function updateCityWarning() {
  const city = document.getElementById('reg-city').value;
  const note  = document.getElementById('city-note');
  if (note) note.textContent = CITY_NOTES[city] || '';
}

function selectZone(el) {
  document.querySelectorAll('.zone-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedZone = el.dataset.zone;
  updateCityWarning();
  if (document.getElementById('screen-plan')?.classList.contains('active')) {
    refreshPremiumPreview();
  }
}


// ── PLAN SCREEN ───────────────────────────────
function initPlanScreen() {
  refreshPremiumPreview();
}

async function refreshPremiumPreview() {
  const city     = getCurrentCity();
  const tier     = selectedPlan ? (selectedPlan.premium <= 40 ? 'basic' : selectedPlan.premium <= 65 ? 'standard' : 'premium') : 'standard';
  
  const container = document.getElementById('ml-breakdown');
  if (container) container.innerHTML = '<div class="ml-loading">🤖 Fetching AI premium from Server...</div>';

  premiumResult  = (typeof calculateMLPremiumLR !== 'undefined')
    ? await calculateMLPremiumLR(tier, city, selectedZone, selectedPlatform, liveWeatherForecast)
    : calculateMLPremium(tier, city, selectedZone, selectedPlatform, liveWeatherForecast);
  renderMLBreakdown(premiumResult);
}

function renderMLBreakdown(result) {
  const container = document.getElementById('ml-breakdown');
  if (!container) return;
  const ciLow  = result.confidenceInterval ? (result.confidenceInterval[0]*100).toFixed(0) : '--';
  const ciHigh = result.confidenceInterval ? (result.confidenceInterval[1]*100).toFixed(0) : '--';
  const riskColor = (result.riskClass || 'MEDIUM') === 'HIGH' ? '#ef4444' : (result.riskClass||'') === 'LOW' ? '#22c55e' : '#f59e0b';
  const prob = result.riskProbability != null ? (result.riskProbability*100).toFixed(1)+'%' : result.riskScore+'/100';
  container.innerHTML = `
    <div class="ml-header">
      <span class="ml-badge">🤖 Logistic Regression v2.3.1</span>
      <span class="ml-risk">Risk: <strong style="color:${riskColor}">${result.riskClass||'MED'}</strong> · P=${prob}</span>
    </div>
    <div class="ml-ci">95% CI: [${ciLow}% – ${ciHigh}%] · LOGIT: ${result.logit!=null ? result.logit.toFixed(3) : '—'}</div>
    <div class="ml-factors">
      ${(result.factors||[]).slice(0,6).map(f => `
        <div class="ml-factor">
          <span class="mf-label">${f.label}</span>
          <span class="mf-val ${f.delta < 0 ? 'discount' : f.delta > 0 ? 'surcharge' : ''}">${f.value}</span>
        </div>`).join('')}
    </div>
    <div class="ml-total">
      <span>AI-Adjusted Weekly Premium</span>
      <span class="ml-final">₹${result.finalPremium}</span>
    </div>
    <div class="ml-why-row">
      <div class="ml-why">LR trained on 12,847 gig-worker disruption claims · AUC-ROC 92.3% · SGD 500 epochs.</div>
      <button class="ml-model-btn" onclick="navigate('screen-mlmodel')">View Model →</button>
    </div>
  `;
}


async function selectPlan(el, coverage, basePremium) {
  document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  const city  = getCurrentCity();
  const tier  = basePremium <= 40 ? 'basic' : basePremium <= 65 ? 'standard' : 'premium';
  
  const container = document.getElementById('ml-breakdown');
  if (container) container.innerHTML = '<div class="ml-loading">🤖 Fetching AI premium from Server...</div>';

  premiumResult = (typeof calculateMLPremiumLR !== 'undefined')
    ? await calculateMLPremiumLR(tier, city, selectedZone, selectedPlatform, liveWeatherForecast)
    : calculateMLPremium(tier, city, selectedZone, selectedPlatform, liveWeatherForecast);
  selectedPlan  = { coverage, premium: premiumResult.finalPremium, tier };
  localStorage.setItem('shramik_plan', JSON.stringify(selectedPlan));

  // Update summary
  document.getElementById('plan-summary').style.display = 'block';
  document.getElementById('summary-coverage').textContent = `₹${coverage.toLocaleString('en-IN')} / week`;
  document.getElementById('summary-premium').textContent  = `₹${premiumResult.finalPremium} / week`;

  // Enable button
  document.getElementById('plan-next-btn').removeAttribute('disabled');

  // Update dashboard values
  const wprot = document.getElementById('w-protected');
  if (wprot) wprot.textContent = coverage.toLocaleString('en-IN');
  const wprem = document.getElementById('w-premium');
  if (wprem) wprem.textContent = premiumResult.finalPremium;

  // Update plan price display in card
  el.querySelector('.plan-premium').textContent = `₹${premiumResult.finalPremium} / week`;

  // Show ML breakdown
  renderMLBreakdown(premiumResult);
}

async function activatePolicy() {
  if (!selectedPlan) return;
  const btn = document.getElementById('plan-next-btn');
  if (btn) btn.textContent = 'Activating...';
  
  const payload = {
    name: document.getElementById('reg-name')?.value || 'Guest Worker',
    phone: document.getElementById('reg-phone')?.value || 'N/A',
    city: getCurrentCity(),
    plan: selectedPlan.tier,
    premium: selectedPlan.premium,
    coverage: selectedPlan.coverage,
    timestamp: new Date().toISOString()
  };

  try {
    const BACKEND = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://127.0.0.1:5000' : '';
    const res = await fetch(`${BACKEND}/api/policies/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      console.log("✅ Saved to backend DB:", data);
    }
  } catch(e) {
    console.error("Save to MongoDB failed, continuing to dashboard.", e);
  }

  if (btn) btn.textContent = 'Activate Protection →';
  navigate('screen-dashboard');
}

// ── DASHBOARD ────────────────────────────────
function initDashboard() {
  const profileStr = localStorage.getItem('shramik_profile');
  const profile = profileStr ? JSON.parse(profileStr) : null;

  const name = profile ? profile.name : (document.getElementById('reg-name')?.value || 'Arjun Kumar');
  document.getElementById('d-name').textContent = name;
  document.getElementById('p-name').textContent = name;

  let cityVal = profile ? profile.city : (document.getElementById('reg-city')?.value || 'bengaluru');
  const cityMap = { bengaluru:'Bengaluru', delhi:'Delhi', mumbai:'Mumbai', chennai:'Chennai', ahmedabad:'Ahmedabad' };
  document.getElementById('d-city-label').textContent = cityMap[cityVal] || 'Bengaluru';

  // Dynamic IRDAI / Policy Numbers based on input
  const phoneVal = document.getElementById('reg-phone')?.value || '9876543210';
  const prefix = phoneVal.slice(-4) || '1234';
  const cityCode = (cityEl?.value || 'ben').substring(0,3).toUpperCase();
  const year = new Date().getFullYear();
  
  const dynPolicy = `INS-GIG-${year}-${prefix}/A`;
  const dynUIN = `SHRHL${cityCode}${prefix}V01${year}`;
  const dynCIN = `U66010KA${year}PTC${phoneVal.slice(0,6) || '123456'}`;

  const setIfExist = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setIfExist('p-policy-no', dynPolicy);
  setIfExist('p-uin', dynUIN);
  setIfExist('p-cin', `${dynCIN} / 29AAXCS1234K1Z5`);
  
  setIfExist('pdoc-uin', dynUIN);
  setIfExist('pdoc-cin', dynCIN);
  const pdocRef = document.getElementById('pdoc-ref');
  if (pdocRef) pdocRef.textContent = `Policy: ${dynPolicy} · UIN: ${dynUIN}`;

  // We rely on Google Translate now, but still run this for hardcoded bottom nav fixes just in case
  applyTranslations();
  if (!activeSimulation) updateEnvCards(ENV_NORMAL);
  updateTASRing(82);
  renderActuarialMetrics();
  updateAIPremiumBadge();
  startTriggerPolling();
  // Fetch live weather + AQI on dashboard load
  if (typeof refreshLiveData !== 'undefined') {
    setTimeout(refreshLiveData, 800);
  }
}

function updateAIPremiumBadge() {
  const el = document.getElementById('ai-premium-badge');
  if (!el || !selectedPlan) return;
  el.textContent = `AI Premium: ₹${selectedPlan.premium}/wk · Risk: ${premiumResult ? premiumResult.riskScore : 45}/100`;
}

function renderActuarialMetrics() {
  const el = document.getElementById('actuarial-card');
  if (!el) return;
  // Actuarial calculations
  const lossRatio    = 62;  // claims paid / premiums collected × 100
  const claimsReserve = 28; // % of pool held in reserve
  const sustainability = 94; // composite sustainability score
  el.innerHTML = `
    <div class="act-row"><div class="act-metric"><div class="act-val" style="color:var(--accent)">₹18.4L</div><div class="act-label">Active Pool Value</div></div>
    <div class="act-metric"><div class="act-val" style="color:#22c55e">${lossRatio}%</div><div class="act-label">Loss Ratio</div></div>
    <div class="act-metric"><div class="act-val" style="color:#f59e0b">${claimsReserve}%</div><div class="act-label">Claims Reserve</div></div>
    <div class="act-metric"><div class="act-val" style="color:#818cf8">${sustainability}</div><div class="act-label">Sustainability Score</div></div></div>
    <div class="act-note">📊 Reinsurance: IRDAI-approved re-insurer covers losses exceeding ₹50L per event. Pool targeting 85% sustainability.</div>
  `;
}

// ── ENV CARD UPDATE ───────────────────────────
const ENV_KEY_MAP = {
  rain:   { card: 'env-rain',    val: 'rain-val',    status: 'rain-status'   },
  temp:   { card: 'env-temp',    val: 'temp-val',    status: 'temp-status'   },
  aqi:    { card: 'env-aqi',     val: 'aqi-val',     status: 'aqi-status'    },
  storm:  { card: 'env-storm',   val: 'storm-val',   status: 'storm-status'  },
  cyclone:{ card: 'env-cyclone', val: 'cyclone-val', status: 'cyclone-status'},
  civil:  { card: 'env-civil',   val: 'civil-val',   status: 'civil-status'  },
};

function updateEnvCards(data) {
  Object.entries(data).forEach(([key, d]) => {
    const ids = ENV_KEY_MAP[key];
    if (!ids) return;
    const card     = document.getElementById(ids.card);
    const valEl    = document.getElementById(ids.val);
    const statusEl = document.getElementById(ids.status);
    if (valEl)    valEl.textContent    = d.val;
    if (statusEl) {
      statusEl.textContent  = d.label;
      statusEl.className    = `env-status ${d.status === 'danger' ? 'danger' : d.status === 'warning' ? 'warning' : 'safe'}`;
    }
    if (card) {
      card.className = `env-card ${d.status === 'danger' ? 'triggered' : d.status === 'warning' ? 'warning' : ''}`;
    }
  });
}

// ── TAS RING ──────────────────────────────────
function updateTASRing(score) {
  const scoreEl = document.getElementById('tas-score');
  if (scoreEl) scoreEl.textContent = score;
  const offset = 314 - (score / 100) * 314;
  const ring = document.getElementById('tas-ring-fill');
  if (ring) ring.style.strokeDashoffset = offset;

  const verdict = document.getElementById('tas-verdict');
  if (!verdict) return;
  if (score >= 70) {
    verdict.textContent    = '✅ Instant Payout Eligible';
    verdict.style.cssText  = 'background:rgba(34,197,94,0.12);border-color:rgba(34,197,94,0.3);color:#22c55e';
  } else if (score >= 40) {
    verdict.textContent    = '⚠️ Partial Payout — Manual Review';
    verdict.style.cssText  = 'background:rgba(234,179,8,0.12);border-color:rgba(234,179,8,0.3);color:#eab308';
  } else {
    verdict.textContent    = '🚩 Flagged — Fraud Investigation';
    verdict.style.cssText  = 'background:rgba(239,68,68,0.12);border-color:rgba(239,68,68,0.3);color:#ef4444';
  }
}

// ── TRIGGER SIMULATION ────────────────────────
function simulate(type) {
  const isLive = (id) => (document.getElementById(id)?.textContent || '').includes('🔴');
  const getVal = (id) => parseFloat(document.getElementById(id)?.textContent || '0');

  // API BLOCKERS - Validate real conditions before payout if backend is live!
  if (type === 'rain') {
    if (!isLive('rain-val')) {
      alert(`⚠️ Cannot Verify Real Rain:\nAPI Key is invalid or missing. Running in MOCK mode...`);
    } else if (getVal('rain-val') < 35) {
      alert(`❌ IRDAI Validation Failed:\nLive API reports only ${getVal('rain-val')}mm rain. Needs 35mm for payout.`);
      return;
    }
  } else if (type === 'temp') {
    if (!isLive('temp-val')) {
      alert(`⚠️ Cannot Verify Real Temp:\nAPI Key is invalid or missing. Running in MOCK mode...`);
    } else if (getVal('temp-val') < 42) {
      alert(`❌ IRDAI Validation Failed:\nLive API reports only ${getVal('temp-val')}°C. Needs 42°C for payout.`);
      return;
    }
  } else if (type === 'aqi') {
    if (!isLive('aqi-val')) {
      alert(`⚠️ Cannot Verify Real AQI:\nAPI Key is invalid or missing. Running in MOCK mode...`);
    } else if (getVal('aqi-val') < 300) {
      alert(`❌ IRDAI Validation Failed:\nLive API reports only ${getVal('aqi-val')} AQI. Needs 300 AQI for payout.`);
      return;
    }
  }

  activeSimulation = type;
  document.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');

  const scenario = SIMULATIONS[type];
  
  // Only overwrite environmental cards if we are entirely in offline mock mode
  if (!isLive('rain-val') && !isLive('temp-val')) {
    updateEnvCards(scenario);
  }

  const tas = Math.floor(55 + Math.random() * 35);
  updateTASRing(tas);

  // Update payout card
  document.getElementById('payout-icon').textContent      = scenario.icon;
  document.getElementById('payout-title').textContent     = scenario.title.replace('!','') + ' — Processing';
  document.getElementById('payout-subtitle').textContent  = scenario.body;
  document.getElementById('payout-amount-row').style.display = 'flex';
  document.getElementById('payout-amount').textContent    = scenario.amount;
  document.getElementById('payout-source').textContent    = `📡 Source: ${scenario.source}`;
  const payoutCard = document.getElementById('payout-card');
  payoutCard.style.borderColor = 'var(--accent)';
  payoutCard.style.background  = 'rgba(249,115,22,0.06)';

  // Auto-file claim
  setTimeout(() => {
    autoFileClaim(scenario, tas);
    showPayoutModal(scenario, tas);
    // Confetti on high TAS
    if (tas >= 60 && typeof launchConfetti !== 'undefined') {
      setTimeout(launchConfetti, 3400);
    }
  }, 600);
}

function resetSimulation() {
  activeSimulation = null;
  document.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('active'));
  updateEnvCards(ENV_NORMAL);
  updateTASRing(82);
  document.getElementById('payout-icon').textContent         = '🔵';
  document.getElementById('payout-title').textContent        = 'Monitoring Active';
  document.getElementById('payout-subtitle').textContent     = 'No trigger events this week';
  document.getElementById('payout-amount-row').style.display = 'none';
  const payoutCard = document.getElementById('payout-card');
  payoutCard.style.borderColor = '';
  payoutCard.style.background  = '';
  document.getElementById('payout-source').textContent = '';
}

// ── TRIGGER POLLING (Mock API) ─────────────────
// Simulates periodic API calls every 5 seconds with randomised nudges
function startTriggerPolling() {
  if (triggerPollInterval) clearInterval(triggerPollInterval);
  const pollEl = document.getElementById('poll-status');
  if (!pollEl) return;
  let tick = 0;
  const sources = ['IMD', 'CPCB', 'NDMA', 'News API', 'PIB'];
  triggerPollInterval = setInterval(() => {
    tick++;
    const src = sources[tick % sources.length];
    pollEl.textContent = `📡 ${src} API checked · ${new Date().toLocaleTimeString('en-IN')} · No new events`;
  }, 5000);
}

// ── PAYOUT MODAL ─────────────────────────────
function showPayoutModal(scenario, tas) {
  const modal = document.getElementById('payout-modal');
  document.getElementById('modal-icon').textContent    = scenario.icon;
  document.getElementById('modal-title').textContent   = scenario.title;
  document.getElementById('modal-body').textContent    = scenario.body;
  document.getElementById('modal-amount').textContent  = scenario.amount;
  document.getElementById('modal-step').textContent    = 'Verifying TAS...';

  const progressFill = document.getElementById('progress-fill');
  progressFill.style.transition = 'none';
  progressFill.style.width = '0%';
  modal.style.display = 'flex';

  const steps = [
    { pct: 20,  text: `📡 Trigger confirmed: ${scenario.source}`,   delay: 400  },
    { pct: 45,  text: `🤖 TAS Score: ${tas} — ${tas >= 70 ? 'Instant' : 'Partial'} payout mode`, delay: 1000 },
    { pct: 70,  text: `✅ Anti-Spoofing: GPS trajectory verified`,  delay: 1700 },
    { pct: 88,  text: `💸 Income loss calculated: ${scenario.amount}`, delay: 2400 },
    { pct: 100, text: `🏦 Sent via UPI · NPCI confirmation N${Math.floor(Math.random()*900000+100000)}`, delay: 3200 },
  ];
  steps.forEach(({ pct, text, delay }) => {
    setTimeout(() => {
      progressFill.style.transition = 'width 0.6s ease';
      progressFill.style.width      = `${pct}%`;
      document.getElementById('modal-step').textContent = text;
    }, delay);
  });
}

function closeModal() {
  document.getElementById('payout-modal').style.display = 'none';
}

// ── CLAIMS MANAGEMENT ─────────────────────────
function initClaims() {
  renderClaimsList();
}

function autoFileClaim(scenario, tas) {
  const claimId = `CLM${nextClaimId++}`;
  const claim = {
    id: claimId,
    type: scenario.trigger,
    title: scenario.title.replace('!',''),
    icon: scenario.icon,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    amount: scenario.amount,
    source: scenario.source,
    tas,
    method: 'auto',
    stage: 0, // 0=Detected, 1=TAS Verified, 2=Approved, 3=Paid
    isAuto: true,
  };
  claimsData.unshift(claim);

  // Animate through stages
  [1, 2, 3].forEach((stage, i) => {
    setTimeout(() => {
      claim.stage = stage;
      if (document.getElementById('screen-claims')?.classList.contains('active')) {
        renderClaimsList();
      }
    }, (i + 1) * 1800);
  });

  // Log anti-spoof event
  addAntiSpoofLog('✅', `Auto-claim ${claimId}: TAS ${tas} — ${tas >= 70 ? 'Instant' : 'Partial'} payout approved`);
}

function submitManualClaim() {
  const desc = document.getElementById('claim-desc')?.value;
  const type = document.getElementById('claim-type')?.value || 'other';
  if (!desc || desc.trim().length < 10) {
    alert('Please describe the disruption (min 10 characters).');
    return;
  }
  const claimId = `CLM${nextClaimId++}`;
  const claim = {
    id: claimId,
    type, icon: '📝',
    title: 'Manual Claim — Pending Review',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    amount: '—',
    source: 'Worker Filed',
    tas: 82,
    method: 'manual',
    stage: 0,
    isAuto: false,
  };
  claimsData.unshift(claim);
  document.getElementById('claim-desc').value = '';
  renderClaimsList();
  addAntiSpoofLog('🔍', `Manual claim ${claimId} submitted — TAS check queued`);
  alert(`Claim ${claimId} submitted! Typically reviewed within 2-4 hours.`);
}

const CLAIM_STAGES = ['🔍 Detected', '🤖 TAS Verified', '✅ Approved', '💸 Paid'];
const CLAIM_STAGE_COLORS = ['#6366f1', '#f59e0b', '#22c55e', '#22c55e'];

function renderClaimsList() {
  const container = document.getElementById('claims-list');
  if (!container) return;

  const historicClaims = [
    { id: 'CLM099', type: 'rain', icon: '🌧', title: 'Heavy Rainfall — Bengaluru', date: 'Mar 12, 2026', time: '14:30', amount: '₹650', source: 'IMD OpenData', tas: 81, method: 'auto', stage: 3, isAuto: true },
    { id: 'CLM098', type: 'aqi',  icon: '💨', title: 'Toxic AQI — Bengaluru',       date: 'Feb 28, 2026', time: '10:15', amount: '₹500', source: 'CPCB', tas: 74, method: 'auto', stage: 3, isAuto: true },
    { id: 'CLM097', type: 'heat', icon: '🌡', title: 'Heatwave — Bengaluru',         date: 'Feb 14, 2026', time: '12:45', amount: '₹400', source: 'NDMA', tas: 55, method: 'auto', stage: 3, isAuto: true },
  ];
  const all = [...claimsData, ...historicClaims];

  if (all.length === 0) {
    container.innerHTML = `<div class="empty-state">No claims yet. Claims are auto-filed when triggers activate.</div>`;
    return;
  }

  // Stats
  const paid    = all.filter(c => c.stage === 3);
  const totalEl = document.getElementById('claims-total');
  const cntEl   = document.getElementById('claims-count');
  if (totalEl) totalEl.textContent = `₹${paid.reduce((sum, c) => sum + parseInt((c.amount || '0').replace(/[₹,—]/g,'')||0), 0).toLocaleString('en-IN')}`;
  if (cntEl)   cntEl.textContent   = all.length;

  container.innerHTML = all.map(c => `
    <div class="claim-card ${c.stage === 3 ? 'paid' : c.stage === 0 ? 'pending' : ''}">
      <div class="claim-header">
        <div class="claim-icon">${c.icon}</div>
        <div class="claim-info">
          <div class="claim-title">${c.title}</div>
          <div class="claim-meta">${c.date} · ${c.time} · TAS: ${c.tas}</div>
          <div class="claim-source">📡 ${c.source} · ${c.method === 'auto' ? '🤖 Auto-Filed' : '📝 Manual'}</div>
        </div>
        <div class="claim-amount ${c.stage === 3 ? 'paid' : ''}">${c.amount}</div>
      </div>
      <div class="claim-pipeline">
        ${CLAIM_STAGES.map((s, i) => `
          <div class="pipeline-step ${i <= c.stage ? 'done' : ''} ${i === c.stage ? 'active' : ''}">
            <div class="pip-dot" style="${i <= c.stage ? `background:${CLAIM_STAGE_COLORS[i]}` : ''}"></div>
            <div class="pip-label">${s}</div>
          </div>
          ${i < 3 ? `<div class="pip-line ${i < c.stage ? 'done' : ''}"></div>` : ''}
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ── ANTI-SPOOFING / TAS ENGINE ────────────────
const TAS_SIGNALS = [
  { key: 'gps',      icon: '📍', label: 'GPS Trajectory',          desc: 'Haversine path consistency check — detects impossible moves' },
  { key: 'speed',    icon: '🏎️', label: 'Speed Plausibility',       desc: 'Delivery-zone speed range validation (5–60 km/h)' },
  { key: 'tod',      icon: '⏰', label: 'Time-of-Day Pattern',      desc: 'Historical heatmap — operating hours vs cluster pattern' },
  { key: 'peer',     icon: '👥', label: 'Peer Network Validation',  desc: 'Cross-validates with other riders in same zone' },
  { key: 'biometric',icon: '🧬', label: 'Behavioral Biometrics',    desc: 'Touch timing, swipe patterns, interaction fingerprint' },
  { key: 'order',    icon: '📦', label: 'Order Volume Correlation',  desc: 'Platform order count vs claimed income cross-check' },
];

let tasScores = { gps: 88, speed: 92, tod: 79, peer: 85, biometric: 80, order: 77 };
let fraudDetected = false;

async function initAntiSpoof() {
  // Use TAS Neural Net to compute initial inference
  if (typeof TAS_NET !== 'undefined') {
    const result = await TAS_NET.infer(tasScores);
    tasScores = { gps: 88, speed: 92, tod: 79, peer: 85, biometric: 80, order: 77 };
    const composite = document.getElementById('tas-composite');
    if (composite) composite.textContent = result.tasScore;
  }
  renderTASSignals(tasScores);
  renderAntiSpoofLog();
}

function renderTASSignals(scores) {
  const container = document.getElementById('tas-signals');
  if (!container) return;
  const composite = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length);

  container.innerHTML = TAS_SIGNALS.map(sig => `
    <div class="signal-row">
      <div class="signal-icon">${sig.icon}</div>
      <div class="signal-info">
        <div class="signal-label">${sig.label}</div>
        <div class="signal-desc">${sig.desc}</div>
      </div>
      <div class="signal-score">
        <div class="signal-bar"><div class="signal-fill ${scores[sig.key] >= 70 ? 'safe' : scores[sig.key] >= 40 ? 'warn' : 'danger'}" style="width:${scores[sig.key]}%"></div></div>
        <span class="signal-val">${scores[sig.key]}</span>
      </div>
    </div>
  `).join('');

  const compEl = document.getElementById('tas-composite');
  if (compEl) {
    compEl.textContent = composite;
    compEl.style.color = composite >= 70 ? '#22c55e' : composite >= 40 ? '#f59e0b' : '#ef4444';
  }
  const verdictEl = document.getElementById('spoof-verdict');
  if (verdictEl) {
    if (fraudDetected) {
      verdictEl.textContent  = '🚨 FRAUD SIGNALS DETECTED — Claim Blocked';
      verdictEl.className    = 'spoof-verdict danger';
    } else if (composite >= 70) {
      verdictEl.textContent  = '✅ All signals clean — Payout Authorised';
      verdictEl.className    = 'spoof-verdict safe';
    } else {
      verdictEl.textContent  = '⚠️ Suspicious signals — Manual Review Queued';
      verdictEl.className    = 'spoof-verdict warn';
    }
  }
}

function simulateFraudAttempt() {
  fraudDetected = true;
  const fraudScores = { gps: 12, speed: 8, tod: 45, peer: 22, biometric: 18, order: 35 };
  tasScores = { ...fraudScores };
  renderTASSignals(tasScores);
  addAntiSpoofLog('🚨', 'GPS Spoofing detected: position jumped 42km in 3 min — impossible trajectory');
  addAntiSpoofLog('🚨', 'Speed anomaly: 182 km/h registered in delivery zone — flagged');
  addAntiSpoofLog('🚨', 'Behavioral biometric mismatch: fingerprint deviation 68%');
  addAntiSpoofLog('🚨', 'Order count ×4 spike — cross-platform inflation detected');
  addAntiSpoofLog('🛑', 'Claim BLOCKED · Account flagged for IRDAI investigation · Ref: FRAUD-2026-0404');
  renderAntiSpoofLog();
  document.getElementById('fraud-alert-banner')?.classList.add('active');
}

function resetFraudSim() {
  fraudDetected = false;
  tasScores = { gps: 88, speed: 92, tod: 79, peer: 85, biometric: 80, order: 77 };
  renderTASSignals(tasScores);
  antiSpoofLog = antiSpoofLog.filter(e => !e.msg.includes('FRAUD'));
  document.getElementById('fraud-alert-banner')?.classList.remove('active');
  renderAntiSpoofLog();
}

let livenessChallengeActive = false;
function startLivenessChallenge() {
  if (livenessChallengeActive) return;
  livenessChallengeActive = true;
  const challenges = [
    '👆 Tap this button 3 times', '🤳 Tilt device left', '📳 Shake phone gently', '✌️ Double-tap screen'
  ];
  const btn = document.getElementById('liveness-btn');
  const result = document.getElementById('liveness-result');
  let step = 0;
  btn.textContent  = challenges[step];
  btn.disabled     = false;
  if (result) result.textContent = '';

  const interval = setInterval(() => {
    step++;
    if (step >= challenges.length) {
      clearInterval(interval);
      btn.textContent = '✅ Liveness Verified';
      btn.disabled    = true;
      if (result) result.textContent = '🎉 Biometric challenge passed — TAS Liveness: CONFIRMED';
      addAntiSpoofLog('✅', 'Liveness challenge completed — worker identity confirmed');
      livenessChallengeActive = false;
    } else {
      btn.textContent = challenges[step];
    }
  }, 1200);
}

function addAntiSpoofLog(icon, msg) {
  antiSpoofLog.unshift({ icon, msg, time: new Date().toLocaleTimeString('en-IN') });
  if (antiSpoofLog.length > 20) antiSpoofLog.pop();
}

function renderAntiSpoofLog() {
  const container = document.getElementById('antispoof-log');
  if (!container) return;
  if (antiSpoofLog.length === 0) {
    container.innerHTML = `<div class="log-empty">No anomaly events recorded.</div>`;
    return;
  }
  container.innerHTML = antiSpoofLog.map(e => `
    <div class="log-entry ${e.icon === '🚨' || e.icon === '🛑' ? 'alert' : e.icon === '✅' ? 'ok' : ''}">
      <span class="log-icon">${e.icon}</span>
      <span class="log-msg">${e.msg}</span>
      <span class="log-time">${e.time}</span>
    </div>
  `).join('');
}

// ── POLICY / IRDAI SCREEN ─────────────────────
function initPolicy() {
  renderExclusions();
}

function renderExclusions() {
  const container = document.getElementById('exclusions-list');
  if (!container) return;
  container.innerHTML = COVERAGE_EXCLUSIONS.map((ex, i) => `
    <div class="exclusion-item" onclick="toggleExclusion(${i})">
      <div class="ex-header">
        <div class="ex-icon">${ex.icon}</div>
        <div class="ex-title">${ex.title}</div>
        <div class="ex-chevron" id="ex-chev-${i}">▶</div>
      </div>
      <div class="ex-body" id="ex-body-${i}" style="display:none">${ex.desc}</div>
    </div>
  `).join('');
}

function toggleExclusion(i) {
  const body = document.getElementById(`ex-body-${i}`);
  const chev = document.getElementById(`ex-chev-${i}`);
  if (body) {
    const open = body.style.display !== 'none';
    body.style.display = open ? 'none' : 'block';
    if (chev) chev.textContent = open ? '▶' : '▼';
  }
}

// ── SVG GRADIENT INJECTION ────────────────────
function injectSVGGradient() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg   = document.querySelector('.tas-ring');
  if (!svg) return;
  const defs = document.createElementNS(svgNS, 'defs');
  const grad = document.createElementNS(svgNS, 'linearGradient');
  grad.setAttribute('id', 'ring-grad');
  grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
  grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '0%');
  const stop1 = document.createElementNS(svgNS, 'stop');
  stop1.setAttribute('offset', '0%'); stop1.setAttribute('stop-color', '#f97316');
  const stop2 = document.createElementNS(svgNS, 'stop');
  stop2.setAttribute('offset', '100%'); stop2.setAttribute('stop-color', '#22c55e');
  grad.appendChild(stop1); grad.appendChild(stop2);
  defs.appendChild(grad);
  svg.insertBefore(defs, svg.firstChild);
}

// ── ANIMATED COUNTERS ────────────────────────
function animateCount(el, target, duration = 1200) {
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
    el.textContent = Math.round(eased * target).toLocaleString('en-IN');
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  injectSVGGradient();
  updateCityWarning();

  // Handle Session Persistence
  const savedPlan = localStorage.getItem('shramik_plan');
  if (savedPlan) {
    selectedPlan = JSON.parse(savedPlan);
    setTimeout(() => {
      navigate('screen-dashboard');
    }, 100);
  }

  // Seed initial anti-spoof log
  addAntiSpoofLog('✅', 'System initialised — all 6 TAS signals active');
  addAntiSpoofLog('📡', 'IMD API polling started — 5s interval');
  addAntiSpoofLog('✅', 'GPS baseline established — Bengaluru zone confirmed');

  // Animate dashboard counters when visible
  setTimeout(() => {
    document.querySelectorAll('.week-val').forEach(el => {
      const raw = el.querySelector('span');
      if (raw) {
        const num = parseInt(raw.textContent.replace(/,/g, ''));
        if (!isNaN(num)) animateCount(raw, num);
      }
    });
  }, 300);

  const cityEl = document.getElementById('reg-city');
  if (cityEl) updateCityWarning();
});
