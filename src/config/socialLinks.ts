// Social Links Configuration - uses environment variables with hardcoded fallbacks
export const socialLinks = {
  // Main social profiles
  github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/mrinal22258',
  linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/krmrinal/',
  email: import.meta.env.VITE_EMAIL || 'mrinal22258@iiitd.ac.in',
  resumePath: import.meta.env.VITE_RESUME_PATH || '/assets/resume.pdf',
  
  // GitHub repository URLs
  repositories: {
    projectOne: import.meta.env.VITE_GITHUB_PROJECT1_URL,
    projectTwo: import.meta.env.VITE_GITHUB_PROJECT2_URL,
    projectThree: import.meta.env.VITE_GITHUB_PROJECT3_URL,
    projectFour: import.meta.env.VITE_GITHUB_PROJECT4_URL,
  },
  
  // Formatted display names (extracted from environment variables or fallbacks)
  display: {
    github: (import.meta.env.VITE_GITHUB_URL || 'https://github.com/mrinal22258').replace('https://', ''),
    linkedin: (import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/krmrinal/').replace('https://', ''),
    email: import.meta.env.VITE_EMAIL || 'mrinal22258@iiitd.ac.in',
  }
};

export default socialLinks;