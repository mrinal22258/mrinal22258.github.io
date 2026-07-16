// Main assets module - consolidates common assets
import aboutMeJournalPng from './journal.PNG';
import aboutMeJournalWebp800 from './journal.PNG';
import aboutMeJournalWebp400 from './journal.PNG';
// To use your real pictures: save your photo files as profile1.jpg, profile2.jpg, profile3.jpg inside src/assets/ and update the imports below.
import profile1 from './profile1.png';
import profile2 from './coming_soon.png';
import profile3 from './profile3.jpeg';
import comingSoon from './coming_soon.png';
import dividerPng from './divider.PNG';
import dividerWebp from './divider-original.webp';
import divider from './divider-original.webp';

// For backward compatibility
const aboutMeJournal = aboutMeJournalPng;

// Re-export all asset modules
export * from './stars';
export * from './stickers';
export * from './project_icons';
export * from './techstack';

// Export main assets
export const mainAssets = {
  aboutMeJournal,
  aboutMeJournalPng,
  aboutMeJournalWebp800,
  aboutMeJournalWebp400,
  profile1,
  profile2,
  profile3,
  comingSoon,
  divider,
  dividerPng,
  dividerWebp,
};

export {
  aboutMeJournal,
  aboutMeJournalPng,
  aboutMeJournalWebp800,
  aboutMeJournalWebp400,
  profile1,
  profile2,
  profile3,
  comingSoon,
  divider,
  dividerPng,
  dividerWebp,
};

export default {
  mainAssets,
};
