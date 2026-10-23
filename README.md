# SAHIL.OS 2.0 ⚡

> **Cinematic, futuristic, AI-augmented personal operating system inspired by JARVIS and Stark-grade engineering interfaces.**

---

## 🛰️ Overview

**SAHIL.OS 2.0** is an interactive, browser-native digital command center showcasing the engineering portfolio, verified research, and technical achievements of **Sahil Nitin Mujumdar** (Data Scientist & AI Engineer).

Designed with a high-fidelity Stark-inspired aesthetic, the operating system delivers an immersive experience featuring a real-time 3D reactor intelligence core, interactive mission dossiers, a neural knowledge constellation graph, and an integrated JARVIS assistant with optional voice telemetry.

---

## 💠 Core Architectural Pillars

- **3D Reactor Intelligence Core**: Original procedural Three.js / React Three Fiber scene featuring concentric counter-rotating armature rings, a pulsing cyan-amber plasma nucleus, bounded parallax tracking, and floating ambient particle systems. Gracefully falls back to a 2D canvas/SVG HUD on non-WebGL environments.
- **Interactive Mission Dossiers**: High-security tactical dossiers for flagship engineering projects (MedAgentX, OmniTutor AI, Defense Ledger, Ammo Predict) with dynamic static-site-generated routes (`/dossiers/[id]`).
- **Neural Knowledge Constellation**: Interactive SVG network topology mapping skills, tools, and research domains with bi-directional relationship highlights and an accessible capability matrix table.
- **Grounded JARVIS Assistant**: Server-side assistant (`/api/chat`) equipped with sliding-window rate limiting, strict input validation, deterministic local knowledge retrieval, and an allowlist of safe UI navigation actions.
- **Privacy-First Tactical Voice**: Browser-native Web Speech API recognition and SpeechSynthesis audio feedback. Opt-in only, muted by default, with instant stop-speaking safeguards.
- **Strict Zero-Paid-Spend Architecture**: Operates 100% offline/locally without requiring any third-party AI keys, database subscriptions, or vector stores.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19, TypeScript (Strict) |
| **Styling & HUD** | Tailwind CSS, Lucide Icons, Custom Design Tokens |
| **Motion & 3D** | Three.js 0.174, React Three Fiber, React Three Drei, Motion |
| **Validation** | Zod v3 (schemas for chat, actions, dossiers, and skills) |
| **Testing** | Vitest 3, React Testing Library, jsdom (83 automated unit/integration tests) |
| **Deployment** | Vercel (Edge-optimized static generation & serverless route handlers) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### 1. Installation
```bash
# Clone repository
git clone https://github.com/MujumdarSahil/SahilOS.git
cd SahilOS

# Install dependencies
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to activate the SAHIL.OS terminal.

### 3. Verification & Testing
```bash
# Run unit & integration test suite (83 tests)
npm test

# Run strict TypeScript type check
npx tsc --noEmit

# Run Next.js linter
npm run lint

# Build production bundle
npm run build
```

---

## ⚙️ Environment Variables (Optional)

SAHIL.OS 2.0 functions completely out-of-the-box without any environment variables. If you wish to connect an optional free-tier Gemini API key for external generative responses:

```env
# .env.local
GEMINI_API_KEY=your_free_tier_gemini_key
AI_MODEL=gemini-1.5-flash
```

*(If omitted, JARVIS automatically uses deterministic local knowledge grounding with zero API calls).*

---

## 🔒 Security & Privacy Guarantees

- **Anti-Clickjacking**: Protected via `X-Frame-Options: DENY`.
- **MIME Sniffing Prevention**: Enforced via `X-Content-Type-Options: nosniff`.
- **Permissions Policy**: Camera and geolocation strictly disabled (`camera=(), microphone=(self), geolocation=()`).
- **Server Secret Isolation**: `GEMINI_API_KEY` is strictly confined to server-side route handlers and never exposed to the client.

---

## 📄 License & Attribution

Designed and developed by **Sahil Nitin Mujumdar**. Built with original assets, custom 3D shaders, and bespoke vector iconography. All rights reserved.
