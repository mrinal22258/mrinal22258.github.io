import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, Trash2 } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  thinking?: string;
}

const FloatingChatbot = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNotice, setShowNotice] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Resume RAG chunk database
  const resumeChunks = [
    {
      id: "identity",
      title: "Identity & Profile",
      keywords: ["mrinal", "kumar", "who", "profile", "contact", "email", "github", "linkedin", "website", "resume", "cv", "location", "address", "phone", "yourslef", "urslef", "yourself"],
      text: "Kumar Mrinal is an AI/ML Engineer, NLP Researcher, and Agentic AI Builder graduating from IIIT Delhi in June 2026. Contact: Email (mrinal22258@iiitd.ac.in), GitHub (github.com/mrinal22258), LinkedIn (linkedin.com/in/krmrinal/)."
    },
    {
      id: "education",
      title: "Education & Qualifications",
      keywords: ["education", "college", "iiit", "iiitd", "delhi", "btech", "degree", "csai", "computer science", "academics", "gpa", "grades", "courses", "university", "qualification", "qualifications", "qulifications"],
      text: "Kumar is pursuing his B.Tech in Computer Science and Artificial Intelligence (CSAI) at Indraprastha Institute of Information Technology Delhi (IIIT Delhi), studying from November 2022 to June 2026."
    },
    {
      id: "crawl4ai",
      title: "Crawl4AI Contribution",
      keywords: ["crawl4ai", "crawl", "open source", "contribution", "github", "stars", "lxml", "python 3.14", "poetry", "bug", "patch", "pip"],
      text: "Open Source Contributor for Crawl4AI (70K+ stars, July 2026). Identified and patched a critical lxml version install conflict on Python 3.14/Poetry environments, merged directly upstream."
    },
    {
      id: "research",
      title: "IIIT Delhi Research",
      keywords: ["research", "neuroscience", "electrophysiology", "rgc", "neural", "ciphers", "cipher", "resnet", "simon", "speck", "cryptanalysis", "bilstm", "professor", "pragya"],
      text: "Undergraduate Researcher at IIIT Delhi: 1) Built CNN-BiLSTM models predicting retinal ganglion cell (RGC) firing activity. 2) Developed ResNet distinguishers breaking ciphers (SIMON32/SPECK32) at 74% accuracy."
    },
    {
      id: "aegisrag",
      title: "AegisRag-Engine",
      keywords: ["aegisrag", "rag", "offline", "air-gapped", "privacy", "faiss", "vector", "langchain", "enterprise", "inference", "local"],
      text: "Developed AegisRag-Engine (Jun 2026) (https://github.com/mrinal22258/RAG-PROJECT). It is a local-first, offline retrieval system designed to ingest, chunk, and index text documents (PDFs, DOCX, TXT files) into a high-performance vector store, completely independent of external APIs or cloud-based LLMs. It features 100% offline inference, modular LangChain pipelines, dense vector search with FAISS/sentence-transformers, and zero external dependencies at query time. It is built for air-gapped enterprise environments where data privacy is paramount."
    },
    {
      id: "robotics",
      title: "Adversarial Contingency Auctions",
      keywords: ["auctions", "adversarial", "contingency", "robotics", "robot", "multi-agent", "allocation", "planning", "bidding", "belief", "path"],
      text: "Built Adversarial Contingency Auctions (Apr-May 2026) (https://github.com/mrinal22258/Adversarial-Contingency-Auctions). A decentralized multi-robot task allocation algorithm combining contingency games, inconsistent-belief auction dynamics, and adversarial path-blockages. It simulates heterogeneous robots (scouts/heavy lifters) completing dynamic tasks in a graph world. It lets robots bid on backup branches (contingencies), lowering mission failure rate by 40% under path blockages."
    },
    {
      id: "abuse",
      title: "Indic Abuse Detection",
      keywords: ["abuse", "indic", "indic language", "multilingual", "tamil", "hindi", "tweets", "roberta", "bilstm", "nlp", "f1", "benchmark", "icon"],
      text: "Created Multilingual Indic Abuse Detection model (Feb-Apr 2025) (https://github.com/mrinal22258/NLP). An end-to-end deep learning PyTorch pipeline solving the Shared Task in Indian English (en), Hindi (hi), and Tamil (ta). It uses majority-voting over annotator inputs and emoji translation. By leveraging XLM-RoBERTa-base + CNN-BiLSTM sequence filters, it achieved a verified Kaggle Macro F1 score of 0.67771, outperforming the competition public benchmark of 0.61604 by over 6%."
    },
    {
      id: "skills",
      title: "Technical Skills",
      keywords: ["skills", "languages", "python", "cpp", "java", "sql", "haskell", "ml", "deep learning", "agents", "spark", "hadoop", "techstack", "tools", "databases", "programming"],
      text: "Languages (Python, C++, Java, Haskell, SQL), AI/ML (GenAI, Agents, NLP, RAG, LangChain, LangGraph), Data Infra (FAISS, Vector DBs, Neo4j, Spark, Hadoop)."
    },
    {
      id: "certifications",
      title: "Certifications",
      keywords: ["certifications", "certs", "anthropic", "micro1", "haskell", "self driving", "toronto", "helsinki", "mooc", "credential"],
      text: "Certifications include: Anthropic 8+ AI Certifications, Micro1 AI Certified Engineer 2026, Self Driving Cars (Toronto), and Functional Programming I & II (Helsinki)."
    },

    {
      id: "honors",
      title: "Honors & Leadership",
      keywords: ["honors", "awards", "positions", "sherlocked", "math", "evariste", "music", "audiobytes", "odyssey", "hackathon", "guitarist"],
      text: "Honors: 3rd place LSR Sherlocked Enigma '25, Math Club Evariste Core Coordinator, guitarist in Audiobytes Music Club, and Odyssey Fest events coordinator."
    },
    {
      id: "portfolio_structure",
      title: "Portfolio Guide & Navigation",
      keywords: ["portfolio", "website", "pages", "where", "what", "nav", "navigation", "find", "located", "home", "about", "experience", "projects", "skills", "certifications", "contact", "site", "structure", "page"],
      text: "This portfolio website is organized into several sections:\n• **Home** (/): Welcome landing page with interactive scrap-style route cards.\n• **About** (/about): Scanned spiral notebook containing Kumar's story, objective, education, and photo album.\n• **Experience** (/experience): Timeline listing Crawl4AI contributions and research assistant roles at IIIT Delhi.\n• **Projects** (/projects): Filterable projects search. Click any project card to open its detail page.\n• **Skills** (/skills): Grouped capsules showing Python, C++, Haskell, PyTorch, FAISS, and GenAI tags.\n• **Certifications** (/certifications): Verify credentials from Anthropic, Micro1, University of Toronto, and Helsinki."
    }
  ];

  // Initialize chatbot
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: "Hi! I'm Kumar Mrinal's local AI assistant. Ask me questions like 'what did he do in Crawl4AI?', 'tell me about his research', or 'what languages does he know?'."
      }
    ]);
  }, []);

  // Auto-scroll chat history
  useEffect(() => {
    try {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      chatEndRef.current?.scrollIntoView();
    }
  }, [messages]);

  // Client-side local QA engine inspired by Tencent WeKnora hybrid RAG & Graph classification routing
  const handleQuery = (queryText: string, currentHistory: Message[]) => {
    try {
      const normalized = queryText.toLowerCase().trim();
      
      // 1. WeKnora-inspired Agent Logging
      const thinkingSteps = ["[WeKnora-Agent] Initializing reasoning loop...", `[User input]: "${queryText}"`];

      // Filter out filler/stop words to prevent common question words from matching intent synonyms or key terms
      const stopWordsForIntent = [
        "what", "how", "where", "who", "when", "why", "which", "the", "a", "an", "is", "are", 
        "can", "you", "your", "to", "in", "on", "at", "for", "with", "his", "her", "him", 
        "their", "he", "she", "it", "me", "i", "my", "this", "that", "all", "do", "did", 
        "does", "get", "go", "be", "of", "and", "or", "but", "have", "has", "about", 
        "should", "would", "could", "us", "we"
      ];

      const words = normalized.split(/\s+/)
        .map(w => w.replace(/[^a-z0-9]/g, ""))
        .filter(w => w.length > 0 && !stopWordsForIntent.includes(w));

      // Context resolution: Check if the user references previous bot responses (e.g. "i only asked top 2", "first two only")
      const lastBotMessage = currentHistory.length >= 2 
        ? currentHistory[currentHistory.length - 2]
        : null;

      if (lastBotMessage && (normalized.includes("only") || normalized.includes("just asked") || normalized.includes("top 2") || normalized.includes("first two") || normalized.includes("reduce") || normalized.includes("limit") || normalized.includes("instead") || normalized.includes("show me"))) {
        thinkingSteps.push("🔄 Contextual reference detected: User filtering previous list output.");
        // Parse bullets from previous message
        const bulletLines = lastBotMessage.text.split("\n").filter(line => line.trim().startsWith("•") || line.trim().startsWith("-"));
        if (bulletLines.length > 0) {
          thinkingSteps.push(`📋 Retrieved ${bulletLines.length} list items from history context.`);
          
          // Semantic matching inside bullets using query tokens
          const matchedBullets = bulletLines.filter(bullet => {
            const lowerBullet = bullet.toLowerCase();
            return words.some(token => lowerBullet.includes(token));
          });

          if (matchedBullets.length > 0) {
            thinkingSteps.push(`🎯 Filter matched ${matchedBullets.length} bullets matching search tokens.`);
            const reply = `Here are the matching details:\n\n${matchedBullets.join("\n\n")}`;
            setMessages(prev => [...prev, { sender: 'bot', text: reply, thinking: thinkingSteps.join("\n") }]);
            return;
          }

          // Default to slice length if no specific keywords matched
          const limitCount = normalized.includes("2") || normalized.includes("two") ? 2 : 1;
          const filteredBullets = bulletLines.slice(0, limitCount).join("\n\n");
          const reply = `My apologies! Here is what you requested:\n\n${filteredBullets}`;
          thinkingSteps.push("🤖 Sliced context response.");
          setMessages(prev => [...prev, { sender: 'bot', text: reply, thinking: thinkingSteps.join("\n") }]);
          return;
        }
      }

      // 2. Fuzzy Intent Matching (typo tolerant)
      let intent: string | null = null;
      
      const levenshtein = (a: string, b: string): number => {
        const matrix = [];
        for (let i = 0; i <= a.length; i++) {
          matrix[i] = [i];
        }
        for (let j = 0; j <= b.length; j++) {
          matrix[0][j] = j;
        }
        for (let i = 1; i <= a.length; i++) {
          for (let j = 1; j <= b.length; j++) {
            matrix[i][j] = Math.min(
              matrix[i - 1][j] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
            );
          }
        }
        return matrix[a.length][b.length];
      };

      const checkFuzzy = (words: string[], targets: string[]) => {
        return words.some(w => targets.some(t => {
          if (w.includes(t) || t.includes(w)) return true;
          const dist = levenshtein(w, t);
          const allowed = Math.max(2, Math.floor(t.length * 0.4));
          return dist <= allowed;
        }));
      };

      thinkingSteps.push(`🔍 Cleaned tokens for intent classification: [${words.join(', ')}]`);

      const identitySyns = ["mrinal", "kumar", "yourself", "urslef", "yourslef", "profile", "contact", "email", "github", "linkedin", "contact", "info", "website"];
      const educationSyns = ["education", "college", "iiit", "iiitd", "delhi", "btech", "degree", "csai", "qualification", "qualifications", "qulifications", "academics", "gpa", "grades", "study", "studied"];
      const experienceSyns = ["experience", "work", "job", "career", "employment", "history", "crawled", "crawl4ai", "research", "neuroscience", "ciphers", "researcher"];
      const projectsSyns = ["projects", "project", "built", "engineered", "designed", "aegisrag", "auctions", "robots", "indic", "abuse", "detection", "f1", "icon", "ptojecrs", "projct"];
      const skillsSyns = ["skills", "languages", "python", "cpp", "haskell", "java", "sql", "ml", "deep learning", "nlp", "tools", "databases", "programming"];
      const certsSyns = ["certification", "certifications", "certs", "anthropic", "micro1", "mooc"];
      const honorsSyns = ["honors", "awards", "sherlocked", "math", "music", "audiobytes", "coordinator"];
      const portfolioSyns = ["portfolio", "website", "pages", "nav", "navigation", "located", "find", "page", "site", "sections", "structure", "repo", "repository"];

      // Check specific/unique routes first before general identity checks
      if (checkFuzzy(words, certsSyns)) {
        intent = "certifications";
        thinkingSteps.push("🎯 Target classified (Fuzzy match): CERTIFICATIONS");
      } else if (checkFuzzy(words, educationSyns)) {
        intent = "education";
        thinkingSteps.push("🎯 Target classified (Fuzzy match): EDUCATION / QUALIFICATIONS");
      } else if (checkFuzzy(words, experienceSyns)) {
        intent = "experience";
        thinkingSteps.push("🎯 Target classified (Fuzzy match): EXPERIENCE");
      } else if (checkFuzzy(words, projectsSyns)) {
        intent = "projects";
        thinkingSteps.push("🎯 Target classified (Fuzzy match): PROJECTS");
      } else if (checkFuzzy(words, skillsSyns)) {
        intent = "skills";
        thinkingSteps.push("🎯 Target classified (Fuzzy match): SKILLS");
      } else if (checkFuzzy(words, honorsSyns)) {
        intent = "honors";
        thinkingSteps.push("🎯 Target classified (Fuzzy match): HONORS / AWARDS");
      } else if (checkFuzzy(words, portfolioSyns)) {
        intent = "portfolio";
        thinkingSteps.push("🎯 Target classified (Fuzzy match): PORTFOLIO / SITE STRUCTURE");
      } else if (checkFuzzy(words, identitySyns)) {
        intent = "identity";
        thinkingSteps.push("🎯 Target classified (Fuzzy match): IDENTITY");
      }

      // Check if a specific limit count is requested (e.g. "top 2 projects", "2 best projects")
      let limitCount = 0;
      if (normalized.includes("2 ") || normalized.includes(" two") || normalized.includes(" 2")) {
        limitCount = 2;
        thinkingSteps.push("🔢 Slice size filter detected: 2 items requested.");
      } else if (normalized.includes("1 ") || normalized.includes(" one") || normalized.includes(" 1")) {
        limitCount = 1;
        thinkingSteps.push("🔢 Slice size filter detected: 1 item requested.");
      }

      let reply = "";
      if (intent === "identity") {
        thinkingSteps.push("🔗 Graph connections: ['identity']");
        reply = "Kumar Mrinal is an AI/ML Engineer, NLP Researcher, and Agentic AI Builder graduating from IIIT Delhi in June 2026. You can contact him via email at mrinal22258@iiitd.ac.in, view his code repositories at github.com/mrinal22258, or follow his professional updates on LinkedIn at linkedin.com/in/krmrinal/.";
      } 
      else if (intent === "education") {
        thinkingSteps.push("🔗 Graph connections: ['education', 'skills']");
        reply = "Kumar's educational qualifications include:\n\n• **B.Tech in Computer Science and Artificial Intelligence (CSAI)** at IIIT Delhi, active from November 2022 to June 2026.\n\n• **Core Academic Focus**: Deep learning pipelines, multilingual NLP models, vector database lookups (FAISS), and multi-agent systems.";
      } 
      else if (intent === "experience") {
        thinkingSteps.push("🔗 Graph connections: ['crawl4ai', 'research']");
        const items = [
          "**Open Source Contributor for Crawl4AI (July 2026)**: Patched lxml build install conflicts under Python 3.14/Poetry, merged upstream.",
          "**Undergraduate Researcher at IIIT Delhi (Jan 2025 - Present)**: Designed CNN-BiLSTM electrophysiology decoders for ganglion cells and built lightweight cipher cryptanalysis models at 74% accuracy."
        ];
        const sliced = limitCount > 0 ? items.slice(0, limitCount) : items;
        reply = "Kumar's core research and R&D experiences include:\n\n" + sliced.map(it => `• ${it}`).join("\n\n");
      } 
      else if (intent === "projects") {
        thinkingSteps.push("🔗 Graph connections: ['aegisrag', 'robotics', 'abuse']");
        const items = [
          "**AegisRag-Engine (Jun 2026)**: An air-gapped, local enterprise RAG pipeline utilizing FAISS vector lookups and LangChain for highly secure local document QA.",
          "**Adversarial Contingency Auctions (2026)**: A decentralized multi-agent robot allocation algorithm incorporating inconsistent beliefs and branch bidding.",
          "**Gendered Abuse Detection (2025)**: An Indic multilingual NLP model (XLM-RoBERTa + CNN-BiLSTM) scoring a 0.67771 Macro F1 on the ICON shared-task benchmark."
        ];
        const sliced = limitCount > 0 ? items.slice(0, limitCount) : items;
        reply = `Kumar has developed ${sliced.length} core AI/ML projects:\n\n` + sliced.map(it => `• ${it}`).join("\n\n");
      } 
      else if (intent === "skills") {
        thinkingSteps.push("🔗 Graph connections: ['skills']");
        reply = "Kumar's technical skills include:\n\n" +
                "• **Languages**: Python, C++, Java, Haskell, SQL\n" +
                "• **AI/ML**: Generative AI, RAG platforms (LangChain, LangGraph), Multilingual NLP, Neural Electrophysiology\n" +
                "• **Data Infrastructure**: FAISS Vector DB, Neo4j, Apache Spark, Hadoop\n\n" +
                "Check the `/skills` page to interact with the 3D Cyberpunk Skill Globe!";
      } 
      else if (intent === "certifications") {
        thinkingSteps.push("🔗 Graph connections: ['certifications']");
        reply = "Kumar's qualifications and certs include: Anthropic (8+ certifications), Micro1 AI Certified Engineer 2026, Self-Driving Cars specialization (University of Toronto), and Haskell Functional Programming (Helsinki). Check the `/certifications` page to see details.";
      } 
      else if (intent === "honors") {
        thinkingSteps.push("🔗 Graph connections: ['honors']");
        reply = "Kumar's awards include: 3rd place LSR Sherlocked Enigma '25, core coordinator of Math Club Evariste, Audiobytes music club guitarist, and Odyssey Fest events coordinator.";
      } 
      else if (intent === "portfolio") {
        thinkingSteps.push("🔗 Graph connections: ['portfolio_structure']");
        reply = "This portfolio website is organized into several sections:\n\n" +
                "• **Home** (/): Welcome landing page with interactive scrap-style route cards.\n" +
                "• **About** (/about): Scanned spiral notebook containing Kumar's story, objective, education, and photo album.\n" +
                "• **Experience** (/experience): Timeline listing Crawl4AI contributions and research assistant roles at IIIT Delhi.\n" +
                "• **Projects** (/projects): Filterable projects search. Click any project card to open its detail page.\n" +
                "• **Skills** (/skills): Rotating 3D Cyberpunk Skill Globe containing interactive tool tags.\n" +
                "• **Certifications** (/certifications): Verify credentials from Anthropic, Micro1, University of Toronto, and Helsinki.";
      }
      else {
        // 4. LongExtract-inspired Context Needle Extraction Engine
        thinkingSteps.push("🔬 [LongExtract Engine] Initiating sentence-level context extraction...");
        const stopWords = ["what", "did", "do", "in", "is", "about", "his", "he", "who", "tell", "me", "the", "know", "how", "does", "have", "any", "good", "can", "you", "your", "get", "to", "where"];
        const queryTokens = normalized.split(/\s+/).filter(word => !stopWords.includes(word) && word.length > 1);

        thinkingSteps.push(`🔎 Matching needles against query tokens: [${queryTokens.join(', ')}]`);

        // Score chunks to locate the relevant "haystacks"
        const matchedHaystacks: { chunk: typeof resumeChunks[0]; score: number }[] = [];
        resumeChunks.forEach(chunk => {
          let score = 0;
          queryTokens.forEach(token => {
            // Exact keyword hit
            chunk.keywords.forEach(kw => {
              if (kw === token) score += 30;
              else if (kw.includes(token) || token.includes(kw)) score += 12;
            });
            if (chunk.text.toLowerCase().includes(token)) score += 10;
          });

          if (score > 12) {
            matchedHaystacks.push({ chunk, score });
          }
        });

        // Sort haystacks by relevance score
        matchedHaystacks.sort((a, b) => b.score - a.score);

        if (matchedHaystacks.length > 0) {
          thinkingSteps.push(`📚 Found ${matchedHaystacks.length} candidate haystacks. Extracting key sentences...`);
          
          // Extract relevant sentences ("needles") across matched chunks
          const extractedNeedles: string[] = [];
          const limit = limitCount > 0 ? limitCount : 3;

          matchedHaystacks.slice(0, limit).forEach(({ chunk }) => {
            // Split chunk text into sentences (lookbehind-free for browser compatibility)
            const sentences = chunk.text.match(/[^.!?]+[.!?]*/g)?.map(s => s.trim()) || [chunk.text];
            const chunkNeedles: string[] = [];

            sentences.forEach(sentence => {
              const lowerSentence = sentence.toLowerCase();
              // Check if sentence contains any of the search tokens
              const hasToken = queryTokens.some(token => lowerSentence.includes(token));
              if (hasToken) {
                chunkNeedles.push(sentence.trim());
              }
            });

            // Fallback to the whole text if no specific sentence contains the query tokens
            if (chunkNeedles.length > 0) {
              thinkingSteps.push(`📍 Extracted ${chunkNeedles.length} target needles from: "${chunk.title}"`);
              extractedNeedles.push(`**${chunk.title}**:\n${chunkNeedles.join(' ')}`);
            } else {
              thinkingSteps.push(`📍 Extracted full segment from: "${chunk.title}"`);
              extractedNeedles.push(`**${chunk.title}**:\n${chunk.text}`);
            }
          });

          reply = `Here is the extracted information:\n\n` + extractedNeedles.map(n => `• ${n}`).join("\n\n");
          thinkingSteps.push("✅ Needle extraction complete.");
        } else {
          thinkingSteps.push("❌ Zero node overlaps found above safety score threshold.");
          reply = "I couldn't extract any matching details from my local index. Try asking about his Crawl4AI open-source contribution, research projects (Neural Cryptanalysis / Electrophysiology), or tech skills!";
        }
      }

      thinkingSteps.push("✅ Process complete. Returning conversation state.");
      setMessages(prev => [...prev, { sender: 'bot', text: reply, thinking: thinkingSteps.join("\n") }]);
    } catch (error) {
      console.error("Error in chatbot QA engine:", error);
      const reply = "Sorry, I encountered an error processing your query. Please try again!";
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          thinking: "Error context:\n" + (error instanceof Error ? error.message : String(error))
        }
      ]);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');

    const updatedHistory = [...messages, { sender: 'user' as const, text: userText }];
    setMessages(updatedHistory);

    setTimeout(() => {
      handleQuery(userText, updatedHistory);
    }, 400);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        sender: 'bot',
        text: "Conversation cleared. Ask me anything about Kumar Mrinal's background!"
      }
    ]);
  };

  return (
    <div className="fixed bottom-28 right-6 z-[9999] flex flex-col items-end">
      
      {/* Toggled chat panel */}
      {isOpen && (
        <div 
          className="w-[320px] md:w-[380px] h-[520px] border-4 border-pink-200 dark:border-gray-700 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden mb-4 transform scale-100 transition-transform origin-bottom-right"
          style={{
            backgroundColor: isDarkMode ? '#1e293b' : '#FFFFFF',
            backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(254, 245, 245, 0.1) 0%, transparent 100%)'
          }}
        >
          {/* Lined notebook paper background for panel */}
          <div className="absolute inset-0 bg-[linear-gradient(#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(#374151_1px,transparent_1px)] bg-[size:100%_2.5rem] opacity-10 pointer-events-none rounded-3xl" />

          {/* Header */}
          <div 
            className="p-4 border-b-2 border-pink-100 dark:border-gray-800 flex items-center justify-between relative z-20"
            style={{
              background: `linear-gradient(135deg, 
                ${isDarkMode ? '#0f172a' : themeColors.colors.pink[50]}, 
                ${isDarkMode ? '#1e293b' : '#ffffff'})`
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-pink-500 animate-pulse" />
              <h3 className="text-sm font-bold text-pink-800 dark:text-pink-300 font-sans" style={{ fontFamily: "'DK Crayonista', cursive" }}>
                Ask AI Mrinal (WeKnora RAG)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleClearHistory}
                title="Clear conversation"
                className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-gray-400 hover:text-pink-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Warning Notice for client side RAG */}
          {showNotice && (
            <div className="bg-pink-50/70 dark:bg-gray-800/80 border-b border-pink-100 dark:border-gray-800 px-3 py-2 flex items-start gap-2 text-[10px] text-gray-500 dark:text-gray-400 relative z-20">
              <AlertCircle className="h-3.5 w-3.5 text-pink-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 pr-4">
                Runs entirely in your browser — zero server calls, offline secure intelligence.
              </div>
              <button onClick={() => setShowNotice(false)} className="text-gray-400 hover:text-pink-500">
                ✕
              </button>
            </div>
          )}

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm whitespace-pre-line ${
                    msg.sender === 'user' 
                      ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-800 dark:text-pink-200 rounded-tr-none' 
                      : 'bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-200 rounded-tl-none border border-pink-50 dark:border-gray-800'
                  }`}
                >
                  {/* Thought trace expander for bot responses */}
                  {msg.sender === 'bot' && msg.thinking && (
                    <details className="mb-2.5 text-[10px] text-gray-400 dark:text-gray-400 font-mono border-l-2 border-pink-300 dark:border-pink-500 pl-2 select-none cursor-pointer">
                      <summary className="hover:text-pink-500 font-semibold transition-colors">🔍 Thought Trace (WeKnora Engine)</summary>
                      <div className="mt-1.5 space-y-0.5 whitespace-pre-wrap font-mono text-[9px] bg-black/5 dark:bg-black/20 p-1.5 rounded">
                        {msg.thinking}
                      </div>
                    </details>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <form 
            onSubmit={handleSend}
            className="p-3 border-t-2 border-pink-100 dark:border-gray-800 flex gap-2 relative z-20"
            style={{ backgroundColor: isDarkMode ? '#0f172a' : '#FFFFFF' }}
          >
            <input
              type="text"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-pink-300"
              style={{
                backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.6)' : '#FFFFFF',
                borderColor: isDarkMode ? '#374151' : themeColors.colors.pink[100],
                color: isDarkMode ? '#FFFFFF' : '#000000'
              }}
            />
            <button 
              type="submit" 
              className="p-2.5 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating button trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 hover:rotate-12 border-2"
        style={{
          backgroundColor: isOpen ? '#9ca3af' : themeColors.colors.pink[500],
          borderColor: isDarkMode ? '#374151' : '#FFFFFF',
          color: '#FFFFFF'
        }}
        aria-label="Open AI chatbot"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6 animate-pulse" />}
      </button>

    </div>
  );
};

export default FloatingChatbot;
