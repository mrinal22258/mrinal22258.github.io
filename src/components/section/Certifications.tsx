import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { Award, ShieldCheck, BookOpen, Music, Users, Trophy } from 'lucide-react';
import { Card } from '../ui/card';

const Certifications = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const certifications = [
    {
      title: 'Anthropic 8+ AI Certifications',
      issuer: 'Anthropic',
      icon: ShieldCheck,
      description: 'Advanced certifications covering LLM engineering, Claude system prompt configurations, and API optimization workflows.',
      credentialUrl: 'https://github.com/mrinal22258/Anthropic-Certificates'
    },
    {
      title: 'Micro1 AI Certified 2026',
      issuer: 'Micro1',
      icon: Award,
      description: 'Vetted and certified in core AI capabilities, agent architecture, and machine learning software development.',
      credentialUrl: 'https://github.com/mrinal22258/Certificates/blob/main/micro1_certified.jpg'
    },
    {
      title: 'Self Driving Cars',
      issuer: 'University of Toronto',
      icon: BookOpen,
      description: 'Specialized sequence covering state estimation, visual perception, and vehicle control algorithm pipelines.',
      credentialUrl: 'https://github.com/mrinal22258/SDC-Certificate'
    },
    {
      title: 'Functional Programming I and II (Haskell MOOC)',
      issuer: 'University of Helsinki',
      icon: BookOpen,
      description: 'Comprehensive curriculum focused on pure functional paradigms, lazy evaluation, monads, and algebraic types in Haskell.',
      credentialUrl: 'https://github.com/mrinal22258/Functional-Programming-Certificate'
    }
  ];

  const honors = [
    {
      title: "3rd Place (out of 100+ teams)",
      event: "Sherlocked Enigma '25",
      issuer: "Lady Shri Ram College",
      icon: Trophy,
      detail: "Competed in high-stakes problem solving and logical investigations."
    },
    {
      title: "Core Member - Math Talk 2024",
      event: "Math Club \"Evariste\"",
      issuer: "IIIT Delhi",
      icon: Users,
      detail: "Coordinated activities and discussions for 150+ academic participants."
    },
    {
      title: "Member / Live Performer",
      event: "Music Week 2025",
      issuer: "Music Club \"Audiobytes\"",
      icon: Music,
      detail: "Performed and supported music event organizations for 100+ attendees."
    },
    {
      title: "Events OC (Organizing Committee)",
      event: "Odyssey Cultural Fest",
      issuer: "IIIT Delhi (Jan 2024)",
      icon: Users,
      detail: "Managed logistics and event coordination for IIIT Delhi's flagship cultural festival."
    },
    {
      title: "Core Member",
      event: "Evariste IIIT Delhi Math Society",
      issuer: "Nov 2022 – present",
      icon: Award,
      detail: "Active engagement in society planning, lectures, and mathematical event organizations."
    },
    {
      title: "Core Member",
      event: "Audiobytes IIIT Delhi Music Society",
      issuer: "Jan 2025 – present",
      icon: Music,
      detail: "Actively contributing to sound production, performances, and society rehearsals."
    }
  ];

  return (
    <div className="min-h-screen py-12 md:py-20 relative" style={{
      background: themeColors.background.sections?.certifications || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Certifications Section */}
        <section className="mb-16">
          <header className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4" style={{ 
              fontFamily: "'DK Crayonista', cursive",
              color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] 
            }}>
              Certifications & Credentials
            </h2>
            <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: themeColors.text.secondary }}>
              Professional validations of technical skills in LLMs, machine learning, robotics, and functional paradigms.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => {
              const CertIcon = cert.icon;
              return (
                <Card 
                  key={index} 
                  className="border-2 border-pink-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-white/95 dark:bg-gray-800/95 flex gap-4 p-5 items-start"
                >
                  <div className="p-3 rounded-xl" style={{
                    backgroundColor: isDarkMode ? 'rgba(234, 190, 195, 0.1)' : themeColors.colors.pink[50],
                    color: themeColors.colors.pink[500]
                  }}>
                    <CertIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[800] }}>
                      {cert.title}
                    </h3>
                    <p className="text-xs font-bold text-pink-500 mb-2">{cert.issuer}</p>
                    <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300 mb-3.5">
                      {cert.description}
                    </p>
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition-colors hover:underline"
                      >
                        Verify Credential →
                      </a>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Divider line */}
        <div className="h-0.5 w-full bg-pink-100 dark:bg-gray-800 rounded-full mb-16" />

        {/* Honors & Positions Section */}
        <section>
          <header className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4" style={{ 
              fontFamily: "'DK Crayonista', cursive",
              color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] 
            }}>
              Honors, Awards & Leadership
            </h2>
            <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: themeColors.text.secondary }}>
              Hackathon achievements, society leadership, and active cultural coordination roles.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {honors.map((honor, index) => {
              const HonorIcon = honor.icon;
              return (
                <Card 
                  key={index} 
                  className="border-2 border-pink-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-white/95 dark:bg-gray-800/95 flex gap-4 p-5 items-start animate-fadeIn"
                >
                  <div className="p-3 rounded-xl" style={{
                    backgroundColor: isDarkMode ? 'rgba(234, 190, 195, 0.1)' : themeColors.colors.pink[50],
                    color: themeColors.colors.pink[500]
                  }}>
                    <HonorIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[800] }}>
                      {honor.title}
                    </h3>
                    <p className="text-xs font-bold text-pink-500 mb-2">{honor.event} — {honor.issuer}</p>
                    <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                      {honor.detail}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Certifications;