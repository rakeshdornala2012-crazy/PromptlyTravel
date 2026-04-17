# PromptlyTravel

**PromptlyTravel** is an AI-unified travel platform aiming to streamline the booking experience by combining flights, hotels, dining, and sightseeing into a seamless, single-page interface powered by intelligent agents.

## 🚀 Current State (Phase 1: Static MVP)
Currently, PromptlyTravel is rapidly prototyping its core User Interface. 

**Architecture:**
- **Frontend Layer:** Built using purely static web technologies (HTML5, Vanilla CSS3, JavaScript).
- **Deployment:** The application is hosted as a static site (e.g., via GitHub Pages or Hostinger Static File Hosting).
- **Compute / Backend:** None required. All logic runs client-side in the browser. 

The goal of Phase 1 is to achieve a flawless, dynamic, and state-of-the-art interactive user experience before integrating complex backend features.

---

## 🗺️ Scalability & Feature Roadmap

As PromptlyTravel transitions from a static landing page to a fully functioning application, the architecture will scale into a modern "Decoupled Stack."

### Phase 2: User Onboarding & Persistent Data
- **Goal:** Allow users to create accounts, save generated itineraries, and securely process payments.
- **Architecture Upgrades:**
  - **Auth Integration:** Implement a robust OAuth solution (e.g., Clerk or Supabase Auth) for Google/Apple sign-ins.
  - **Database Integration:** Connect to a managed, auto-scaling relational database (e.g., PostgreSQL via Supabase) to securely store user profiles, booking history, and platform metrics without managing hardware.
  - **Framework Transition:** Migrate the static UI into a modern componentized framework like **React / Next.js**.

### Phase 3: Agentic Systems & Live APIs
- **Goal:** Replace simulated static data with live booking APIs and integrate deeply complex AI agent workflows.
- **Architecture Upgrades:**
  - **Backend Server:** Spin up a scalable Node.js or Python (FastAPI/LangChain) backend server securely hosted on cloud infrastructure (Render, Heroku, AWS). 
  - **Agentic Workflows:** Implement long-running processes for AI agents to crawl travel APIs (like Amadeus or Skyscanner), aggregate real-time prices, and curate customized itineraries on the fly based on natural language input.
  - **Load Balancing:** Utilize cloud auto-scaling. If user traffic spikes, identical server instances will instantly spin up to handle heavy AI computing demands behind the scenes.

### Phase 4: Expansion & Monetization
- **Goal:** One-click checkout capabilities and mobile-app delivery.
- **Architecture Upgrades:**
  - **Payment Gateways:** Secure backend integration with Stripe for seamless, single-click checkout of multi-vendor itineraries.
  - **Cross-platform:** Utilizing React Native or similar technologies to wrap the web experience into highly performant iOS and Android mobile apps.
