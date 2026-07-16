import { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import DarkModeToggle from '../DarkModeToggle';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors, withAlpha } from '../../hooks/useThemeColors';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const location = useLocation();

  const tabs = useMemo(() => [
    { id: 'about', label: 'About', path: '/about' },
    { id: 'experience', label: 'Experience', path: '/experience' },
    { id: 'projects', label: 'Projects', path: '/projects' },
    { id: 'skills', label: 'Skills', path: '/skills' },
    { id: 'certifications', label: 'Certifications', path: '/certifications' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ], []);

  useEffect(() => {
    // Update active tab based on path
    const currentTab = tabs.find(tab => 
      location.pathname === tab.path || 
      (tab.path !== '/' && location.pathname.startsWith(tab.path + '/'))
    );
    if (currentTab) {
      setActiveTab(currentTab.id);
    } else {
      setActiveTab('');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [tabs, location.pathname, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`navigation ${isScrolled ? 'scrolled' : ''}`}
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        width: '100%',
        zIndex: 99999,
        padding: '1rem 0',
        borderBottom: `1px solid ${isScrolled ? themeColors.navigation.borderScrolled : themeColors.navigation.border}`,
        boxShadow: `0 ${isScrolled ? '8px 32px' : '4px 24px'} ${isScrolled ? themeColors.navigation.shadowScrolled : themeColors.navigation.shadow}`,
        backdropFilter: 'saturate(200%) blur(30px)',
        WebkitBackdropFilter: 'saturate(200%) blur(30px)',
        transition: 'all 0.3s ease',
        background: `linear-gradient(135deg,
          ${withAlpha(isDarkMode ? themeColors.colors.dark[950] : themeColors.colors.pink[50], isScrolled ? 0.7 : 0.5)},
          ${withAlpha(isDarkMode ? themeColors.colors.dark[900] : themeColors.colors.pink[25], isScrolled ? 0.7 : 0.5)})`
      }}>
      <div className="nav-container">
        <Link to="/" className="signature-name"
          style={{ 
            cursor: 'pointer', 
            color: themeColors.colors.pink[500], 
            background: 'none', 
            border: 'none',
            outline: 'none',
            WebkitTextFillColor: themeColors.colors.pink[500],
            textDecoration: 'none'
          }}
          aria-label="Kumar Mrinal - Go to homepage">
          Kumar Mrinal
        </Link>
        
        {/* Desktop Navigation */}
        <div className="nav-tabs desktop-nav">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              style={{ color: themeColors.text.accent, textDecoration: 'none' }}
              aria-label={`Navigate to ${tab.label} section`}
            >
              {tab.label}
            </Link>
          ))}
          <div className="ml-4">
            <DarkModeToggle
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
          </div>
        </div>
 
        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn relative"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          style={{
            background: isDarkMode ? themeColors.colors.dark[800] : themeColors.colors.white,
            border: `1px solid ${themeColors.colors.pink[200]}`,
            borderRadius: '12px',
            cursor: 'pointer',
            padding: '10px',
            display: 'none',
            color: themeColors.colors.pink[500],
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ position: 'relative', width: '24px', height: '24px' }}>
            <Menu
              size={24}
              style={{
                position: 'absolute',
                transition: 'opacity 0.3s ease',
                opacity: isMobileMenuOpen ? 0 : 1
              }}
            />
            <X
              size={24}
              style={{
                position: 'absolute',
                transition: 'opacity 0.3s ease',
                opacity: isMobileMenuOpen ? 1 : 0
              }}
            />
          </div>
        </button>
      </div>
 
      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          flexDirection: 'column',
          padding: isMobileMenuOpen ? '1rem' : '0',
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          background: themeColors.navigation.mobile,
          borderTop: `1px solid ${themeColors.navigation.border}`,
          maxHeight: isMobileMenuOpen ? '500px' : '0',
          overflow: isMobileMenuOpen ? 'visible' : 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isMobileMenuOpen ? 1 : 0,
          boxShadow: isMobileMenuOpen
            ? `0 8px 25px ${themeColors.navigation.shadowScrolled}`
            : 'none',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {tabs.map((tab, index) => (
          <Link
            key={tab.id}
            to={tab.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`mobile-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            style={{
              background: activeTab === tab.id
                ? withAlpha(
                    isDarkMode ? themeColors.colors.pink[50] : themeColors.colors.pink[50],
                    isDarkMode ? 0.05 : 0.8
                  )
                : 'none',
              border: activeTab === tab.id
                ? `1px solid ${themeColors.colors.pink[200]}`
                : '1px solid transparent',
              borderRadius: '12px',
              padding: '0.875rem 1.25rem',
              textAlign: 'left',
              color: activeTab === tab.id
                ? themeColors.colors.pink[500]
                : themeColors.text.accent,
              fontWeight: activeTab === tab.id ? '600' : '500',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transitionDelay: isMobileMenuOpen ? `${index * 0.05}s` : '0s',
              marginBottom: '0.5rem',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              outline: 'none',
              width: '100%',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.background = withAlpha(
                  themeColors.colors.pink[50],
                  isDarkMode ? 0.03 : 0.5
                );
                e.currentTarget.style.borderColor = themeColors.colors.pink[200];
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.borderColor = 'transparent';
              }
            }}
            onFocus={(e) => e.currentTarget.blur()}
            aria-label={`Navigate to ${tab.label} section`}
          >
            {tab.label}
          </Link>
        ))}
        <div
          className="mt-6 px-4"
          style={{
            borderTop: `1px solid ${themeColors.colors.pink[200]}`,
            paddingTop: '1rem',
            opacity: isMobileMenuOpen ? 1 : 0,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: isMobileMenuOpen ? '0.35s' : '0s',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DarkModeToggle
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;