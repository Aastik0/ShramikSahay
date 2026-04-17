# Shramik Sahay

**AI-Enabled Parametric Income Protection for Food Delivery Partners**

*Theme: Ideate, Build & Protect Your Delivery Worker*

⸻

## Overview

**Shramik Sahay** is an AI-enabled parametric income protection platform designed for food delivery partners working with platforms such as Zomato and Swiggy. 

Food delivery workers operate in highly volatile earning conditions, where income depends on continuous outdoor activity. Environmental disruptions such as heavy rainfall, extreme heatwaves (42°C+), and hazardous air pollution (AQI > 300) can significantly reduce their working hours. These disruptions translate directly into a **20-30% loss of weekly income**.

Current financial products completely fail this demographic because they involve expensive premiums, subjective metrics, and complex claim paperwork. Shramik Sahay provides a zero-touch financial safety net. Payouts are triggered automatically based on real-world environmental conditions and verified worker activity, eliminating manual claims entirely. 

*"If the disruption happens → the payout happens."*

⸻

## 💡 What We Built (All Development Phases)

Our platform has evolved through multiple phases into a comprehensive, robust full-stack application.

### 1. Parametric Action Model (Zero Claims Process)
Unlike traditional insurance, Shramik Sahay uses a "Parametric" system. We passively monitor the environment using live, authorized APIs (OpenWeather). If an API triggers an alert that severely disrupts working conditions, a payout is **automatically** triggered and settled without the worker filing a claim.

### 2. AI-Driven Dynamic Pricing
We implemented a backend **Logistic Regression** model that calculates highly personalized, micro-premiums. Instead of a flat rate, the ML system evaluates a worker's specific historical risk, operating city, and platform exposure to generate a truly affordable weekly premium (e.g., just ₹65 for ₹5,000 of coverage).

### 3. Adversarial Defense & Trip Authenticity Score (TAS)
To combat GPS spoofing and fraud, we engineered the **Trip Authenticity Score (TAS)**.
Before any API trigger results in a cash payout, a backend **Neural Network** evaluates:
- Unnatural GPS jumps (Spoofing)
- Speed plausibility vs. weather conditions
- Liveness network verification 

If the TAS score is clean (>70), the claims contract executes instantly. If anomalies are detected, the system safely halts the transaction.

### 4. Inclusive & Accessible
We optimized the platform for immediate adoption by ensuring the entire application—from onboarding to claims dashboard—is available dynamically in **English, Hindi, Marathi, Tamil, and Kannada** via Google Translate APIs. 

⸻

## 🛠 Built With (Tech Stack)

Our platform leverages a modern, decoupled Full-Stack architecture to ensure security, scalability, and instant execution.

* **Frontend Framework:** HTML5, Custom Glassmorphic CSS3, Vanilla JavaScript (ES6+).
* **Backend Framework:** Python & Flask (Micro-services architecture securely hosting AI logic and API endpoints).
* **Database Management:** MongoDB Atlas (Persistent NoSQL storage for active policies and user metadata via PyMongo).
* **AI / Machine Learning:** Custom algorithms for Logistic Regression (Pricing Engine) and a 3-Layer Feedforward Neural Network (TAS Fraud Detection) running strictly server-side.
* **Integrations & Oracles:**
   * **OpenWeather API:** Real-time localized rainfall and temperature verification.
   * **Google Translate API:** Dynamic multilingual DOM localization.
* **Hosting & Deployment:** Deployed securely on Vercel with serverless Python functions routing.

⸻

## 🚨 Market Crash Scenario: Adversarial Defense & Anti-Spoofing Strategy

Following a simulated fraud attack, we redesigned the system to be multi-layered and resilient.

**TAS = Movement + Activity + Network + Behavior + Proof**

### Differentiation (REAL vs SPOOFED)
| Signal | Real Worker | Spoofer |
| :--- | :--- | :--- |
| **Movement** | Continuous | Jump/static |
| **Activity** | Active Orders | None |
| **Pattern** | Consistent | Irregular |

### UX Balance
- No penalty for basic network drops
- Partial payouts allowed for review
- Minimal friction

System Philosophy: *"We don’t trust location — we trust behavior."*

⸻ 

## 📊 Pitch Deck

You can review all pitch deck materials, presentations, and resources for Shramik Sahay here:  
👉 [Shramik Sahay Pitch Deck (Google Drive)](https://drive.google.com/drive/folders/1drCwKZqru6LLHjxgSV-32heYKF_JObt9?usp=sharing)

⸻

### Final Vision

Shramik Sahay evolves parametric insurance into a real-time, AI-driven income protection system for the gig economy.

**Shramik Sahay — Protecting the Backbone of the Gig Economy**
