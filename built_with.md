# Shramik Sahay: Project Overview

## 🛠 Built With (Tech Stack)

Although this is a functional, high-fidelity frontend prototype, it effectively simulates a production-grade micro-services architecture natively in the browser to demonstrate system capabilities without needing a live backend during the pitch.

- **Frontend Core**: HTML5, Vanilla CSS3 (Custom Glassmorphic Design System), Vanilla JavaScript (ES6+)
- **Localization**: Google Translate API (Dynamic multilingual support across 5 regional languages)
- **Machine Learning Engine (`ml-engine.js`)**:
  - Custom JavaScript-based implementation of a **Logistic Regression** model (stochastic gradient descent simulation) used for dynamic premium calculation based on risk factors.
  - Simulated **3-Layer Feedforward Neural Network** for evaluating the Trip Authenticity Score (TAS) against adversarial/spoofing threats.
- **Simulated Third-Party Integrations**:
  - **IMD (Indian Meteorological Department)** API for Rainfall & Storm Alerts.
  - **CPCB (Central Pollution Control Board)** API for AQI monitoring.
  - **NDMA (National Disaster Management Authority)** for Cyclone and Heatwave tracking.
  - **NPCI UPI Payment Gateway** for instant payout verification and transaction simulations.
- **Design & UI**: Fully responsive, CSS variables-driven dark/light mode toggle with advanced CSS micro-animations for real-time trigger monitoring.

---

## 🚨 The Problem

Gig economy workers—specifically food delivery partners (e.g., Zomato, Swiggy)—operate in an environment of extreme volatility. Their daily survival is entirely reliant on continuous outdoor activity. 

However, **environmental and civil disruptions are inevitable.** Heavy rainfall, extreme heatwaves (42°C+), hazardous air quality (AQI > 400), and civil curfews physically prevent these partners from delivering safely. 

**The consequence is massive.** These disruptions translate directly into a **20-30% loss of weekly income**. 

Current financial products completely fail this demographic:
1. **They cannot afford traditional insurance premiums.**
2. **They cannot afford the time required to file and track claims.**
3. **Loss is often subjective and hard to prove using standard insurance guidelines.**

They do not need complex insurance paperwork; they need instant, predictable income stability when disruptions happen.

---

## 💡 What We Have Built

**Shramik Sahay** is an AI-enabled, parametric income protection platform uniquely engineered for gig workers. It sits at the intersection of InsurTech and the Gig Economy, designed as a zero-touch financial safety net.

### 1. Parametric Action Model (Zero Claims Process)
Unlike traditional insurance that requires a worker to file a claim and prove a localized loss, Shramik Sahay uses a "Parametric" system. We passively monitor the environment using public, authorized APIs (IMD, CPCB). If an API triggers an alert (e.g., Rainfall crosses 50mm in their operational zone), a payout is **automatically** triggered. The philosophy is: *"If the disruption happens, the payout happens."*

### 2. AI-Driven Dynamic Pricing
We implemented a simulated Logistic Regression model that calculates highly personalized, micro-premiums. Instead of a flat rate, the AI evaluates a worker's specific historical risk, operating city, and platform data to generate an affordable weekly premium (e.g., just ₹65 for ₹5,000 of coverage). 

### 3. Adversarial Defense & Trip Authenticity Score (TAS)
The biggest challenge with automated payouts is fraud (e.g., GPS spoofing, worker collusion). We solved this by building an intricate anti-spoofing mechanism called the **Trip Authenticity Score (TAS)**.
Before any API trigger results in a payout, a neural-network simulation evaluates:
- Unnatural GPS jumps (Spoofing)
- Speed plausibility
- "Liveness" verification 
- Network consistency

If the TAS score is clean (>70), the claim is instantly settled directly to the worker's verified UPI ID. If anomalies are detected, the system automatically halts the transaction to protect the insurance pool.

### 4. Inclusive & Accessible
We optimized the platform for high adoption among delivery partners by ensuring the entire journey—from onboarding to policy reviews to claims history—is available dynamically in English, Hindi, Marathi, Tamil, and Kannada.
