# CreativeForge AI 🚀

> **Three specialized AI agents for content, campaigns, and video production.**  
> Powered by **Anthropic Claude Haiku 4.5** via **OpenRouter**, decoupled with a **FastAPI** Python backend and a modern **React + TypeScript + Tailwind CSS** frontend.

---

## 📌 Executive Summary

### The Problem
Most AI applications in the enterprise fall into one of two traps:
1. **Generic Chatbot Wrappers**: An undifferentiated text box sending one generic prompt to an LLM, yielding mediocre, unfocused responses.
2. **Brittle Production Coupling**: Exposing raw API keys directly to client-side code, or failing to validate domain-specific schemas, leading to hallucinated data and security vulnerabilities.

### The Solution: CreativeForge AI
**CreativeForge AI** is an enterprise-grade studio providing **three genuinely different, specialized AI agents**. Each agent possesses:
- **Dedicated System Prompts**: Tailored domain instructions with explicit constraints (e.g. anti-hallucination rules against fabricating fake statistics or customer reviews).
- **Distinct Domain Workflows**: Custom multi-step pipelines reflecting real-world professional practice (Editorial SEO Strategy, Direct-Response Advertising, and Cinematic Video Production).
- **Separate Request & Response Schemas**: Strictly validated Pydantic models in Python and TypeScript interfaces in React.
- **Structured JSON Rendering**: Visual presentation with interactive cards, storyboard timelines, A/B test matrices, and one-click Markdown/file exports.

---

## 🤖 The Three Specialized AI Agents

| Agent | Core Specialization | Dedicated Workflow | Output Structure | System Prompt File |
| :--- | :--- | :--- | :--- | :--- |
| **1. Content Writing Agent** | SEO Blogs, Web Copy, E-Books, In-Depth Articles | Brief ➔ Audience & Intent ➔ SEO Strategy ➔ Outline ➔ Content ➔ FAQ & Internal Links | Strategy, SEO Metadata, Headings Outline, Full Content, FAQs, CTA, Internal Link Suggestions | [`backend/app/prompts/content_prompt.py`](backend/app/prompts/content_prompt.py) |
| **2. Copywriting & Ads Agent** | Meta, Google Ads, LinkedIn, Email, Product Copy, CTAs | Brief ➔ Customer Psychology ➔ Pain Points ➔ Angles ➔ Variations ➔ Headlines & CTAs ➔ A/B Testing | Campaign Strategy, Creative Angle, Multi-Angle Copy Variations, Headlines, Action CTAs, A/B Test Matrix | [`backend/app/prompts/copywriting_prompt.py`](backend/app/prompts/copywriting_prompt.py) |
| **3. Video Production Agent** | Commercial Scripts, Storyboards, Shot Lists, Voice-over, Social 9:16 Cuts | Brief ➔ Concept ➔ 3s Hook ➔ Script ➔ Storyboard Breakdown ➔ Shot List ➔ Audio/SFX ➔ Social Cut | Concept, 0-3s Hook, Full Script, Scene Storyboard Cards, Shot List, Voice-Over, Sound Design, 9:16 Social Cut, CTA | [`backend/app/prompts/video_prompt.py`](backend/app/prompts/video_prompt.py) |

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   React 19 Frontend                    │
│      (TypeScript + Vite + Tailwind CSS + Lucide)       │
└───────────────────────────┬────────────────────────────┘
                            │  HTTP / JSON (Port 5173 ➔ 8000)
                            ▼
┌────────────────────────────────────────────────────────┐
│                    FastAPI Backend                     │
│         (Python 3.12 + Pydantic + Uvicorn)             │
│   • Input Validation & Schema Enforcement              │
│   • API Key Isolation & Environment Security           │
│   • Isolated Prompt & Workflow Builders                │
└───────────────────────────┬────────────────────────────┘
                            │  HTTPS Request (Bearer Token)
                            ▼
┌────────────────────────────────────────────────────────┐
│                    OpenRouter API                      │
│       https://openrouter.ai/api/v1/chat/completions    │
└───────────────────────────┬────────────────────────────┘
                            │  Amazon Bedrock Routing
                            ▼
┌────────────────────────────────────────────────────────┐
│              Anthropic Claude Haiku 4.5                │
│         (Model: anthropic/claude-haiku-4.5)            │
└────────────────────────────────────────────────────────┘
```

### Critical Security Isolation
* **Zero Client Exposure**: The React frontend **never** sees or stores `OPENROUTER_API_KEY`.
* **Backend Resolution**: The FastAPI service reads `OPENROUTER_API_KEY` from the system environment or local `.env` file via `python-dotenv`.
* **Safe Error Handling**: Network errors, 401s, 429 rate limits, and 500s return sanitized human-readable messages without stack traces or secret leaks.

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 19 + TypeScript + Vite 8
  - Tailwind CSS 4 + Custom Glassmorphism System
  - Lucide React (Clean icon set)
- **Backend**:
  - Python 3.12+
  - FastAPI (Modern async web framework)
  - Uvicorn (ASGI server)
  - Pydantic v2 (Request/Response validation)
  - Requests (Robust HTTP communication with OpenRouter)
  - Pytest + HTTPX (Automated test suite)
- **AI / LLM**:
  - Model: `anthropic/claude-haiku-4.5`
  - Gateway: OpenRouter API (`https://openrouter.ai/api/v1/chat/completions`)

---

## 📂 Project Directory Structure

```
creativeforge-ai/
├── frontend/
│   ├── src/
│   │   ├── agents/            # Agent registry, metadata, & workflow configs
│   │   ├── components/
│   │   │   ├── common/        # ActionButtons, ErrorAlert, LoadingState, Telemetry
│   │   │   └── layout/        # Sidebar, Header, Layout
│   │   ├── data/              # 9 interactive sample datasets (3x3 matrix)
│   │   ├── pages/             # Dashboard, 3 Agent pages, Samples, Demo, About, Settings
│   │   ├── services/          # Typed API service client
│   │   ├── types/             # Complete TypeScript data contracts
│   │   └── utils/             # Clipboard and markdown file export utilities
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.app.json
│
├── backend/
│   ├── app/
│   │   ├── agents/            # Content, Copywriting, & Video agent implementations
│   │   ├── prompts/           # 3 isolated system prompts & user prompt builders
│   │   ├── routes/            # /api/health and 3 agent generation endpoints
│   │   ├── schemas/           # Pydantic schemas for all 3 agents
│   │   ├── services/          # OpenRouterService (Claude Haiku 4.5 client)
│   │   ├── utils/             # Robust LLM JSON extraction parser
│   │   ├── config.py          # Environment loader & configuration
│   │   └── main.py            # FastAPI application with CORS and error handlers
│   ├── tests/                 # Pytest test suite for health, validation, & agents
│   └── requirements.txt
│
├── .env.example               # Environment variable template
├── .gitignore                 # Protects .env, node_modules, pycache
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- Python 3.10+
- Node.js 20+ and npm

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in the project root:
```bash
cp .env.example .env
```
Edit `.env` and add your OpenRouter API key:
```env
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
OPENROUTER_MODEL=anthropic/claude-haiku-4.5
PORT=8000
```

### 3. Backend Setup & Startup
In a terminal window:
```bash
cd creativeforge-ai/backend
pip install -r requirements.txt
python app/main.py
```
*The FastAPI backend will start on `http://127.0.0.1:8000` (docs available at `/docs`).*

### 4. Frontend Setup & Startup
In a second terminal window:
```bash
cd creativeforge-ai/frontend
npm install
npm run dev
```
*The Vite React development server will start on `http://localhost:5173` with an automatic proxy forwarding `/api` calls to the FastAPI backend.*

---

## 🧪 Testing

### Automated Backend Test Suite
Run the test suite using `pytest`:
```bash
cd creativeforge-ai/backend
PYTHONPATH=. pytest tests -v
```
**Test Coverage Includes:**
- `test_health_endpoint`: Verifies status, version, and model.
- `test_missing_api_key_handling`: Confirms 401 response and friendly error when `OPENROUTER_API_KEY` is unset.
- `test_validation_error_content_agent`: Ensures invalid/missing payloads return 422 with descriptive field errors.
- `test_content_agent_generation_mock`: Verifies Content Writing workflow, prompt construction, and output parsing.
- `test_copywriting_agent_generation_mock`: Verifies Copywriting & Ads workflow, variation parsing, and A/B test generation.
- `test_video_agent_generation_mock`: Verifies Video Production workflow, storyboard card breakdown, and shot list parsing.

---

## 🌟 Key Application Features

### 1. Interactive Dashboard
- Overview of all three agents with capability tags and distinct workflow previews.
- Quick navigation to Demo Mode and the Samples gallery.
- Real-time connection and telemetry indicator.

### 2. Dedicated Agent Workspaces
- **Content Writing Agent**:
  - Inputs: Content Type (Blog, Web, E-Book, SEO), Topic, Audience, Goal, Tone, Length, Keywords, Brand Context.
  - Outputs: Strategy, SEO Blueprint (Search Intent, Meta Title & Description), Headings Outline, Publication-Ready Content, FAQs, Primary CTA, and Internal Links.
- **Copywriting & Ads Agent**:
  - Inputs: Platform (Meta, Instagram, Google Ads, LinkedIn, Email), Copy Type, Product, Target Audience, Campaign Goal, Pain Point, Benefit, Offer, Tone.
  - Outputs: Campaign Strategy, Creative Angle, Multi-Angle Copy Variations, High-Converting Headlines, Action CTAs, and A/B Testing Matrix.
- **Video Production Agent**:
  - Inputs: Video Type, Topic, Platform, Target Audience, Duration, Objective, Tone, Aesthetic Style, Product, CTA.
  - Outputs: Creative Concept, 0-3s Hook, Full Production Script, Scene-by-Scene Storyboard Cards, Camera Shot List, Master Voice-Over, Sound Design/SFX, 9:16 Social Cut, Outro CTA.

### 3. Dedicated Samples Gallery (9 Outputs)
Explore 9 realistic, pre-computed demonstration outputs across all 3 agents:
- **Content Writing**: SEO Technical Blog, Enterprise Clinic Management Homepage, Founder E-Book Chapter.
- **Copywriting & Ads**: Circadian Sleep Glasses Meta Ads, Automated SOC 2 Compliance Google Search Ads, B2B SaaS Churn Reduction Email Sequence.
- **Video Production**: 60s AI Audio Voice Cloning Commercial Script, 30s Luxury Electric SUV Storyboard, 15s Viral Leftover Recipe TikTok Short.

### 4. Assignment Live Demo Mode
- Three pre-configured cards loaded with enterprise briefs.
- One-click **"Run Demo"** buttons that execute **real, live Claude Haiku 4.5 generations** through OpenRouter.
- Live token counts, model provider details (`Amazon Bedrock`), and estimated cost calculation.
- Instant Copy to Clipboard, Markdown File Download, and Reset controls.

### 5. Settings & Health Diagnostic Page
- Real-time backend ping to test connectivity.
- Displays model status (`anthropic/claude-haiku-4.5`), provider, and API key configuration state.
- Documentation for all mounted FastAPI endpoints.

---

## 🔒 Security Best Practices Implemented
- `.env` excluded from version control via `.gitignore`.
- `.env.example` provided for safe onboarding.
- API keys never printed in application logs or returned in client payloads.
- Strict Pydantic input sanitization and HTTP exception handlers.

---

## 🚀 Future Roadmap
- Streaming completions (`text/event-stream`) for real-time typewriter effect.
- Multi-language translation agent workflows.
- Integration with external CMS providers (WordPress, Webflow, Ghost).
- Direct export to Figma / Storyboard PDF presentation decks.
