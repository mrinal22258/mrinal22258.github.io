import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';

const Experience = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  
  const experiences = [
    {
      title: "Open Source Contributor",
      company: "Crawl4AI (70K+ GitHub stars)",
      companyUrl: "https://github.com/unclecode/crawl4ai",
      location: "Remote / GitHub",
      period: "July 2026",
      description: [
        "Diagnosed an lxml version conflict breaking installs across co-dependencies and on Python 3.14.",
        "Verified the fix via rigorous regression testing and dependency resolution across pip and Poetry packages.",
        "Credited by project maintainers, with modifications merged and incorporated upstream for global installs."
      ]
    },
    {
      title: "Undergraduate Researcher",
      company: "Indraprastha Institute of Information Technology Delhi (IIIT Delhi)",
      companyUrl: "",
      location: "New Delhi, India",
      period: "Jan 2025 – Apr 2025",
      description: [
        "Under Prof. Pragya Kosta: Architected CNN-BiLSTM and BNCNN deep-learning models to predict retinal ganglion cell firing rates from neural electrophysiology data, compiling a neural signal decoding pipeline.",
        "Under Prof. Ravi Anand: Investigated cryptographic security of lightweight ciphers using ResNet / CNN-BiLSTM deep-learning distinguishers combined with differential cryptanalysis, hitting 74% accuracy on SIMON32/SPECK32."
      ]
    }
  ];

  return (
    <section id="experience" className="py-12 md:py-20 relative min-h-screen" style={{
      background: themeColors.background.sections?.experience || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ 
            fontFamily: "'DK Crayonista', cursive",
            color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] 
          }}>
            Experience Timeline
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: themeColors.text.secondary }}>
            A brief history of my open-source work and academic machine learning research.
          </p>
        </header>

        {/* Timeline representation */}
        <div className="relative border-l-2 border-pink-200 dark:border-gray-700 pl-6 md:pl-8 space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Dot on the timeline */}
              <div 
                className="absolute -left-[35px] md:-left-[43px] top-1.5 p-1 rounded-full border-2 transition-transform duration-300 hover:scale-110"
                style={{
                  backgroundColor: isDarkMode ? themeColors.colors.dark[950] : themeColors.colors.pink[50],
                  borderColor: themeColors.colors.pink[400]
                }}
              >
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: themeColors.colors.pink[500] }} />
              </div>

              {/* Experience Card */}
              <Card className="border-2 border-pink-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl bg-white/95 dark:bg-gray-800/95 transform hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <CardTitle className="text-2xl font-bold" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[500] }}>
                        {exp.title}
                      </CardTitle>
                      {exp.companyUrl ? (
                        <a 
                          href={exp.companyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-lg font-semibold hover:underline text-pink-600 dark:text-pink-400 inline-flex items-center gap-1.5 mt-1"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-1">{exp.company}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0" style={{ color: themeColors.colors.pink[500] }}>•</span>
                        <span className="text-sm leading-relaxed" style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;