import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { techStackIcons } from '../../assets/techstack';
import { SkillGlobe } from './SkillGlobe';

const Skills = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  // Grouped skills list with icon mappings
  const skillsData = [
    {
      category: "Programming",
      items: [
        { name: "Python", icon: null },
        { name: "SQL", icon: null },
        { name: "C++", icon: techStackIcons.CPP },
        { name: "Java", icon: techStackIcons.JavaLight },
        { name: "C", icon: techStackIcons.C },
        { name: "Haskell", icon: null }
      ]
    },
    {
      category: "AI/ML",
      items: [
        { name: "Machine Learning", icon: null },
        { name: "Deep Learning", icon: null },
        { name: "Generative AI", icon: null },
        { name: "Agentic AI", icon: null },
        { name: "LLMs", icon: null },
        { name: "NLP", icon: null },
        { name: "Computer Vision", icon: null },
        { name: "RAG", icon: null }
      ]
    },
    {
      category: "LLM Engineering",
      items: [
        { name: "LangChain", icon: null },
        { name: "LangGraph", icon: null },
        { name: "MCP (Model Context Protocol)", icon: null },
        { name: "AI Agents", icon: null },
        { name: "Function Calling", icon: null },
        { name: "Agent Orchestration", icon: null },
        { name: "Semantic Search", icon: null }
      ]
    },
    {
      category: "Data & Infra",
      items: [
        { name: "FAISS", icon: null },
        { name: "Vector Databases", icon: null },
        { name: "Neo4j", icon: null },
        { name: "Apache Spark", icon: null },
        { name: "Hadoop", icon: null }
      ]
    },
    {
      category: "Core CS & Math",
      items: [
        { name: "Data Structures & Algorithms", icon: null },
        { name: "Operating Systems", icon: null },
        { name: "DBMS", icon: null },
        { name: "Probability & Statistics", icon: null },
        { name: "Linear Algebra", icon: null }
      ]
    },
    {
      category: "Domains",
      items: [
        { name: "Quantitative Finance", icon: null },
        { name: "Robotics", icon: null },
        { name: "Multilingual AI", icon: null }
      ]
    }
  ];

  const flatSkills = React.useMemo(() => {
    return skillsData.flatMap(group => 
      group.items.map(item => ({
        name: item.name,
        category: group.category
      }))
    );
  }, []);

  return (
    <section id="skills" className="py-12 md:py-20 relative min-h-screen animate-fadeIn" style={{
      background: themeColors.background.sections?.skills || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <header className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4" style={{ 
            fontFamily: "'DK Crayonista', cursive",
            color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] 
          }}>
            Skills Directory
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: themeColors.text.secondary }}>
            Explore my engineering toolkit, math, and AI competencies interactively. Drag to rotate the holographic planet, hover to focus tags, and watch energy rays shoot out from the core.
          </p>
        </header>

        {/* Interactive 3D Skill Globe */}
        <div className="mb-8">
          <SkillGlobe skills={flatSkills} />
        </div>
      </div>
    </section>
  );
};

export default Skills;