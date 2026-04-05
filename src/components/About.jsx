import React from 'react';
import { FiAward, FiBookOpen, FiCode, FiDownload } from "react-icons/fi";
import { 
  SiPython, SiPytorch, SiTensorflow, SiScikitlearn, SiOpencv, SiGit
} from "react-icons/si";

export default function About() {
  const Aboutdata = [
    {
      icon: <FiCode size={20} />,
      title: "Languages",
      desc: "Python, C++, Java, C, SQL, Haskell, Prolog",
    },
    {
      icon: <FiBookOpen size={20} />,
      title: "Education",
      desc: "B.Tech CS & AI — IIIT Delhi (2022–2026)",
    },
    {
      icon: <FiAward size={20} />,
      title: "Research",
      desc: "Neuro AI · Neural Cryptanalysis · NLP",
    },
  ];

  const Tools = [
    { icon: <SiPython size={24} />, title: "Python" },
    { icon: <SiPytorch size={24} />, title: "PyTorch" },
    { icon: <SiTensorflow size={24} />, title: "TensorFlow" },
    { icon: <SiScikitlearn size={24} />, title: "Scikit-learn" },
    { icon: <SiOpencv size={24} />, title: "OpenCV" },
    { icon: <SiGit size={24} />, title: "Git" },
  ];

  return (
    <div id="about" className="relative w-full min-h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-sans tracking-wide py-20 px-6 md:px-12">
        
        {/* BG EFFECTS */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="absolute inset-0 z-[15] pointer-events-none" style={{ background: "radial-gradient(circle at 30% 50%, transparent 20%, rgba(0,0,0,0.9) 100%)" }}></div>

        {/* STATIC FRAME IMAGE LEFT */}
        <div className="absolute inset-y-0 left-0 w-[45%] z-10 pointer-events-none overflow-hidden hidden lg:block" style={{ WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }}>
            <img src="/images/ezgif-frame-240.jpg" alt="Kumar Mrinal" className="w-full h-full object-cover opacity-50 grayscale" />
        </div>

        {/* CONTENT */}
        <div className="relative z-[50] w-full lg:w-[80%] flex flex-col md:flex-row items-center justify-end">
            <div className="hidden lg:block w-[35%] h-full"></div>
            <div className="w-full lg:w-[65%] flex flex-col space-y-10 pointer-events-auto bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/5 rounded-2xl">
                <div className="space-y-2">
                    <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em]">SYSTEM INFO</p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase">
                        About Me<span className="text-blue-500">.</span>
                    </h2>
                </div>

                <div className="robotic-section">
                    <p className="text-gray-400 text-sm md:text-md lg:text-xl font-light leading-relaxed max-w-2xl">
                        I'm <span className="text-white font-medium">Kumar Mrinal</span>, a CS &amp; AI student at IIIT Delhi. My research spans <span className="text-white font-medium">retinal ganglion cell modeling</span>, <span className="text-white font-medium">neural cryptanalysis</span> (SIMON32/SPECK32 ciphers), and <span className="text-white font-medium">multilingual NLP</span> — building systems at the boundary of deep learning and classical theory.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Aboutdata.map((item) => (
                        <div key={item.title} className="group p-6 bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 rounded-xl">
                            <div className="text-blue-500 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">{item.title}</h4>
                            <p className="text-gray-500 text-[11px] leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-gray-500 tracking-[0.3em] uppercase">Core Tech Stack</h4>
                    <div className="flex flex-wrap gap-5">
                        {Tools.map((tool) => (
                            <div key={tool.title} className="group relative p-4 bg-black/50 border border-white/5 hover:border-blue-500/50 transition-all rounded-xl flex items-center justify-center cursor-help">
                                <div className="text-gray-500 group-hover:text-blue-400 transition-colors">{tool.icon}</div>
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-mono py-1.5 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-[70] whitespace-nowrap shadow-xl">{tool.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-6 flex flex-wrap gap-4">
                    <a href="https://mrinal22258.github.io/" target="_blank" rel="noreferrer"
                        className="inline-flex items-center space-x-3 px-10 py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all duration-300 rounded-full shadow-lg shadow-blue-900/20">
                        <span>Portfolio Site</span>
                    </a>
                    <a href="https://github.com/mrinal22258" target="_blank" rel="noreferrer"
                        className="inline-flex items-center space-x-3 px-10 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-full">
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
}
