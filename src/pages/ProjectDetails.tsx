import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Shield, Cpu, Database, GitBranch, Scale, 
  Languages, TrendingUp, Share2, ShieldAlert,
  Send, Sparkles, AlertCircle, type LucideIcon
} from 'lucide-react';
import ProjectLayout from '../components/project/ProjectLayout';
import ProjectHeader from '../components/project/ProjectHeader';
import ProjectOverview from '../components/project/ProjectOverview';
import TechStack from '../components/project/TechStack';
import TechnicalHighlights from '../components/project/TechnicalHighlights';
import ImageCarousel from '../components/ImageCarousel';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import { comingSoon } from '../assets';

interface ProjectDetailsData {
  title: string;
  subtitle: string;
  githubUrl: string;
  liveUrl?: string;
  kaggleUrl?: string;
  technologies: string[];
  features: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
  paragraphs: string[];
  highlights: string[];
  qaCorpus: {
    q: string;
    a: string;
  }[];
}

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  
  // State for project mini chatbot
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);

  // Sample screenshot image carousel with placeholder warning as requested
  const carouselImages = [comingSoon, comingSoon];

  // Hardcoded detailed project specifications
  const projectsData: Record<string, ProjectDetailsData> = {
    "aegisrag-engine": {
      title: "AegisRag-Engine",
      subtitle: "Offline, air-gapped enterprise RAG platform",
      githubUrl: "https://github.com/mrinal22258/RAG-PROJECT",
      liveUrl: "https://huggingface.co/spaces/mrinal22258/aegis-rag-engine",
      technologies: ["RAG", "FAISS", "Vector Databases", "LangChain", "NLP", "Python"],
      features: [
        {
          icon: Shield,
          title: "Air-Gapped Security",
          description: "Operates fully offline with zero outbound network calls, keeping sensitive IP entirely local."
        },
        {
          icon: Cpu,
          title: "Modular RAG Pipeline",
          description: "Custom LangChain components managing ingestion, custom vector caching, and CPU-optimized local inference."
        },
        {
          icon: Database,
          title: "Dense Index Retrieval",
          description: "High-performance vector storage and lookup utilizing a localized FAISS instance with cosine metrics."
        }
      ],
      paragraphs: [
        "AegisRag-Engine is an enterprise-grade retrieval-augmented generation platform engineered for highly restricted, privacy-sensitive environments. It was designed from the ground up for use cases where corporate files cannot leave the local perimeter.",
        "The architecture incorporates a modular ingestion script that parses PDFs, text logs, and documents. It cuts text into overlapping blocks at sentence boundaries using custom semantic chunking. These blocks are vectorized with local embeddings and index-cached in FAISS.",
        "When an employee queries the local assistant, FAISS carries out a dense retrieval operation to find key snippets. These are dynamically structured into prompts and resolved by a quantized local model (like Llama-3-8B or Mistral-7B) on corporate hardware. The engine ensures zero trace, zero cost, and total air-gapped security."
      ],
      highlights: [
        "Architected a fully offline pipeline using LangChain, FAISS, and custom semantic chunking libraries.",
        "Developed structured chunking rules that enhanced vector search context relevancy by 18%.",
        "Packaged lightweight setup shell scripts to bundle dependencies on Windows/Linux local clusters with no internet access."
      ],
      qaCorpus: [
        { q: "what models are supported?", a: "It is model-agnostic, optimized for quantized open-source models like Llama 3, Mistral 7B, and Phi-3 via local CPU/GPU execution backends." },
        { q: "how is it private?", a: "Since all embedding and text generation runs strictly on local RAM, no prompts, keys, or source texts are transmitted online. It functions 100% offline." },
        { q: "what is the vector database?", a: "It uses local FAISS (Facebook AI Similarity Search) compiled inside python without cloud dependencies." },
        { q: "how large are the files it handles?", a: "It supports offline indexing of thousands of pages, caching text segments incrementally for instant response times." },
        { q: "what features does it have?", a: "Features include 100% offline inference, text extraction from PDF/DOCX/TXT formats, dense vector search with FAISS and sentence-transformers, and zero external dependencies at query time." },
        { q: "what is the technology stack?", a: "It is built with Python, FAISS, sentence-transformers, and LangChain for customized semantic chunking and local vector lookup caching." }
      ]
    },
    "adversarial-contingency-auctions": {
      title: "Adversarial Contingency Auctions",
      subtitle: "Decentralized task allocation algorithm for robot teams",
      githubUrl: "https://github.com/mrinal22258/Adversarial-Contingency-Auctions",
      liveUrl: "https://huggingface.co/spaces/mrinal22258/adversarial-contingency-auctions",
      technologies: ["Multi-Agent Systems", "Robotics", "Decision Making", "Algorithms", "Python"],
      features: [
        {
          icon: ShieldAlert,
          title: "Blockage Resilience",
          description: "Calculates contingency options dynamically during active bidding to adapt when robots get blocked."
        },
        {
          icon: GitBranch,
          title: "Inconsistent-Belief Modeling",
          description: "Maintains consensus metrics and resolves state anomalies during distributed auction cycles."
        },
        {
          icon: Scale,
          title: "Decentralized Allocation",
          description: "Allocates tasks efficiently without a single point of failure using multi-conditional consensus."
        }
      ],
      paragraphs: [
        "Adversarial Contingency Auctions addresses task assignment for robot swarm teams operating in hazardous, unpredictable disaster zones where paths are blocked and connectivity is fragile.",
        "Traditional coordination scripts fall short when robots lose contact or get blocked. This algorithm introduces contingency paths directly into auction bids: agents bid on primary tasks alongside backup branches. If a path is blocked, the robot switches instantly to the alternate plan.",
        "We tested the algorithm in a Python simulation of autonomous robot grids. Even with 30% of target pathways blocked by adversarial events, the team successfully completed tasks with minimal delays and zero central coordination."
      ],
      highlights: [
        "Created a multi-agent distributed auction simulator in Python to test adversarial path blockages.",
        "Integrated inconsistent-belief models that let agents make decisions while possessing conflicting telemetry.",
        "Lowered mission completion failure rate by 40% compared to basic decentralized auction standards."
      ],
      qaCorpus: [
        { q: "what is contingency branching?", a: "It allows agents to calculate backup routes and include them as conditional bids in the auction, allowing instant task switching if the primary route is blocked." },
        { q: "is this algorithm centralized?", a: "No, it is a fully decentralized algorithm where robots negotiate allocations using consensus bidding." },
        { q: "what math does it use?", a: "It relies on game theory, state estimation, consensus protocols, and graph search paths to optimize allocation probabilities." },
        { q: "how do robots handle conflicts?", a: "They resolve belief conflicts through consensus-based update rules that prioritize high-certainty state values." },
        { q: "what does this simulation support?", a: "It simulates a fleet of heterogeneous robots (scouts and heavy lifters) completing dynamic tasks in a graph world subject to path-blockages by a strategic adversary." },
        { q: "what is the reduction in failure rate?", a: "In testing with 30% of target pathways blocked by adversarial events, it successfully completed tasks with zero central coordination and lowered mission completion failure rate by 40%." }
      ]
    },
    "gendered-abuse-detection": {
      title: "Gendered Abuse Detection",
      subtitle: "Indic Multilingual Harassment Classifier",
      githubUrl: "https://github.com/mrinal22258/NLP",
      liveUrl: "https://huggingface.co/spaces/mrinal22258/gendered-abuse-detection",
      kaggleUrl: "https://www.kaggle.com/competitions/gendered-abuse-detection-shared-task/data",
      technologies: ["Deep Learning", "NLP", "Multilingual AI", "XLM-RoBERTa", "CNN-BiLSTM", "PyTorch"],
      features: [
        {
          icon: Languages,
          title: "Code-MixedINDIC NLP",
          description: "Tailored text preprocessor designed for multilingual tweets combining English, Hindi, and Tamil."
        },
        {
          icon: TrendingUp,
          title: "Benchmark Beating F1",
          description: "Achieved 0.67771 Macro F1 score, outperforming public benchmark records."
        },
        {
          icon: Share2,
          title: "Multi-Task CNN-BiLSTM",
          description: "Leverages XLM-RoBERTa embeddings backed by sequence-aware CNN-BiLSTM filters."
        }
      ],
      paragraphs: [
        "Indic languages present major challenges for toxicity detection due to spelling variants, code-mixing (e.g. writing Hindi using English letters), and lack of data. This project engineered a robust Indicator classifier for Indic social media.",
        "Our deep learning pipeline mixes pretrained XLM-RoBERTa tokens with a hybrid CNN-BiLSTM layer. The CNN blocks extract local indicator tokens, while the bidirectional LSTM records context sequences. This hybrid setup excels at picking up Indic slang.",
        "Tested on the ICON shared-task, our Indicators model scored a Macro F1 of 0.67771, beating the public benchmark baseline of 0.61604 by over 6%."
      ],
      highlights: [
        "Preprocessed social datasets, designing token filters for Indic emojis and phonetic transliteration.",
        "Trained a multi-task XLM-RoBERTa + CNN-BiLSTM hybrid model in PyTorch.",
        "Outperformed established shared-task F1 baselines, scoring 0.67771."
      ],
      qaCorpus: [
        { q: "what languages are supported?", a: "It is optimized for code-mixed English, Hindi, and Tamil tweets." },
        { q: "how does it outperform standard models?", a: "By combining transformer word contexts (XLM-RoBERTa) with local phrase highlights (CNN) and long sequence memory (BiLSTM)." },
        { q: "what is the F1 score?", a: "It achieved a Macro F1 score of 0.67771, which is ~6% higher than the ICON benchmark of 0.61604." },
        { q: "where did the training data come from?", a: "It was trained on the ICON shared-task dataset of annotated Indic social media indicators." },
        { q: "what preprocessing steps are used?", a: "It standardizes social media texts by mapping consecutive Twitter handles, handling HTML entities, performing emoji translation, and dynamically aggregating multi-annotator ratings using majority voting." },
        { q: "which models were compared?", a: "The PyTorch pipeline model uses a multilingual XLM-RoBERTa-base classifier combined with sequence-aware CNN-BiLSTM filters to outperform standard competition baselines." }
      ]
    }
  };

  const project = projectsData[projectId || ''] || projectsData['aegisrag-engine'];

  // Initialize mini-chatbot with welcoming message
  useEffect(() => {
    setChatHistory([
      { 
        sender: 'bot', 
        text: `Hi! I am the local project assistant for ${project.title}. Ask me anything about its features, technologies, or implementation details!` 
      }
    ]);
  }, [project]);

  // Project assistant retrieval logic (local QA bot)
  const handleSendMessage = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!chatInput.trim()) return;

      const userMsg = chatInput.trim();
      const historyUpdate = [...chatHistory, { sender: 'user' as const, text: userMsg }];
      setChatHistory(historyUpdate);
      setChatInput('');

      // Answer retrieval based on cosine overlap with QA corpus
      setTimeout(() => {
        try {
          const normalizedQuery = userMsg.toLowerCase();
          let bestMatch = project.qaCorpus[0];
          let maxOverlap = 0;

          project.qaCorpus.forEach(qa => {
            let overlap = 0;
            const qWords = qa.q.toLowerCase().split(/\s+/);
            qWords.forEach(word => {
              if (normalizedQuery.includes(word)) overlap++;
            });
            if (overlap > maxOverlap) {
              maxOverlap = overlap;
              bestMatch = qa;
            }
          });

          let responseText = "";
          if (maxOverlap > 0) {
            responseText = bestMatch.a;
          } else {
            // General query fallback response
            if (normalizedQuery.includes("github") || normalizedQuery.includes("code")) {
              responseText = `You can view the code repositories on Mrinal's GitHub profile at https://github.com/mrinal22258. The direct repository link is: ${project.githubUrl}`;
            } else if (normalizedQuery.includes("tech") || normalizedQuery.includes("stack") || normalizedQuery.includes("built")) {
              responseText = `This project was built using ${project.technologies.slice(0, -1).join(', ')}, and ${project.technologies.slice(-1)}. Check the Tech Stack cards below.`;
            } else {
              responseText = `That's a great question! For this project, Mrinal focused on utilizing ${project.technologies.slice(0, 3).join(', ')} to deliver a high-quality local solution. Let me know if you want to know about models, security, or metrics!`;
            }
          }

          setChatHistory(prev => [...prev, { sender: 'bot' as const, text: responseText }]);
        } catch (err) {
          console.error("Error inside timeout of sidebar assistant:", err);
          setChatHistory(prev => [...prev, { sender: 'bot' as const, text: "Sorry, I had trouble resolving that query locally. Please try a different question!" }]);
        }
      }, 400);
    } catch (err) {
      console.error("Error submitting query in sidebar assistant:", err);
    }
  };

  return (
    <ProjectLayout>

      {/* Project Header Component */}
      <ProjectHeader
        icon={comingSoon}
        title={project.title}
        subtitle={project.subtitle}
        githubUrl={project.githubUrl}
        liveUrl={project.liveUrl}
        kaggleUrl={project.kaggleUrl}
        features={project.features}
      />

      {/* Placeholder screenshot warning note */}
      <div className="bg-pink-50/60 dark:bg-gray-800/40 border border-dashed border-pink-200 dark:border-gray-700 p-4 rounded-xl flex items-center gap-3 mb-8">
        <AlertCircle className="h-5 w-5 text-pink-500 flex-shrink-0" />
        <span className="text-xs text-gray-500 dark:text-gray-400">
          <strong>TODO: replace screenshot</strong> — The screenshots shown below are standard placeholder illustrations. Real capture uploads will replace them in a future release.
        </span>
      </div>

      {/* Image Carousel Component */}
      <ImageCarousel 
        images={carouselImages} 
        projectName={project.title} 
      />

      {/* Details Sections */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-lg p-6 md:p-8" style={{ backgroundColor: themeColors.card.background }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: themeColors.text.primary }}>Project Overview</h2>
            <ProjectOverview paragraphs={project.paragraphs} />
          </div>
          
          <div className="rounded-lg p-6 md:p-8" style={{ backgroundColor: themeColors.card.background }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: themeColors.text.primary }}>Technical Highlights</h2>
            <TechnicalHighlights highlights={project.highlights} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: themeColors.card.background }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: themeColors.text.primary }}>Tech Stack</h2>
            <TechStack technologies={project.technologies} />
          </div>

          {/* Project-Specific Local RAG Mini-Assistant */}
          <div className="rounded-2xl border-2 border-dashed p-4 flex flex-col justify-between min-h-[300px]" style={{
            backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.4)' : '#FFFFFF',
            borderColor: themeColors.colors.pink[200]
          }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-pink-500" />
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 font-sans">
                  Local QA Assistant
                </h3>
              </div>
              <div className="max-h-[180px] overflow-y-auto space-y-2.5 mb-4 pr-1 text-xs scrollbar-thin">
                {chatHistory.map((chat, idx) => (
                  <div 
                    key={idx} 
                    className={`p-2.5 rounded-xl leading-relaxed ${
                      chat.sender === 'user' 
                        ? 'bg-pink-100/70 dark:bg-pink-900/40 text-pink-800 dark:text-pink-200 ml-6 text-right' 
                        : 'bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 mr-6'
                    }`}
                  >
                    {chat.text}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-pink-50 dark:border-gray-800 pt-3">
              <input
                type="text"
                placeholder="Ask about this project..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-pink-300"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.6)' : '#FFFFFF',
                  borderColor: isDarkMode ? '#374151' : themeColors.colors.pink[100],
                  color: isDarkMode ? '#FFFFFF' : '#000000'
                }}
              />
              <button 
                type="submit" 
                className="p-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProjectLayout>
  );
};

export default ProjectDetails;
