Shramik Sahay

AI-Enabled Parametric Income Protection for Food Delivery Partners

Phase 1 Submission — Ideation & Foundation
Theme: Ideate & Know Your Delivery Worker

⸻

Overview

Shramik Sahay is an AI-enabled parametric income protection platform designed for food delivery partners working with platforms such as Zomato and Swiggy.

Food delivery workers operate in highly volatile earning conditions, where income depends on continuous outdoor activity. Environmental disruptions such as rainfall, heatwaves, and air pollution can significantly reduce their working hours.

These disruptions often result in 20–30% loss of weekly income, with no existing protection mechanism.

Shramik Sahay provides automated income protection, where payouts are triggered based on real-world environmental conditions and verified worker activity, eliminating manual claims.

⸻

Deep User Understanding (Who is the Worker?)

Core Characteristics
	•	Works 8–12 hours daily
	•	Income is variable and demand-driven
	•	Uses mid to low-end Android devices
	•	Relies on weekly cash flow for survival
	•	Operates in high-risk outdoor environments

⸻

Key Constraints
	•	Cannot afford complex insurance
	•	Cannot spend time on claims
	•	Cannot rely on stable income
	•	Needs instant, predictable support

⸻

Insight

“Delivery workers don’t need insurance paperwork — they need instant income stability.”

⸻

Persona-Based Scenarios

Arjun Kumar — Full-Time Rider (Bengaluru)
	•	Weekly Income: ₹6200
	•	Works 9–10 hours/day

Disruption: Heavy rainfall → reduced working hours

Impact: ~30% income loss

⸻

Sana Sheikh — Part-Time Rider (Delhi)
	•	Weekly Income: ₹3800

Disruption: AQI > 400 → unsafe to work

⸻

Key Insight from Personas
	•	Income loss is not random, it is predictable from external signals
	•	Workers reduce activity by necessity, not choice

⸻

Solution Strategy

Shramik Sahay uses Parametric Income Protection:
	•	No claims
	•	No verification delays
	•	No paperwork

“If disruption happens → payout happens”

⸻

Application Workflow
	1.	Worker registers
	2.	Selects weekly plan
	3.	Income data collected (manual / platform integration)
	4.	AI predicts expected income
	5.	System monitors environment
	6.	Trigger event detected
	7.	Activity verified
	8.	Automated payout

⸻

AI / ML Architecture (HOW IT ACTUALLY WORKS)

1. Income Prediction Model

Input Features
	•	Past earnings
	•	Working hours
	•	Location demand density
	•	Day-of-week patterns

Output

Expected Weekly Income


⸻

2. Loss Estimation Engine

Loss = Expected Income - Actual Activity-Based Income


⸻

3. Trigger Engine

Uses:
	•	Weather APIs
	•	AQI APIs

If Threshold Crossed → Trigger = TRUE


⸻

4. Decision Engine

If Trigger = TRUE AND Activity Reduced → Payout


⸻

5. Fraud Detection Model
	•	Pattern anomaly detection
	•	Cluster detection
	•	Behavioral deviation

⸻

Weekly Premium Model

Coverage	Premium
₹3000	₹40
₹5000	₹65
₹8000	₹95

Design Principle: Partial protection (20–30%)

⸻

Parametric Triggers
	•	Rainfall > 50 mm
	•	Temperature > 42°C
	•	AQI > 400

⸻

National Disruption Coverage (Macro Layer)

Handles:
	•	Fuel price spikes
	•	Platform outages
	•	Strikes

⸻

Model

Loss = Expected - Actual  
Payout = 20–30% (capped)


⸻

Platform Integration (Future)
	•	Fetch earnings from Zomato / Swiggy
	•	Reduce fraud
	•	Improve accuracy

⸻

Multilingual Accessibility
	•	English, Hindi, Tamil, Telugu, Kannada, Bengali
	•	Onboarding language selection

⸻

🚨 Market Crash Scenario: Adversarial Defense & Anti-Spoofing Strategy

Following the simulated fraud attack, we redesigned the system to be multi-layered and resilient.

⸻

Core System — Trip Authenticity Score (TAS)

TAS = Movement + Activity + Network + Behavior + Proof


⸻

Differentiation (REAL vs SPOOFED)

Signal	Real Worker	Spoofer
Movement	Continuous	Jump/static
Activity	Orders	None
Pattern	Consistent	Irregular


⸻

Data Used Beyond GPS
	•	Activity logs
	•	App usage
	•	Network consistency
	•	Behavioral history
	•	Image proof

⸻

Feature 1 — Lightweight Activity Verification
	•	Periodic GPS checks
	•	Movement consistency
	•	Activity validation

Design Choice

We avoided heavy sensor tracking (gyro/accelerometer) because:
	•	High battery usage
	•	Low-end device limitations
	•	Poor scalability

“Scalable systems must work on the lowest-end devices.”

⸻

Feature 2 — Live Camera Proof
	•	Camera-only capture
	•	No gallery uploads
	•	Timestamp + GPS

⸻

Feature 3 — Crowd Fraud Detection
	•	Detect identical behavior clusters
	•	Identify coordinated attacks

⸻

Feature 4 — Behavioral Fingerprinting
	•	Tracks historical patterns
	•	Flags deviations

⸻

Decision Logic

TAS ≥ 70 → Instant payout  
TAS 40–70 → Partial payout  
TAS < 40 → Flag  


⸻

UX Balance
	•	No penalty for network drops
	•	Partial payouts for safety
	•	Minimal friction

⸻

System Philosophy

“We don’t trust location — we trust behavior.”

⸻

Tech Stack

Frontend: React Native / Flutter
Backend: Node.js / FastAPI
Database: PostgreSQL / MongoDB
AI/ML: Python, Scikit-learn
APIs: Weather, AQI, GPS
Localization: JSON-based

---- 

Final Vision

Shramik Sahay evolves parametric insurance into a real-time, AI-driven income protection system for the gig economy.

⸻

🚀 Closing Line

Shramik Sahay — Protecting the Backbone of the Gig Economy

