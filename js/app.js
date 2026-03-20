/* =============================================
   SHRAMIK SAHAY — Application Logic
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
    register: "Registration",
    personalInfo: "Personal Information",
    fullName: "Full Name",
    phone: "Phone Number",
    platform: "Delivery Platform",
    city: "City",
    weeklyIncome: "Average Weekly Income (₹)",
    planSelection: "Plan Selection",
    choosePlan: "Choose Your Protection Plan",
  },
  hi: {
    register: "पंजीकरण",
    personalInfo: "व्यक्तिगत जानकारी",
    fullName: "पूरा नाम",
    phone: "फ़ोन नंबर",
    platform: "डिलीवरी प्लेटफ़ॉर्म",
    city: "शहर",
    weeklyIncome: "साप्ताहिक आय (₹)",
    planSelection: "योजना चयन",
    choosePlan: "सुरक्षा योजना चुनें",
  },
  ta: {
    register: "பதிவு",
    personalInfo: "தனிப்பட்ட தகவல்",
    fullName: "முழு பெயர்",
    phone: "தொலைபேசி எண்",
    platform: "டெலிவரி தளம்",
    city: "நகரம்",
    weeklyIncome: "வாராந்திர வருமானம் (₹)",
    planSelection: "திட்ட தேர்வு",
    choosePlan: "பாதுகாப்பு திட்டம் தேர்வு",
  },
  te: {
    register: "నమోదు",
    personalInfo: "వ్యక్తిగత సమాచారం",
    fullName: "పూర్తి పేరు",
    phone: "ఫోన్ నంబర్",
    platform: "డెలివరీ ప్లాట్‌ఫారం",
    city: "నగరం",
    weeklyIncome: "వారపు ఆదాయం (₹)",
    planSelection: "ప్లాన్ ఎంపిక",
    choosePlan: "రక్షణ ప్లాన్ ఎంచుకోండి",
  },
  kn: {
    register: "ನೋಂದಣಿ",
    personalInfo: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    platform: "ಡೆಲಿವರಿ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",
    city: "ನಗರ",
    weeklyIncome: "ವಾರದ ಆದಾಯ (₹)",
    planSelection: "ಯೋಜನೆ ಆಯ್ಕೆ",
    choosePlan: "ರಕ್ಷಣಾ ಯೋಜನೆ ಆರಿಸಿ",
  },
  bn: {
    register: "নিবন্ধন",
    personalInfo: "ব্যক্তিগত তথ্য",
    fullName: "পূর্ণ নাম",
    phone: "ফোন নম্বর",
    platform: "ডেলিভারি প্ল্যাটফর্ম",
    city: "শহর",
    weeklyIncome: "সাপ্তাহিক আয় (₹)",
    planSelection: "পরিকল্পনা নির্বাচন",
    choosePlan: "আপনার সুরক্ষা পরিকল্পনা বেছে নিন",
  },
};

// City-specific notes
const CITY_NOTES = {
  bengaluru: "🌧 Flood zone city — higher rain tolerance thresholds apply",
  delhi: "💨 High pollution city — lower AQI trigger thresholds (AQI>350)",
  mumbai: "🌊 Coastal city — monsoon tolerance adjusted for Mumbai rainfall patterns",
  chennai: "🌀 Cyclone-prone — cyclone alert triggers automatically activated",
  ahmedabad: "🌡 Heat city — heatwave triggers lowered to 40°C",
};

// ── STATE ──────────────────────────────────────
let currentLang = 'en';
let selectedPlan = null;
let activeSimulation = null;

// Environment data (normal)
const ENV_NORMAL = {
  rain: { val: "12 mm", status: "safe", label: "Safe" },
  temp: { val: "31°C", status: "safe", label: "Safe" },
  aqi: { val: "182", status: "safe", label: "Safe" },
  storm: { val: "None", status: "safe", label: "Safe" },
};

// Simulation scenarios
const SIMULATIONS = {
  rain: {
    rain: { val: "74 mm", status: "danger", label: "TRIGGERED" },
    temp: { val: "27°C", status: "safe", label: "Safe" },
    aqi: { val: "95", status: "safe", label: "Safe" },
    storm: { val: "None", status: "safe", label: "Safe" },
    trigger: "rain",
    title: "Heavy Rainfall Trigger!",
    body: "Rainfall of 74mm detected — exceeds threshold of 50mm. Income loss compensation activated.",
    amount: "₹650",
    icon: "🌧",
  },
  heat: {
    rain: { val: "0 mm", status: "safe", label: "Safe" },
    temp: { val: "44°C", status: "danger", label: "TRIGGERED" },
    aqi: { val: "210", status: "safe", label: "Safe" },
    storm: { val: "None", status: "safe", label: "Safe" },
    trigger: "temp",
    title: "Heatwave Trigger!",
    body: "Temperature of 44°C detected — exceeds threshold of 42°C. TAS verification in progress.",
    amount: "₹520",
    icon: "🌡",
  },
  aqi: {
    rain: { val: "5 mm", status: "safe", label: "Safe" },
    temp: { val: "33°C", status: "safe", label: "Safe" },
    aqi: { val: "428", status: "danger", label: "TRIGGERED" },
    storm: { val: "None", status: "safe", label: "Safe" },
    trigger: "aqi",
    title: "Toxic AQI Alert!",
    body: "AQI of 428 detected — exceeds threshold of 400. Outdoor work conditions determined unsafe.",
    amount: "₹500",
    icon: "💨",
  },
  storm: {
    rain: { val: "42 mm", status: "warning", label: "Warning" },
    temp: { val: "28°C", status: "safe", label: "Safe" },
    aqi: { val: "145", status: "safe", label: "Safe" },
    storm: { val: "IMD Red Alert", status: "danger", label: "TRIGGERED" },
    trigger: "storm",
    title: "Storm Alert Trigger!",
    body: "IMD Red Alert issued. All delivery activity suspended. Instant payout initiated.",
    amount: "₹800",
    icon: "⚡",
  },
};

// ── NAVIGATION ────────────────────────────────
function navigate(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    // Specific screen init
    if (screenId === 'screen-dashboard') initDashboard();
  }
}

// ── LANGUAGE ──────────────────────────────────
function selectLang(lang, el) {
  currentLang = lang;
  document.querySelectorAll('.lang-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
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
}

// ── REGISTRATION ─────────────────────────────
function selectPlatform(el) {
  document.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function updateCityWarning() {
  const city = document.getElementById('reg-city').value;
  const note = document.getElementById('city-note');
  note.textContent = CITY_NOTES[city] || '';
}

// ── PLAN SELECTION ────────────────────────────
function selectPlan(el, coverage, premium) {
  document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedPlan = { coverage, premium };

  // Update summary
  document.getElementById('plan-summary').style.display = 'block';
  document.getElementById('summary-coverage').textContent = `₹${coverage.toLocaleString('en-IN')} / week`;
  document.getElementById('summary-premium').textContent = `₹${premium} / week`;

  // Enable button
  const btn = document.getElementById('plan-next-btn');
  btn.removeAttribute('disabled');

  // Update dashboard values
  document.getElementById('w-protected').textContent = coverage.toLocaleString('en-IN');
  document.getElementById('w-premium').textContent = premium;
}

// ── DASHBOARD ────────────────────────────────
function initDashboard() {
  // Set user name from form
  const name = document.getElementById('reg-name')?.value || 'Arjun Kumar';
  document.getElementById('d-name').textContent = name;
  document.getElementById('p-name').textContent = name;

  // City
  const cityEl = document.getElementById('reg-city');
  if (cityEl) {
    const cityMap = {bengaluru:'Bengaluru',delhi:'Delhi',mumbai:'Mumbai',chennai:'Chennai',ahmedabad:'Ahmedabad'};
    const city = cityMap[cityEl.value] || 'Bengaluru';
    document.getElementById('d-city-label').textContent = city;
  }

  // Apply translations
  applyTranslations();

  // Reset to normal state if no active simulation
  if (!activeSimulation) updateEnvCards(ENV_NORMAL);
  updateTASRing(82);
}

function updateEnvCards(data) {
  ['rain','temp','aqi','storm'].forEach(key => {
    const d = data[key];
    const card = document.getElementById(`env-${key}`);
    const valEl = document.getElementById(`${key === 'rain' ? 'rain' : key === 'temp' ? 'temp' : key === 'aqi' ? 'aqi' : 'storm'}-val`);
    const statusEl = document.getElementById(`${key === 'rain' ? 'rain' : key === 'temp' ? 'temp' : key === 'aqi' ? 'aqi' : 'storm'}-status`);

    if (valEl) valEl.textContent = d.val;
    if (statusEl) {
      statusEl.textContent = d.label;
      statusEl.className = `env-status ${d.status === 'danger' ? 'danger' : d.status === 'warning' ? 'warning' : 'safe'}`;
    }
    if (card) {
      card.className = `env-card ${d.status === 'danger' ? 'triggered' : d.status === 'warning' ? 'warning' : ''}`;
    }
  });
}

function updateTASRing(score) {
  document.getElementById('tas-score').textContent = score;
  // Circumference = 2 * π * 50 ≈ 314
  const offset = 314 - (score / 100) * 314;
  document.getElementById('tas-ring-fill').style.strokeDashoffset = offset;

  const verdict = document.getElementById('tas-verdict');
  if (score >= 70) {
    verdict.textContent = '✅ Instant Payout Eligible';
    verdict.style.background = 'rgba(34,197,94,0.12)';
    verdict.style.borderColor = 'rgba(34,197,94,0.3)';
    verdict.style.color = '#22c55e';
  } else if (score >= 40) {
    verdict.textContent = '⚠️ Partial Payout Eligible';
    verdict.style.background = 'rgba(234,179,8,0.12)';
    verdict.style.borderColor = 'rgba(234,179,8,0.3)';
    verdict.style.color = '#eab308';
  } else {
    verdict.textContent = '🚩 Flagged for Review';
    verdict.style.background = 'rgba(239,68,68,0.12)';
    verdict.style.borderColor = 'rgba(239,68,68,0.3)';
    verdict.style.color = '#ef4444';
  }
}

// ── SIMULATION ───────────────────────────────
function simulate(type) {
  activeSimulation = type;

  // Highlight active button
  document.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  const scenario = SIMULATIONS[type];

  // Update env cards
  updateEnvCards(scenario);

  // Calculate TAS (slightly randomized for realism)
  const tas = Math.floor(55 + Math.random() * 35);
  updateTASRing(tas);

  // Update payout card
  const payoutCard = document.getElementById('payout-card');
  const payoutIcon = document.getElementById('payout-icon');
  const payoutTitle = document.getElementById('payout-title');
  const payoutSubtitle = document.getElementById('payout-subtitle');
  const payoutAmountRow = document.getElementById('payout-amount-row');
  const payoutAmount = document.getElementById('payout-amount');

  payoutIcon.textContent = scenario.icon;
  payoutTitle.textContent = scenario.title.replace('!','') + ' — Processing';
  payoutSubtitle.textContent = scenario.body;
  payoutAmountRow.style.display = 'flex';
  payoutAmount.textContent = scenario.amount;
  payoutCard.style.borderColor = 'var(--accent)';
  payoutCard.style.background = 'rgba(249,115,22,0.06)';

  // Show modal after a short delay
  setTimeout(() => showPayoutModal(scenario, tas), 600);
}

function resetSimulation() {
  activeSimulation = null;
  document.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('active'));
  updateEnvCards(ENV_NORMAL);
  updateTASRing(82);

  // Reset payout card
  document.getElementById('payout-icon').textContent = '🔵';
  document.getElementById('payout-title').textContent = 'Monitoring Active';
  document.getElementById('payout-subtitle').textContent = 'No trigger events this week';
  document.getElementById('payout-amount-row').style.display = 'none';
  const payoutCard = document.getElementById('payout-card');
  payoutCard.style.borderColor = '';
  payoutCard.style.background = '';
}

// ── PAYOUT MODAL ─────────────────────────────
function showPayoutModal(scenario, tas) {
  const modal = document.getElementById('payout-modal');
  document.getElementById('modal-icon').textContent = scenario.icon;
  document.getElementById('modal-title').textContent = scenario.title;
  document.getElementById('modal-body').textContent = scenario.body;
  document.getElementById('modal-amount').textContent = scenario.amount;
  document.getElementById('modal-step').textContent = 'Verifying TAS...';

  const progressFill = document.getElementById('progress-fill');
  progressFill.style.transition = 'none';
  progressFill.style.width = '0%';

  modal.style.display = 'flex';

  // Staged progress simulation
  const steps = [
    { pct: 25, text: `TAS Score: ${tas} — Verified ✓`, delay: 400 },
    { pct: 50, text: 'Trigger event confirmed ✓', delay: 1000 },
    { pct: 75, text: 'Income loss calculated ✓', delay: 1700 },
    { pct: 100, text: `Payout sent via UPI ✓  ${scenario.amount}`, delay: 2400 },
  ];

  steps.forEach(({ pct, text, delay }) => {
    setTimeout(() => {
      progressFill.style.transition = 'width 0.6s ease';
      progressFill.style.width = `${pct}%`;
      document.getElementById('modal-step').textContent = text;
    }, delay);
  });
}

function closeModal() {
  document.getElementById('payout-modal').style.display = 'none';
}

// ── SVG GRADIENT INJECTION ────────────────────
function injectSVGGradient() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.querySelector('.tas-ring');
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

// ── ENV CARD HELPER (key mapping) ─────────────
// Override the updateEnvCards to use correct IDs
function updateEnvCards(data) {
  const keyMap = {
    rain: { card: 'env-rain', val: 'rain-val', status: 'rain-status' },
    temp: { card: 'env-temp', val: 'temp-val', status: 'temp-status' },
    aqi:  { card: 'env-aqi',  val: 'aqi-val',  status: 'aqi-status' },
    storm:{ card: 'env-storm',val: 'storm-val',status: 'storm-status'},
  };
  Object.entries(data).forEach(([key, d]) => {
    const ids = keyMap[key];
    if (!ids) return;
    const card = document.getElementById(ids.card);
    const valEl = document.getElementById(ids.val);
    const statusEl = document.getElementById(ids.status);
    if (valEl) valEl.textContent = d.val;
    if (statusEl) {
      statusEl.textContent = d.label;
      statusEl.className = `env-status ${d.status === 'danger' ? 'danger' : d.status === 'warning' ? 'warning' : 'safe'}`;
    }
    if (card) {
      card.className = `env-card ${d.status === 'danger' ? 'triggered' : d.status === 'warning' ? 'warning' : ''}`;
    }
  });
}

// ── ANIMATED COUNTERS ────────────────────────
function animateCount(el, target, duration = 1200) {
  const start = performance.now();
  const startVal = 0;
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
    el.textContent = Math.round(startVal + eased * (target - startVal)).toLocaleString('en-IN');
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  injectSVGGradient();
  updateCityWarning();

  // Animate splash numbers
  setTimeout(() => {
    document.querySelectorAll('.week-val').forEach(el => {
      const raw = el.querySelector('span');
      if (raw) {
        const num = parseInt(raw.textContent.replace(/,/g, ''));
        if (!isNaN(num)) {
          animateCount(raw, num);
        }
      }
    });
  }, 300);

  // Auto-update city note on load
  const cityEl = document.getElementById('reg-city');
  if (cityEl) updateCityWarning();
});
