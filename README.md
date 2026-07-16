# Kumar Mrinal | AI/ML Engineer & Researcher

An interactive, premium portfolio and research hub showcasing work in multilingual NLP, neuroscience decoders, local enterprise RAG systems, and open-source contributions.

Live Link: **[mrinal22258.github.io](https://mrinal22258.github.io/)**

---

## 🚀 Key Highlights & R&D Contributions

### 1. Open Source & Core Infrastructure
* **Crawl4AI Core Contributor (July 2026):** Resolved compilation and dependency conflicts for `lxml` builds under Python 3.14/Poetry, merging changes upstream to stabilize local containerized scraping pipelines.
* **AegisRag-Engine (June 2026):** Engineered an air-gapped, high-security local enterprise RAG pipeline utilizing FAISS vector search, LangChain context retrievers, and local LLMs for secure offline document Q&A.

### 2. Deep Tech & ML Research (IIIT Delhi)
* **Electrophysiology Decoders (Jan 2025 - Present):** Built high-accuracy CNN-BiLSTM neural decoders to model electrical signaling response states of ganglion cells.
* **Neural Cryptanalysis:** Designed lightweight cipher cryptanalysis modeling pipelines using deep neural networks to evaluate cryptographic structural weaknesses, scoring 74% accuracy.
* **Gendered Abuse Detection (2025):** Developed an Indic multilingual NLP model leveraging XLM-RoBERTa + CNN-BiLSTM feature extractors, scoring a **0.67771 Macro F1** benchmark on the ICON shared task.
* **Adversarial Contingency Auctions (2026):** Modeled decentralized multi-agent robot allocation algorithms utilizing inconsistent beliefs, adversarial auction structures, and branch bidding trees.

---

## 🛠️ Skills & Toolkit

* **Languages:** Python, C++, Java, Haskell, SQL
* **AI/ML:** Generative AI, RAG Platforms (LangChain, LangGraph), Multilingual NLP, Neural Electrophysiology Decoders
* **Data & Infrastructure:** FAISS Vector Database, Neo4j, Apache Spark, Hadoop
* **Frameworks & Web:** React 19, TypeScript, Vite, Tailwind CSS, HTML5 Canvas, GLSL/WebGL

---

## 🏆 Certifications

* **Anthropic:** 8+ Professional AI and Developer Certifications
* **Micro1:** AI Certified Software Engineer (2026)
* **University of Toronto:** Self-Driving Cars Specialization (MOOC)
* **University of Helsinki:** Functional Programming (Haskell) Specialization I & II

---

## 🎨 Interactive Portfolio Features

This portfolio is custom-engineered with a unique notebook scrapbook aesthetic combined with modern, high-performance interactions:

1. **WeKnora RAG Chatbot (Bottom-Left):** A client-side, fully offline AI assistant that runs TF-IDF vector matching and sentence-level "needle-in-a-haystack" context extraction to answer questions about qualifications, experiences, and repositories without server queries.
2. **Holographic 3D Cyber City Planet (Skills Page):** An interactive, canvas-based 3D holographic wireframe planet where skills sit as glowing skyscraper capsules. Features drag-to-spin controls, cursor tag focus, and neon energy rays shooting from the core.
3. **Borderless Scrapbook Notebook (About Page):** A scanned spiral notebook that acts as an interactive journal. Users can flip pages with chevrons or interactive corner-curls, showing stories, education, and photo albums with realistic shadows and zero dark-mode artifacts.

---

## 📦 Project Structure

```
portfolio-template/
├── src/
│   ├── assets/
│   │   ├── badges/              # Certification credentials (AWS, Citi, etc.)
│   │   ├── stars/               # Decorative scrapbook star assets (optimized WebP/PNG)
│   │   ├── stickers/            # Interactive scrapbook sticker assets
│   │   └── techstack/           # Skills and framework SVG icons
│   ├── components/
│   │   ├── section/             # Page sections (About, Skills, Experience, Projects)
│   │   ├── project/             # Components for project details page (TechStack, Overview)
│   │   └── ui/                  # Reusable components (WeKnora Chatbot, SkillGlobe planet)
│   ├── config/
│   │   └── socialLinks.ts       # Social urls, resumePath configurations
│   ├── contexts/
│   │   └── DarkModeContext.tsx  # Dark mode state management
│   ├── pages/
│   │   ├── ProjectDetails.tsx   # Detailed sub-view with chat corpus for projects
│   │   └── Home.tsx             # Interactive dashboard entry page
│   └── App.tsx                  # Main client-side routing entry
├── public/
│   └── assets/
│       └── resume.pdf           # Live resume download source
├── .env.example                 # Clean social variables template
└── index.html                   # HTML entry optimized with Open Graph tags
```

---

## 🏗️ Local Installation

1. **Clone the Repo:**
   ```bash
   git clone https://github.com/mrinal22258/mrinal22258.github.io.git
   cd mrinal22258.github.io
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   # Update VITE_GITHUB_URL, VITE_LINKEDIN_URL, VITE_EMAIL with your values
   ```
4. **Run Development Server:**
   ```bash
   npm run dev
   ```
5. **Build Production Assets:**
   ```bash
   npm run build
   ```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
