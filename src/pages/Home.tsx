import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Code2, Award, Mail, Sparkles } from 'lucide-react';
import AsciiMorphText from '../components/AsciiMorphText';
import TypewriterCarousel from '../components/TypewriterCarousel';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors, withAlpha } from '../hooks/useThemeColors';
import { stickers as stickerImages } from '../assets';
import { socialLinks } from '../config/socialLinks';

const fullAsciiArt = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢠⡾⠲⠶⣤⣀⣠⣤⣤⣤⡿⠛⠿⡴⠾⠛⢻⡆⠀⠀⠀
⠀⠀⠀⣼⠁⠀⠀⠀⠉⠁⠀⢀⣿⠐⡿⣿⠿⣶⣤⣤⣷⡀⠀⠀
⠀⠀⠀⢹⡶⠀⠀⠀⠀⠀⠀⠈⢯⣡⣿⣿⣀⣰⣿⣦⢂⡏⠀⠀
⠀⠀⢀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠹⣍⣭⣾⠁⠀⠀
⠀⣀⣸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣸⣧⣤⡀
⠈⠉⠹⣏⡁⠀⢸⣿⠀⠀⠀⢀⡀⠀⠀⠀⣿⠆⠀⢀⣸⣇⣀⠀
⠀⠐⠋⢻⣅⡄⢀⣀⣀⡀⠀⠯⠽⠂⢀⣀⣀⡀⠀⣤⣿⠀⠉⠀
⠀⠀⠴⠛⠙⣳⠋⠉⠉⠙⣆⠀⠀⢰⡟⠉⠈⠙⢷⠟⠈⠙⠂⠀
⠀⠀⠀⠀⠀⢻⣄⣠⣤⣴⠟⠛⠛⠛⢧⣤⣤⣀⡾⠀⠀⠀⠀⠀`;

const Home = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const [asciiText, setAsciiText] = useState('');

  const roles = [
    'AI/ML Engineer',
    'NLP Researcher',
    'Agentic AI Builder',
    'Open-Source Contributor',
  ];

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 3;
    const typeWriter = () => {
      if (currentIndex < fullAsciiArt.length) {
        setAsciiText(fullAsciiArt.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, typingSpeed);
      }
    };
    const startDelay = setTimeout(typeWriter, 500);
    return () => clearTimeout(startDelay);
  }, []);

  const navigationTiles = [
    {
      title: 'About Me',
      description: 'Explore my background, education at IIIT Delhi, and personal story in an interactive page-turning journal.',
      icon: BookOpen,
      path: '/about',
      stickerIndex: 0,
      rotate: '-2deg'
    },
    {
      title: 'Experience',
      description: 'Check my open-source work on Crawl4AI and deep learning research projects at IIIT Delhi.',
      icon: Briefcase,
      path: '/experience',
      stickerIndex: 1,
      rotate: '1.5deg'
    },
    {
      title: 'Projects',
      description: 'Browse my vector databases, offline RAG, Indic Indic language indicators, and NLP tools with semantic search.',
      icon: Code2,
      path: '/projects',
      stickerIndex: 2,
      rotate: '-1deg'
    },
    {
      title: 'Skills',
      description: 'Review my grouped technical skills across AI/ML, LLM engineering, programming, and CS foundations.',
      icon: Sparkles,
      path: '/skills',
      stickerIndex: 3,
      rotate: '2deg'
    },
    {
      title: 'Certifications & Honors',
      description: 'View professional AI credentials, university courses, and hackathon/society leadership awards.',
      icon: Award,
      path: '/certifications',
      stickerIndex: 4,
      rotate: '-1.5deg'
    },
    {
      title: 'Contact',
      description: 'Get in touch for collaborations, research opportunities, or software engineering queries.',
      icon: Mail,
      path: '/contact',
      stickerIndex: 5,
      rotate: '1deg'
    }
  ];

  return (
    <div className="min-h-screen py-12 md:py-20 relative overflow-hidden" style={{
      background: themeColors.background.sections?.about || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      {/* Hero Header */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-8 mb-16 md:mb-24">
          <div className="text-left w-full md:w-auto">
            <div className="ascii-container justify-start text-4xl md:text-5xl lg:text-6xl">
              <AsciiMorphText text="Hi, I'm Kumar Mrinal" />
            </div>
            <div className="hero-subtitle justify-start text-base md:text-lg lg:text-xl mt-3">
              <div className="flex flex-wrap items-center justify-start">
                <span className={isDarkMode ? 'hero-subtitle-dark' : 'hero-subtitle-light'}>I am a&nbsp;</span>
                <TypewriterCarousel roles={roles} className={isDarkMode ? 'hero-subtitle-dark' : 'hero-subtitle-light'} />
              </div>
            </div>
            <div className="hero-buttons flex justify-start gap-4 mt-6">
              <a
                href={socialLinks.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-action-btn text-sm md:text-base px-5 py-3 border-2 font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  borderRadius: '12px',
                  borderColor: themeColors.colors.pink[300],
                  color: isDarkMode ? '#FDD5DF' : themeColors.colors.pink[800]
                }}
              >
                Resume →
              </a>
              <Link
                to="/contact"
                className="hero-action-btn text-sm md:text-base px-5 py-3 border-2 font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  borderRadius: '12px',
                  borderColor: themeColors.colors.pink[300],
                  color: isDarkMode ? '#FDD5DF' : themeColors.colors.pink[800]
                }}
              >
                Contact →
              </Link>
            </div>
          </div>
          <div className="hidden md:block" style={{ fontSize: '0.8rem', lineHeight: '1.05', fontFamily: 'monospace', minHeight: '150px', color: isDarkMode ? themeColors.primary : themeColors.colors.pink[500] }}>
            <pre className="select-none">{asciiText}</pre>
          </div>
        </div>
      </div>

      {/* Netflix-Jobs-style Landing Page Grid */}
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-8 justify-start">
            <h2 className="text-3xl font-bold" style={{
              fontFamily: "'DK Crayonista', cursive",
              color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500]
            }}>
              Interactive Hub
            </h2>
            <div className="h-0.5 flex-1 bg-pink-100 dark:bg-gray-800 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {navigationTiles.map((tile, idx) => {
              const Icon = tile.icon;
              return (
                <Link
                  key={idx}
                  to={tile.path}
                  className="group relative block p-6 border-2 border-dashed rounded-2xl hover:border-solid hover:shadow-xl transition-all duration-300 transform select-none"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.4)' : '#FFFFFF',
                    borderColor: isDarkMode ? '#374151' : themeColors.colors.pink[200],
                    transform: `rotate(${tile.rotate})`,
                    boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 15px rgba(234, 190, 195, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03) rotate(0deg)';
                    e.currentTarget.style.borderColor = themeColors.colors.pink[400];
                    e.currentTarget.style.boxShadow = isDarkMode
                      ? `0 10px 30px ${withAlpha(themeColors.colors.pink[300], 0.2)}`
                      : `0 10px 30px ${withAlpha(themeColors.colors.pink[300], 0.35)}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${tile.rotate})`;
                    e.currentTarget.style.borderColor = isDarkMode ? '#374151' : themeColors.colors.pink[200];
                    e.currentTarget.style.boxShadow = isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 15px rgba(234, 190, 195, 0.1)';
                  }}
                >
                  {/* Decorative tape sticker effect on top of cards */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pink-100/70 dark:bg-gray-700/60 rotate-2 border border-pink-200/40 rounded pointer-events-none" />

                  {/* Card Content */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl transition-colors duration-300" style={{
                      backgroundColor: isDarkMode ? 'rgba(234, 190, 195, 0.1)' : themeColors.colors.pink[50],
                      color: themeColors.colors.pink[500]
                    }}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-pink-500 transition-colors" style={{
                      color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[800]
                    }}>
                      {tile.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed" style={{
                    color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[600]
                  }}>
                    {tile.description}
                  </p>

                  {/* Sticker image inside cards for cute scrapbook feel */}
                  {stickerImages[tile.stickerIndex] && (
                    <img
                      src={stickerImages[tile.stickerIndex]}
                      alt=""
                      className="absolute bottom-2 right-2 w-8 h-8 opacity-25 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none select-none"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
