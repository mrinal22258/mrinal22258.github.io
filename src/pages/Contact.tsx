import React from 'react';
import { Mail, Github, Linkedin, Heart, X } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import Aurora from '../components/ui/aurora';
import BackButton from '../components/BackButton';
import { socialLinks } from '../config/socialLinks';

const Contact = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main aria-label="Contact page" className="min-h-screen py-20 transition-colors duration-300 relative overflow-hidden" style={{ backgroundColor: themeColors.background.primary }}>
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0" style={{ opacity: isDarkMode ? 1 : 0.3 }}>
        <Aurora
          colorStops={isDarkMode ? [themeColors.primary, themeColors.colors.special.aurora.dark, themeColors.secondary] : [themeColors.colors.special.aurora.light[1], themeColors.colors.special.aurora.light[2], themeColors.colors.special.aurora.light[3]]}
          blend={isDarkMode ? 0.3 : 0.25}
          amplitude={isDarkMode ? 0.8 : 0.6}
          speed={0.3}
        />
      </div>
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Back Button */}
        <BackButton 
          to="/" 
          scrollToId="" 
          label="Back to Home" 
          ariaLabel="Navigate back to homepage" 
        />

        {/* Contact Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600] }}>Let's Connect!</h1>
          <p className="text-lg" style={{ color: themeColors.text.secondary }}>
          </p>
        </header>

        {/* Contact Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" aria-label="Contact methods">
          
          {/* Email Card */}
          <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="email-heading">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
            </div>
            <h3 id="email-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>Email</h3>
            <a 
              href={`mailto:${socialLinks.email}`}
              aria-label={`Send email to ${socialLinks.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink
              }}
            >
              Send Email
            </a>
            <p className="text-xs mt-3" style={{ color: themeColors.text.tertiary }}>{socialLinks.display.email}</p>
          </article>

          {/* GitHub Card */}
          <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="github-heading">
            <div className="flex justify-center mb-4">
              <Github className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
            </div>
            <h3 id="github-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>GitHub</h3>
            <a 
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View GitHub profile at ${socialLinks.display.github} (opens in new tab)`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink
              }}
            >
              View Profile
            </a>
            <p className="text-xs mt-3" style={{ color: themeColors.text.tertiary }}>{socialLinks.display.github}</p>
          </article>

          {/* LinkedIn Card */}
          <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="linkedin-heading">
            <div className="flex justify-center mb-4">
              <Linkedin className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
            </div>
            <h3 id="linkedin-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>LinkedIn</h3>
            <a 
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Connect on LinkedIn at ${socialLinks.display.linkedin} (opens in new tab)`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink
              }}
            >
              Connect
            </a>
            <p className="text-xs mt-3" style={{ color: themeColors.text.tertiary }}>{socialLinks.display.linkedin}</p>
          </article>

          {/* Thank You Card */}
          <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300 flex flex-col justify-between" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="thankyou-heading">
            <div>
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 fill-current" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
              </div>
              <h3 id="thankyou-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>Thank You</h3>
            </div>
            <div>
              <button 
                onClick={() => setIsVideoOpen(true)}
                aria-label="Play thank you video"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-85 cursor-pointer w-full text-center"
                style={{
                  backgroundColor: themeColors.interactive.primary,
                  color: themeColors.text.pink,
                  border: 'none'
                }}
              >
                Watch Video
              </button>
              <p className="text-xs mt-3 animate-pulse" style={{ color: themeColors.text.tertiary }}>A video message ˚ʚ♡ɞ˚</p>
            </div>
          </article>

        </section>
      </div>

      {/* Video Overlay Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Thank you video presentation"
        >
          <div 
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl border"
            style={{ borderColor: themeColors.colors.pink[500] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-pink-600 hover:text-white transition-colors duration-200 cursor-pointer"
              aria-label="Close video player"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Video Player */}
            <div className="aspect-video w-full">
              <video
                src="/videoplayback.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
                aria-label="Kumar Mrinal's thank you video"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Contact;