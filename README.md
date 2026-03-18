Shramik Sahay

AI-Enabled Parametric Income Protection for Food Delivery Partners

Phase 1 Submission — Ideation & Foundation
Theme: Ideate & Know Your Delivery Worker

⸻

Overview

Shramik Sahay is an AI-enabled parametric income protection platform designed for food delivery partners working with platforms such as Zomato and Swiggy.

Food delivery workers are among the most vulnerable participants in the gig economy because their work requires continuous outdoor travel and road mobility. Environmental disruptions such as heavy rainfall, heatwaves, hazardous air pollution, and extreme weather alerts can significantly reduce delivery activity and working hours.

These disruptions often result in 20–30% loss of weekly income, yet gig workers currently lack any structured financial protection mechanism against such external conditions.

Shramik Sahay addresses this gap by providing automated income protection through parametric insurance, where payouts are triggered automatically when predefined environmental thresholds are crossed.

The platform integrates:
	•	Environmental monitoring APIs
	•	AI-based income prediction
	•	Lightweight activity verification
	•	GPS validation
	•	Camera-based proof system
	•	Automated digital payouts

This ensures fast, transparent, and fair compensation for delivery workers.

⸻

Problem Statement

Food delivery gig workers frequently experience income instability caused by environmental and systemic disruptions, including:
	•	Heavy rainfall and flooding
	•	Heatwaves and extreme temperatures
	•	Hazardous air pollution levels
	•	Storm warnings
	•	Fuel price hikes and national disruptions

During such conditions, workers often:
	•	Reduce working hours
	•	Stop deliveries temporarily
	•	Face unsafe working environments

This results in significant income loss, with no existing protection mechanism tailored for gig workers.

⸻

Target Worker Segment

Shramik Sahay focuses on food delivery partners, including:
	•	Zomato
	•	Swiggy

These workers:
	•	Operate outdoors continuously
	•	Are directly impacted by environmental conditions
	•	Depend on daily/weekly earnings

⸻

Persona-Based Scenarios

Arjun Kumar (Full-Time Delivery Partner)

City: Bengaluru | Weekly Earnings: ₹6200

Heavy rainfall (>60 mm) causes flooded roads → reduced working hours

Trigger: Rainfall > 50 mm
Outcome: Automated partial payout

⸻

Sana Sheikh (Part-Time Delivery Partner)

City: Delhi | Weekly Earnings: ₹3800

AQI rises above 420 → unsafe working conditions

Trigger: AQI > 400
Outcome: Income loss compensation

⸻

Manish Verma (High-Volume Rider)

City: Mumbai | Weekly Earnings: ₹7100

Heatwave (>43°C) reduces daytime work

Trigger: Temperature > 42°C
Outcome: Partial income protection

⸻

Application Workflow
	1.	Worker registers
	2.	Selects weekly protection plan
	3.	Income data fetched (manual or platform integration)
	4.	AI predicts expected earnings
	5.	System monitors environment
	6.	Trigger event detected
	7.	Income loss calculated
	8.	Automated payout via UPI

⸻

Weekly Premium Model

Coverage	Premium
₹3000	₹40
₹5000	₹65
₹8000	₹95

Principle: Partial protection (20–30%) to prevent misuse

⸻

Parametric Triggers

Weather
	•	Rainfall > 50 mm
	•	Temperature > 42°C
	•	Storm alerts

Environmental
	•	AQI > 400
	•	AQI > 450

⸻

National Disruption Coverage (Macro Layer)

Shramik Sahay extends beyond environmental triggers to handle large-scale national disruptions.

Examples
	•	Fuel price spikes (>10%)
	•	Platform outages
	•	Strikes / bandh
	•	Government restrictions

⸻

Model

Loss = Expected Income - Actual Income  
Payout = 20–30% of Loss (capped)


⸻

Features
	•	Individual loss calculation (not blanket payout)
	•	Dynamic payout scaling during large events
	•	Fair distribution across workers

⸻

Platform Integration (Future Scope)

Shramik Sahay is designed to integrate with Zomato and Swiggy for secure data retrieval.

Capabilities
	•	Fetch earnings data
	•	Delivery activity
	•	Order history

Phase 1
	•	Simulated using mock data
	•	Architecture ready for real integration

⸻

Multilingual Accessibility

Supports:
	•	English, Hindi, Tamil, Telugu, Kannada, Bengali

Features:
	•	Language selection at onboarding
	•	Localized UI and notifications
	•	Simple design for accessibility

⸻

AI / ML Integration

Premium Calculation
	•	Weather patterns
	•	Regional risks
	•	Worker activity

⸻

Income Prediction
	•	Delivery hours
	•	Order density
	•	Historical earnings

⸻

Fraud Detection
	•	Pattern anomalies
	•	Coordinated fraud detection
	•	Suspicious activity tracking

⸻

🚨 Market Crash Scenario: Adversarial Defense & Anti-Spoofing Strategy

Following the simulated market attack scenario involving GPS spoofing and coordinated fraud, Shramik Sahay introduces a resilient, multi-layer defense system.

⸻

Core System — Trip Authenticity Score (TAS)

TAS = Movement + Activity + Network + Behavior + Proof

A payout is triggered only if:

Trigger Event = TRUE AND TAS ≥ Threshold

⸻

Feature 1 — Lightweight Activity Verification
	•	Periodic GPS sampling (every 3–5 minutes)
	•	Movement continuity checks
	•	Speed consistency
	•	App activity validation

Design Decision

While advanced systems could use accelerometer and gyroscope-based tracking, we intentionally avoid them due to:
	•	High battery consumption
	•	Limited support on low-end devices
	•	Scalability concerns

We prioritize lightweight, scalable validation suitable for real-world gig workers.

⸻

Feature 2 — Live Camera Proof (Real-World Validation)
	•	In-app camera only
	•	No gallery uploads allowed
	•	Timestamp + GPS metadata attached

AI validates:
	•	Rain conditions
	•	Flooding
	•	Visibility

⸻

Feature 3 — Crowd Pattern Detection

Detects coordinated fraud rings:
	•	Identical GPS clusters
	•	Synchronized user behavior
	•	Repeated payout triggers

⸻

Feature 4 — Behavioral Fingerprinting

Tracks:
	•	Historical work patterns
	•	Activity consistency
	•	Deviations from normal behavior

⸻

Decision Logic

TAS ≥ 70 → Instant payout  
TAS 40–70 → Partial payout  
TAS < 40 → Flag for review  


⸻

UX Balance
	•	No penalties for temporary network drops
	•	Partial payouts for medium-risk users
	•	Simple verification prompts
	•	Fair and non-intrusive system

⸻

System Philosophy

“Fraud can fake location, but not real-world consistency.”

⸻

Platform Choice

Mobile-first platform:
	•	Smartphone accessibility
	•	Real-time monitoring
	•	GPS integration

⸻

Tech Stack

Frontend

React Native / Flutter

Backend

Node.js / FastAPI

Database

PostgreSQL / MongoDB

AI/ML

Python
Scikit-learn
TensorFlow / PyTorch

APIs

Weather API (OpenWeather / IMD)
AQI API
GPS APIs

Localization

JSON-based language packs

Payments

UPI / Razorpay

⸻
