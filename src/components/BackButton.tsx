import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useThemeColors } from '../hooks/useThemeColors';

interface BackButtonProps {
  to?: string;
  scrollToId?: string;
  label?: string;
  ariaLabel?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  to = '/projects', 
  label = 'Back to Projects',
  ariaLabel = 'Navigate back to projects'
}) => {
  const themeColors = useThemeColors();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Complete reset of routing states by navigating natively via window.location
    window.location.href = to;
  };

  return (
    <a 
      href={to}
      onClick={handleClick}
      aria-label={ariaLabel}
      className="inline-flex items-center gap-2 hover:opacity-80 mb-8 transition-all cursor-pointer no-underline hover:translate-x-[-4px] select-none" 
      style={{ 
        color: themeColors.colors.pink[500],
        fontFamily: "'DK Crayonista', cursive",
        fontSize: '1.1rem',
        fontWeight: 'bold',
        background: 'transparent',
        border: 'none',
        display: 'inline-flex'
      }}
    >
      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
};

export default BackButton;