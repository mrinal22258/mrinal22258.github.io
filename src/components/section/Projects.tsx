import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Code, Search, Sparkles, AlertCircle } from 'lucide-react';

// Kumar Mrinal's projects list
const projects = [
  {
    id: "aegisrag-engine",
    title: "AegisRag-Engine",
    period: "Jun 2026",
    description: "Offline, air-gapped enterprise RAG platform. Architected a fully offline pipeline (LangChain, FAISS) with modular semantic chunking and dense vector retrieval, built for privacy-sensitive enterprise environments where no external API calls are permitted.",
    technologies: ["RAG", "FAISS", "Vector Databases", "LangChain", "NLP", "Python"],
    detailsUrl: "/projects/aegisrag-engine",
    githubUrl: "https://github.com/mrinal22258/RAG-PROJECT",
    liveUrl: "https://huggingface.co/spaces/mrinal22258/aegis-rag-engine",
    // Keyword lists for semantic mapping
    semanticKeywords: [
      "rag", "offline", "enterprise", "air-gapped", "privacy", "langchain", "faiss", 
      "vector", "database", "retrieval", "chunking", "semantic", "local", "embedding",
      "search", "inference", "secure", "document"
    ]
  },
  {
    id: "adversarial-contingency-auctions",
    title: "Adversarial Contingency Auctions",
    period: "Apr - May 2026",
    description: "Decentralized multi-agent auction algorithm integrating contingency branching and inconsistent-belief modeling to handle adversarial blockages, enabling resilient task allocation for robot teams under uncertain, dynamically changing conditions.",
    technologies: ["Multi-Agent Systems", "Robotics", "Decision Making", "Algorithms", "Python"],
    detailsUrl: "/projects/adversarial-contingency-auctions",
    githubUrl: "https://github.com/mrinal22258/Adversarial-Contingency-Auctions",
    liveUrl: "https://huggingface.co/spaces/mrinal22258/adversarial-contingency-auctions",
    semanticKeywords: [
      "robotics", "robot", "multi-agent", "auctions", "adversarial", "contingency", 
      "branching", "belief", "decisions", "dynamic", "task allocation", "coordination",
      "agent", "planning", "decentralized"
    ]
  },
  {
    id: "gendered-abuse-detection",
    title: "Gendered Abuse Detection in Indic Languages",
    period: "Feb - Apr 2025",
    description: "Multilingual abuse-detection pipeline using preprocessing, multi-task learning, and XLM-RoBERTa/CNN-BiLSTM models for English, Hindi, and Tamil tweets. Achieved 0.67771 Macro F1, beating the ICON shared-task public benchmark of 0.61604.",
    technologies: ["Deep Learning", "NLP", "Multilingual AI", "XLM-RoBERTa", "CNN-BiLSTM", "PyTorch"],
    detailsUrl: "/projects/gendered-abuse-detection",
    githubUrl: "https://github.com/mrinal22258/NLP",
    liveUrl: "https://huggingface.co/spaces/mrinal22258/gendered-abuse-detection",
    kaggleUrl: "https://www.kaggle.com/competitions/gendered-abuse-detection-shared-task/data",
    semanticKeywords: [
      "abuse", "detection", "indic", "indic languages", "multilingual", "classification", 
      "hindi", "tamil", "tweets", "roberta", "bilstm", "cnn", "nlp", "benchmark", "f1",
      "deep learning", "shared-task", "preprocessing", "Indic NLP"
    ]
  }
];

const Projects = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const [searchQuery, setSearchQuery] = useState('');

  // Semantic query matcher simulating sentence embeddings on tags + text
  const rankedProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return projects.map(p => ({ ...p, score: 0 }));
    }

    const queryWords = searchQuery.toLowerCase().split(/\s+/).filter(w => w.length > 1);
    
    // Simple semantic synonym maps to bridge query terms to project concepts
    const synonymMap: Record<string, string[]> = {
      "ciphers": ["indic", "deep learning", "cnn-bilstm"],
      "cryptography": ["deep learning", "cnn-bilstm"],
      "security": ["air-gapped", "privacy", "adversarial", "secure"],
      "agents": ["multi-agent", "agent", "langchain"],
      "agentic": ["multi-agent", "agent", "langchain"],
      "database": ["vector", "faiss", "database"],
      "model": ["roberta", "bilstm", "cnn", "deep learning"],
      "neural": ["deep learning", "cnn-bilstm", "roberta"],
      "indic": ["multilingual", "indic", "hindi", "tamil", "nlp"],
      "language": ["multilingual", "indic", "nlp"],
      "robots": ["robotics", "robot", "multi-agent"],
      "path": ["branching", "planning", "contingency"],
      "search": ["retrieval", "faiss", "vector", "rag"],
      "privacy": ["offline", "air-gapped", "private"],
      "llm": ["rag", "langchain", "vector", "retrieval"]
    };

    return projects.map(project => {
      let score = 0;
      const textToSearch = `${project.title} ${project.description} ${project.technologies.join(' ')}`.toLowerCase();
      
      queryWords.forEach(word => {
        // Direct term match
        if (textToSearch.includes(word)) {
          score += 15;
        }

        // Keyword matches (higher weight)
        project.semanticKeywords.forEach(kw => {
          if (kw.includes(word) || word.includes(kw)) {
            score += 25;
          }
        });

        // Synonym expansions
        Object.entries(synonymMap).forEach(([key, values]) => {
          if (word.includes(key) || key.includes(word)) {
            values.forEach(val => {
              if (textToSearch.includes(val)) {
                score += 10;
              }
            });
          }
        });
      });

      // Normalize score to percentage
      const maxPossibleScore = queryWords.length * 50;
      const normalizedScore = maxPossibleScore > 0 ? Math.min(100, Math.round((score / maxPossibleScore) * 100)) : 0;

      return {
        ...project,
        score: normalizedScore
      };
    }).sort((a, b) => b.score - a.score);
  }, [searchQuery]);

  const hasSearchActive = searchQuery.trim().length > 0;

  return (
    <section id="projects" className="py-12 md:py-20 relative min-h-screen" style={{
      background: themeColors.background.sections?.projects || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <header className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4" style={{ 
            fontFamily: "'DK Crayonista', cursive",
            color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] 
          }}>
            Projects Gallery
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: themeColors.text.secondary }}>
            Explore the core technical products and research implementations I have engineered.
          </p>
        </header>

        {/* Semantic Search Box */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-hover:text-pink-400 transition-colors">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Semantic search (e.g., 'privacy air-gapped model' or 'robot team')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl border-2 font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pink-300"
              style={{
                backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.4)' : '#FFFFFF',
                borderColor: isDarkMode ? '#374151' : themeColors.colors.pink[100],
                color: isDarkMode ? themeColors.colors.white : themeColors.colors.dark[800]
              }}
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-pink-400/70">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
          </div>
          
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
            <span className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3 text-pink-400" />
              Ranks cards using client-side similarity overlap
            </span>
            {hasSearchActive && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-pink-500 hover:underline font-bold"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rankedProjects.map((project) => {
            const hasMatch = project.score > 0 || !hasSearchActive;
            
            return (
              <Card 
                key={project.id} 
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative flex flex-col justify-between overflow-hidden border-2`}
                style={{
                  backgroundColor: themeColors.card.background,
                  borderColor: hasSearchActive && project.score > 30 
                    ? themeColors.colors.pink[400] 
                    : (isDarkMode ? '#374151' : themeColors.card.border),
                  opacity: hasMatch ? 1 : 0.4,
                  transform: hasMatch ? 'scale(1)' : 'scale(0.98)'
                }}
              >
                {/* Score badge when searching */}
                {hasSearchActive && project.score > 0 && (
                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-pink-500 shadow-sm flex items-center gap-1 z-20">
                    <Sparkles className="h-3 w-3" />
                    {project.score}% Match
                  </div>
                )}

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-gray-700/60 px-2 py-0.5 rounded">
                      {project.period}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-pink-500 transition-colors" style={{
                    color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[800]
                  }}>
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 mt-2 text-sm leading-relaxed min-h-[72px]">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-2 flex flex-col justify-end mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-[10px] font-bold px-2 py-0.5 border"
                        style={{
                          backgroundColor: themeColors.interactive.primary,
                          color: themeColors.text.accent,
                          borderColor: themeColors.primary,
                        }}>
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-3 border-t border-pink-50 dark:border-gray-700">
                    <Link 
                      to={project.detailsUrl} 
                      className="project-btn flex items-center gap-1 px-4 py-2 text-xs text-white" 
                      style={{ textDecoration: 'none' }}
                    >
                      Details →
                    </Link>
                    {project.githubUrl !== "#" && (
                      <a 
                        href={project.githubUrl} 
                        className="project-btn-outline flex items-center gap-1 px-4 py-2 text-xs" 
                        style={{ textDecoration: 'none' }}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Code className="h-3.5 w-3.5" />
                        Code
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;