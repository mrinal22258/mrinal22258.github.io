import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, GraduationCap, Microscope, Calendar, Camera } from 'lucide-react';
import AsciiMorphText from '../AsciiMorphText';
import TypewriterCarousel from '../TypewriterCarousel';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { profile1, profile2, profile3, aboutMeJournalPng, stickers as stickerImages } from '../../assets';

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

const About = () => {
  const [asciiText, setAsciiText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentJournalPage, setCurrentJournalPage] = useState(0);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  // Dynamic image processor to remove white pixels from the journal backdrop
  const [journalBg, setJournalBg] = useState<string>(aboutMeJournalPng);

  useEffect(() => {
    const img = new Image();
    img.src = aboutMeJournalPng;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;

        // BFS Flood-fill to only make transparent the background outside the book,
        // preventing interior paper pixels from turning transparent (which causes "stains" in dark mode)
        const visited = new Uint8Array(width * height);
        const queue: [number, number][] = [];

        const isWhite = (x: number, y: number) => {
          const idx = (y * width + x) * 4;
          // Look for background white pixels
          return data[idx] > 220 && data[idx + 1] > 220 && data[idx + 2] > 220;
        };

        const addPoint = (x: number, y: number) => {
          if (x >= 0 && x < width && y >= 0 && y < height) {
            const idx = y * width + x;
            if (!visited[idx] && isWhite(x, y)) {
              visited[idx] = 1;
              queue.push([x, y]);
            }
          }
        };

        // Seed BFS from the four corners of the image
        addPoint(0, 0);
        addPoint(width - 1, 0);
        addPoint(0, height - 1);
        addPoint(width - 1, height - 1);

        let qIdx = 0;
        while (qIdx < queue.length) {
          const [cx, cy] = queue[qIdx++];
          
          // Clear alpha channel for this background pixel
          const pIdx = (cy * width + cx) * 4;
          data[pIdx + 3] = 0;

          // Propagate to cardinal neighbors
          addPoint(cx + 1, cy);
          addPoint(cx - 1, cy);
          addPoint(cx, cy + 1);
          addPoint(cx, cy - 1);
        }

        ctx.putImageData(imgData, 0, 0);
        setJournalBg(canvas.toDataURL('image/png'));
      }
    };
  }, []);

  const roles = [
    'AI/ML Engineer',
    'NLP Researcher',
    'Agentic AI Builder',
    'Open-Source Contributor',
  ];

  const profileImages = [
    { src: profile1, caption: "Kumar Mrinal" },
    { src: profile2, caption: "Research & Development" },
    { src: profile3, caption: "IIIT Delhi Campus" }
  ];

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? profileImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === profileImages.length - 1 ? 0 : prev + 1));
  };

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

  // Draggable Stickers State scattered over the notebook pages
  const [stickers, setStickers] = useState(
    Array.from({ length: 10 }, (_, i) => {
      const initialPositions = [
        { x: 30, y: 15, rot: -15 },
        { x: 780, y: 35, rot: 12 },
        { x: 45, y: 440, rot: -8 },
        { x: 790, y: 420, rot: 18 },
        { x: 320, y: 12, rot: 5 },
        { x: 480, y: 450, rot: -12 },
        { x: 25, y: 220, rot: 25 },
        { x: 800, y: 200, rot: -20 },
        { x: 400, y: 25, rot: -6 },
        { x: 380, y: 430, rot: 15 }
      ];
      const pos = initialPositions[i] || { x: 50, y: 50, rot: 0 };
      return {
        id: i + 1,
        image: stickerImages[i % stickerImages.length],
        x: pos.x,
        y: pos.y,
        rotation: pos.rot
      };
    })
  );

  const [activeDragId, setActiveDragId] = useState<number | null>(null);
  const dragStartOffset = useRef({ x: 0, y: 0 });

  const handleStickerMouseDown = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setActiveDragId(id);
    const sticker = stickers.find(s => s.id === id);
    if (sticker) {
      dragStartOffset.current = {
        x: e.clientX - sticker.x,
        y: e.clientY - sticker.y
      };
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (activeDragId !== null) {
      const newX = e.clientX - dragStartOffset.current.x;
      const newY = e.clientY - dragStartOffset.current.y;
      setStickers(prev => prev.map(s => s.id === activeDragId ? { ...s, x: newX, y: newY } : s));
    }
  }, [activeDragId]);

  const handleMouseUp = useCallback(() => {
    setActiveDragId(null);
  }, []);

  useEffect(() => {
    if (activeDragId !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeDragId, handleMouseMove, handleMouseUp]);

  const journalTabs = [
    { label: 'Story & Objective', pageIndex: 0, icon: BookOpen },
    { label: 'Education & Skills', pageIndex: 1, icon: GraduationCap },
    { label: 'Research & Journey', pageIndex: 2, icon: Microscope },
    { label: 'Fun Facts & Growth', pageIndex: 3, icon: Calendar },
    { label: 'Scrapbook Photos', pageIndex: 4, icon: Camera }
  ];

  // Pen ink colors based on light/dark theme (consistent black ink on the cream notebook pages)
  const penColor = '#1f2937'; // Charcoal black gel pen look
  const redPenColor = '#be185d'; // Red/dark pink highlighting

  return (
    <div className="min-h-screen py-10 md:py-16 relative overflow-hidden" style={{
      background: themeColors.background.sections?.about || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        
        {/* Hero Header */}
        <div className="flex flex-col md:flex-row justify-between items-start max-w-6xl mx-auto gap-8 mb-10">
          <div className="text-left w-full md:w-auto">
            <div className="ascii-container justify-start text-3xl md:text-4xl lg:text-5xl">
              <AsciiMorphText text="About Kumar Mrinal" />
            </div>
            <div className="hero-subtitle justify-start text-base md:text-lg lg:text-xl mt-2">
              <div className="flex flex-wrap items-center justify-start">
                <span className={isDarkMode ? 'hero-subtitle-dark' : 'hero-subtitle-light'}>I am a&nbsp;</span>
                <TypewriterCarousel roles={roles} className={isDarkMode ? 'hero-subtitle-dark' : 'hero-subtitle-light'} />
              </div>
            </div>
          </div>
          <div className="hidden md:block" style={{ fontSize: '0.8rem', lineHeight: '1.05', fontFamily: 'monospace', minHeight: '130px', color: isDarkMode ? themeColors.primary : themeColors.colors.pink[500] }}>
            <pre className="select-none">{asciiText}</pre>
          </div>
        </div>

        {/* Dynamic Lined Notebook Journal - Rendered directly on the page! */}
        <div className="max-w-5xl mx-auto relative mb-16 px-2">
          
          {/* Draggable Stickers layer */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {stickers.map((sticker) => (
              <div
                key={sticker.id}
                onMouseDown={(e) => handleStickerMouseDown(sticker.id, e)}
                className="absolute cursor-grab active:cursor-grabbing select-none pointer-events-auto"
                style={{
                  left: `${sticker.x}px`,
                  top: `${sticker.y}px`,
                  transform: `rotate(${sticker.rotation}deg)`,
                  width: '56px',
                  height: '56px',
                  filter: `drop-shadow(0 4px 8px rgba(234, 190, 195, 0.35))`,
                  zIndex: 35
                }}
              >
                {sticker.image ? (
                  <img
                    src={sticker.image}
                    alt=""
                    className="w-full h-full object-contain pointer-events-none"
                    draggable={false}
                  />
                ) : (
                  <span className="text-2xl">⭐</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-6">
            
            {/* Left Side: Journal Tabs */}
            <div className="flex lg:flex-col justify-center lg:justify-start gap-2 lg:w-48 flex-wrap z-20">
              {journalTabs.map((tab, index) => {
                const TabIcon = tab.icon;
                const isActive = currentJournalPage === tab.pageIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentJournalPage(tab.pageIndex)}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 font-bold text-xs transition-all duration-300 transform"
                    style={{
                      backgroundColor: isActive 
                        ? (isDarkMode ? 'rgba(234, 190, 195, 0.2)' : themeColors.colors.pink[200])
                        : (isDarkMode ? 'rgba(30, 41, 59, 0.4)' : '#FFFFFF'),
                      borderColor: isActive 
                        ? themeColors.colors.pink[400] 
                        : (isDarkMode ? '#374151' : themeColors.colors.pink[100]),
                      color: isActive 
                        ? (isDarkMode ? themeColors.colors.white : themeColors.colors.pink[800])
                        : (isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[600]),
                      transform: isActive ? 'scale(1.05) translate(4px, 0)' : 'scale(1)'
                    }}
                  >
                    <TabIcon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Middle: Open Journal Spread */}
            <div 
              className="flex-1 relative flex flex-col justify-between h-[610px] md:h-[600px] z-10 rounded-[2.5rem] overflow-hidden"
              style={{
                backgroundImage: `url(${journalBg})`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.22))'
              }}
            >
              {/* Content Pages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 relative z-20 flex-1 py-10">
                
                {/* Left Page (Handwritten Ink Style) */}
                <div 
                  className="flex flex-col justify-between border-r-0 md:border-r border-pink-100/10 min-h-[360px] relative group/page"
                  style={{ 
                    fontFamily: "'Virgil', cursive", 
                    color: penColor,
                    fontSize: '1.25rem',
                    lineHeight: '2.1rem',
                    paddingLeft: '50px',
                    paddingRight: '35px'
                  }}
                >
                  {/* Left Page hover edge chevron */}
                  {currentJournalPage > 0 && (
                    <div 
                      onClick={() => setCurrentJournalPage((prev) => Math.max(0, prev - 1))}
                      className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-pink-400/5 to-transparent opacity-0 group-hover/page:opacity-100 transition-opacity duration-300 cursor-pointer flex items-center justify-start pl-2 z-30"
                    >
                      <ChevronLeft className="h-6 w-6 text-pink-500/40 animate-pulse" />
                    </div>
                  )}

                  {currentJournalPage === 0 && (
                    <div className="space-y-4 pt-1">
                      <h3 className="text-2xl font-bold" style={{ fontFamily: "'DK Crayonista', cursive", color: redPenColor }}>About Me</h3>
                      <p className="indent-6">
                        Hello! I am Kumar Mrinal. I'm a passionate AI/ML Engineer and NLP Researcher currently finishing my undergraduate B.Tech in CS & AI at IIIT Delhi.
                      </p>
                      <p>
                        My expertise lies in building advanced machine intelligence models, including multi-agent networks, offline enterprise RAG structures, and Indic NLP pipelines.
                      </p>
                    </div>
                  )}

                  {currentJournalPage === 1 && (
                    <div className="space-y-3 pt-1">
                      <h3 className="text-2xl font-bold" style={{ fontFamily: "'DK Crayonista', cursive", color: redPenColor }}>Education</h3>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-sans">IIIT Delhi</h4>
                        <p className="text-sm font-semibold text-pink-600 dark:text-pink-400 font-sans">B.Tech, CSAI (2022 - 2026)</p>
                      </div>
                      <p>
                        Completed rigorous coursework in NLP, Deep Learning, Probability & Statistics, Data Structures, and Robotics.
                      </p>
                    </div>
                  )}

                  {currentJournalPage === 2 && (
                    <div className="space-y-4 pt-1">
                      <h3 className="text-2xl font-bold" style={{ fontFamily: "'DK Crayonista', cursive", color: redPenColor }}>Research</h3>
                      <p className="indent-6">
                        I explore the crossroads of ML with neuroscience signals and cryptography algorithms:
                      </p>
                      <ul className="list-none pl-2">
                        <li>• CNN-BiLSTM predictions of Retinal Ganglion Cell firing activities.</li>
                        <li>• Neural cryptanalysis breaking Speck32/Simon32 ciphers at 74% accuracy.</li>
                      </ul>
                    </div>
                  )}

                  {currentJournalPage === 3 && (
                    <div className="space-y-4 pt-1">
                      <h3 className="text-2xl font-bold" style={{ fontFamily: "'DK Crayonista', cursive", color: redPenColor }}>Fun Facts</h3>
                      <p className="indent-6">
                        Beyond compiling code and building RAG pipelines, I enjoy logical games and making noise:
                      </p>
                      <ul className="list-none pl-2">
                        <li>• Organizing national crypt hackathons like LSR Sherlocked '25.</li>
                        <li>• Playing guitar as a member of IIITD Music Club Audiobytes.</li>
                        <li>• Writing functional code in Haskell.</li>
                      </ul>
                    </div>
                  )}

                  {currentJournalPage === 4 && (
                    <div className="space-y-4 pt-1">
                      <h3 className="text-2xl font-bold" style={{ fontFamily: "'DK Crayonista', cursive", color: redPenColor }}>Photo Album</h3>
                      <p>
                        Here is a collection of my snapshots from IIIT Delhi campus, hackathons, and research logs. Use the arrows to cycle through them!
                      </p>
                    </div>
                  )}

                  <div className="mt-auto pt-2 text-xs opacity-65 select-none" style={{ fontFamily: "'Virgil', cursive" }}>
                    Page {currentJournalPage * 2 + 1}
                  </div>
                </div>

                {/* Right Page (Handwritten Ink Style) */}
                <div 
                  className="flex flex-col justify-between min-h-[360px] relative group/page"
                  style={{ 
                    fontFamily: "'Virgil', cursive", 
                    color: penColor,
                    fontSize: '1.25rem',
                    lineHeight: '2.1rem',
                    paddingLeft: '35px',
                    paddingRight: '50px'
                  }}
                >
                  {/* Right Page hover edge chevron */}
                  {currentJournalPage < 4 && (
                    <div 
                      onClick={() => setCurrentJournalPage((prev) => Math.min(4, prev + 1))}
                      className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-pink-400/5 to-transparent opacity-0 group-hover/page:opacity-100 transition-opacity duration-300 cursor-pointer flex items-center justify-end pr-2 z-30"
                    >
                      <ChevronRight className="h-6 w-6 text-pink-500/40 animate-pulse" />
                    </div>
                  )}

                  {currentJournalPage === 0 && (
                    <div className="space-y-4 pt-1">
                      <h3 className="text-2xl font-bold" style={{ fontFamily: "'DK Crayonista', cursive", color: redPenColor }}>Career Objective</h3>
                      <p>
                        My objective is to push the boundaries of offline AI agents and secure privacy-aware pipelines. I build reliable local tools that work with zero latency and respect data privacy.
                      </p>
                      <p>
                        I hope to bridge the gap between academic ML models and developer tools that work out-of-the-box.
                      </p>
                    </div>
                  )}

                  {currentJournalPage === 1 && (
                    <div className="space-y-4 pt-1">
                      <h3 className="text-2xl font-bold" style={{ fontFamily: "'DK Crayonista', cursive", color: redPenColor }}>Technical Interests</h3>
                      <p>
                        I am highly interested in playing with these technologies:
                      </p>
                      <ul className="list-none pl-2">
                        <li>• **AI Agents**: Multi-agent communication, tool use, and loop logic.</li>
                        <li>• **Vector Lookup**: FAISS indexing and vector retrieval mechanics.</li>
                        <li>• **Functional Flows**: Clean, pure state functions.</li>
                      </ul>
                    </div>
                  )}

                  {currentJournalPage === 2 && (
                    <div className="space-y-4 pt-1">
                      <h3 className="text-2xl font-bold" style={{ fontFamily: "'DK Crayonista', cursive", color: redPenColor }}>Personal Journey</h3>
                      <p>
                        My coding journey started with core algorithms in C++ and Python. I soon realized that ML models are only as good as the context pipelines backing them.
                      </p>
                      <p>
                        Contributing to major repositories like Crawl4AI (70K+ stars) helped me write robust open-source code.
                      </p>
                    </div>
                  )}

                  {currentJournalPage === 3 && (
                    <div className="space-y-3 pt-1">
                      <h3 className="text-2xl font-bold" style={{ fontFamily: "'DK Crayonista', cursive", color: redPenColor }}>Growth Milestones</h3>
                      <div className="space-y-1.5 relative border-l border-pink-300 dark:border-gray-700 pl-4 ml-2 mt-2 font-sans text-xs">
                        <div className="relative">
                          <div className="absolute -left-6 top-1 w-2.5 h-2.5 bg-pink-400 rounded-full" />
                          <span className="font-bold text-pink-600 dark:text-pink-400">Nov 2022</span>
                          <p className="text-gray-600 dark:text-gray-300">Started B.Tech CSAI at IIIT Delhi</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-6 top-1 w-2.5 h-2.5 bg-pink-400 rounded-full" />
                          <span className="font-bold text-pink-600 dark:text-pink-400">Jan 2025</span>
                          <p className="text-gray-600 dark:text-gray-300">Retinal Ganglion Cell modelling research</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-6 top-1 w-2.5 h-2.5 bg-pink-400 rounded-full" />
                          <span className="font-bold text-pink-600 dark:text-pink-400">July 2026</span>
                          <p className="text-gray-600 dark:text-gray-300">Fixed installation issues for Crawl4AI</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentJournalPage === 4 && (
                    <div className="relative aspect-[4/5] w-full max-w-[280px] mx-auto bg-white dark:bg-gray-700 p-3 pb-8 rounded shadow-lg border border-gray-200 dark:border-gray-600 transform rotate-1 flex flex-col justify-between group">
                      {/* Polaroid Image Wrapper */}
                      <div className="w-full aspect-square overflow-hidden bg-gray-100 rounded border border-gray-100 relative">
                        {profileImages.map((image, idx) => (
                          <div
                              key={idx}
                              className={`absolute inset-0 transition-opacity duration-500 flex flex-col bg-white dark:bg-gray-700 ${
                                idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                              }`}
                          >
                            <img
                              src={image.src}
                              alt={image.caption}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Polaroid caption written in handwriting */}
                      <div className="text-center mt-2 flex items-center justify-center min-h-[30px]">
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-200 font-sans">
                          {profileImages[currentImageIndex]?.caption || "Snapshot"}
                        </p>
                      </div>

                      {/* Carousel controls */}
                      <button
                        onClick={goToPrevious}
                        className="absolute left-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-30 pointer-events-auto"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-30 pointer-events-auto"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <div className="mt-auto pt-2 text-xs opacity-65 select-none text-right" style={{ fontFamily: "'Virgil', cursive" }}>
                    Page {currentJournalPage * 2 + 2}
                  </div>
                </div>

              </div>

              {/* Floating Page Flip Buttons on Left & Right Edges */}
              {currentJournalPage > 0 && (
                <button
                  onClick={() => setCurrentJournalPage((prev) => Math.max(0, prev - 1))}
                  className="absolute left-[-20px] md:left-[-28px] top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-800 text-pink-600 border-2 border-pink-200 dark:border-gray-700 shadow-xl hover:scale-110 active:scale-95 transition-all z-30"
                  aria-label="Flip page back"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}
              {currentJournalPage < 4 && (
                <button
                  onClick={() => setCurrentJournalPage((prev) => Math.min(4, prev + 1))}
                  className="absolute right-[-20px] md:right-[-28px] top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-800 text-pink-600 border-2 border-pink-200 dark:border-gray-700 shadow-xl hover:scale-110 active:scale-95 transition-all z-30"
                  aria-label="Flip page forward"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}

              {/* Bottom Left Corner Fold */}
              {currentJournalPage > 0 && (
                <div 
                  onClick={() => setCurrentJournalPage((prev) => Math.max(0, prev - 1))}
                  className="absolute bottom-4 left-4 w-14 h-14 cursor-pointer z-30 group flex items-end justify-start select-none"
                  title="Previous Page"
                >
                  <div className="w-8 h-8 bg-gradient-to-tr from-pink-300/40 to-transparent rounded-bl-[2rem] transition-all duration-300 group-hover:w-11 group-hover:h-11 group-hover:from-pink-400/50 group-hover:shadow-md"
                       style={{ borderRight: '1px solid rgba(219, 154, 162, 0.3)', borderTop: '1px solid rgba(219, 154, 162, 0.3)' }} />
                  <span className="absolute bottom-1 left-2 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-pink-700" style={{ fontFamily: "'Virgil', cursive" }}>
                    Prev Page
                  </span>
                </div>
              )}

              {/* Bottom Right Corner Fold */}
              {currentJournalPage < 4 && (
                <div 
                  onClick={() => setCurrentJournalPage((prev) => Math.min(4, prev + 1))}
                  className="absolute bottom-4 right-4 w-14 h-14 cursor-pointer z-30 group flex items-end justify-end select-none"
                  title="Next Page"
                >
                  <div className="w-8 h-8 bg-gradient-to-tl from-pink-300/40 to-transparent rounded-br-[2rem] transition-all duration-300 group-hover:w-11 group-hover:h-11 group-hover:from-pink-400/50 group-hover:shadow-md" 
                       style={{ borderLeft: '1px solid rgba(219, 154, 162, 0.3)', borderTop: '1px solid rgba(219, 154, 162, 0.3)' }} />
                  <span className="absolute bottom-1 right-2 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-pink-700" style={{ fontFamily: "'Virgil', cursive" }}>
                    Next Page
                  </span>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;