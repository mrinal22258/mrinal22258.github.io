import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCpu, FiLock, FiMessageSquare, FiDatabase, FiArrowRight, FiBriefcase } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const sidebarRef = useRef(null);

  const mainServices = [
    {
      icon: <FiCpu size={24} />,
      title: "Retinal Neuroscience AI",
      p: "CNN-BiLSTM and BNCNN pipelines for retinal ganglion cell firing rate prediction. Built at Witty Lab, IIIT Delhi under Prof. Pragya Kosta using large-scale retinal datasets.",
    },
    {
      icon: <FiLock size={24} />,
      title: "Neural Cryptanalysis",
      p: "Deep distinguishers (ResNet, CNN-BiLSTM) achieving 74% accuracy on SIMON32/SPECK32 lightweight ciphers. Integrated classical differential patterns into model training for cipher vulnerability detection.",
    },
    {
      icon: <FiMessageSquare size={24} />,
      title: "Multilingual NLP",
      p: "Gendered abuse detection in English, Hindi, and Tamil tweets using CNN-BiLSTM and GRU-Attention architectures. Built on the ICON23 shared task dataset for multilingual classification.",
    },
    {
      icon: <FiDatabase size={24} />,
      title: "Big Data & Distributed Systems",
      p: "Distributed analytics pipelines using Apache Spark, Hadoop, MapReduce, Giraph, and Neo4j. Graph analytics and healthcare ML on the BRFSS 2015 dataset for diabetes risk inference.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(headerRef.current.children, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: "none", stagger: 0.1 }
      );
      tl.fromTo(".service-card", 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 0.3, ease: "none", stagger: 0.1 },
        "-=0.2"
      );
      tl.fromTo(sidebarRef.current, 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 0.5, ease: "none" },
        "-=0.3"
      );
      tl.fromTo(".corner-line",
        { scale: 0 },
        { scale: 1, duration: 0.3, ease: "none", stagger: 0.05 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef}
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#000] text-white overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div ref={headerRef} className="max-w-7xl mx-auto text-center mb-24 relative z-10">
        <div className="inline-block px-3 py-1 border border-blue-500/30 bg-blue-500/5 rounded-sm mb-4">
          <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.5em]">RESEARCH MODULE</p>
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
          Research Areas<span className="text-blue-500">.</span>
        </h2>
        <div className="w-24 h-[1px] bg-blue-500/40 mx-auto mb-8"></div>
        <p className="max-w-3xl mx-auto text-gray-500 font-light text-base leading-relaxed">
          Bridging deep learning with neuroscience and cryptography — two concurrent research tracks at IIIT Delhi, building models that decode both neurons and ciphers.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        
        <div ref={gridRef} className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainServices.map((service) => (
            <div key={service.title}
              className="service-card group p-10 bg-[#0a0a0a] border border-white/[0.05] hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] transition-all duration-300 rounded-sm cursor-default flex flex-col items-start"
            >
              <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-sm text-gray-300 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight uppercase">{service.title}</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed mb-10">{service.p}</p>
              <a href="https://github.com/mrinal22258" target="_blank" rel="noreferrer"
                className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 hover:text-white group/btn transition-colors">
                <span>View on GitHub</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* Experience Sidebar */}
        <div ref={sidebarRef} className="lg:col-span-4 h-full relative">
          <div className="sticky top-32 p-10 bg-[#0c0c0c] border border-white/[0.08] rounded-sm group overflow-hidden">
            <div className="corner-line absolute top-2 left-2 w-4 h-4 border-t border-l border-blue-500/50"></div>
            <div className="corner-line absolute top-2 right-2 w-4 h-4 border-t border-r border-blue-500/50"></div>
            <div className="corner-line absolute bottom-2 left-2 w-4 h-4 border-b border-l border-blue-500/50"></div>
            <div className="corner-line absolute bottom-2 right-2 w-4 h-4 border-b border-r border-blue-500/50"></div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-all duration-1000" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-sm text-blue-400">
                  <FiBriefcase size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-widest uppercase">Research</h3>
                  <span className="text-[8px] font-mono text-gray-600 block tracking-[0.4em] mt-1">MODULE ACTIVE</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="h-10 px-3 bg-white flex items-center justify-center rounded-sm">
                  <span className="text-black font-black text-[10px] tracking-tighter">WITTY LAB</span>
                </div>
                <div className="h-10 px-3 border border-white/20 flex items-center justify-center rounded-sm">
                  <span className="text-white font-bold text-[10px] tracking-widest">IIIT DELHI</span>
                </div>
              </div>

              <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
                Dual undergraduate research tracks at <span className="text-white font-medium">IIIT Delhi</span> — neuro-inspired AI at Witty Lab (Prof. Pragya Kosta) and cipher vulnerability detection under Prof. Ravi Anand. Jan–Apr 2025.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "CNN-BiLSTM · BNCNN pipelines",
                  "74% accuracy on SIMON32/SPECK32",
                  "Multilingual abuse detection",
                  "3rd place — Sherlocked Enigma '25",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-[11px] text-gray-500 font-mono">
                    <span className="text-blue-500">›</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a href="https://www.linkedin.com/in/krmrinal/" target="_blank" rel="noreferrer"
                className="w-full py-4 border border-white/10 text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300 rounded-sm flex items-center justify-center"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center font-mono text-[9px] text-gray-700 tracking-[0.2em] px-2 opacity-50">
            <span>&gt; RESEARCH DATA LOADED</span>
            <span>0x2022258</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.03] z-10"></div>
      <div className="absolute top-0 right-1/2 w-[1px] h-full bg-white/[0.03] z-10"></div>
    </section>
  );
}
