import React, { useState } from 'react';
import { FiAward, FiBookOpen, FiCode, FiBriefcase, FiZap, FiExternalLink } from "react-icons/fi";

export default function About() {
  const [activeTab, setActiveTab] = useState('experience');

  const tabs = [
    { id: 'experience', label: 'EXPERIENCE & EDUCATION', icon: <FiBriefcase size={14} /> },
    { id: 'skills', label: 'SKILLS & DOMAINS', icon: <FiCode size={14} /> },
    { id: 'certifications', label: 'CERTIFICATIONS & ROLES', icon: <FiZap size={14} /> },
    { id: 'awards', label: 'HONORS & AWARDS', icon: <FiAward size={14} /> }
  ];

  return (
    <div id="about" className="relative w-full min-h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-sans tracking-wide py-24 px-6 md:px-12">
        
        {/* BG EFFECTS */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        <div className="absolute inset-0 z-[15] pointer-events-none" style={{ background: "radial-gradient(circle at 30% 50%, transparent 20%, rgba(0,0,0,0.4) 100%)" }}></div>

        {/* STATIC FRAME IMAGE LEFT */}
        <div className="absolute inset-y-0 left-0 w-[42%] z-10 pointer-events-none overflow-hidden hidden lg:block" style={{ WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }}>
            <img src="/photo.jpg" alt="Kumar Mrinal" className="w-full h-full object-cover opacity-80" />
        </div>

        {/* CONTENT CONTAINER */}
        <div className="relative z-[50] w-full lg:w-[85%] flex flex-col lg:flex-row items-stretch justify-end">
            <div className="hidden lg:block w-[32%]"></div>
            <div className="w-full lg:w-[68%] flex flex-col space-y-8 pointer-events-auto bg-black/40 backdrop-blur-md p-8 md:p-12 border border-white/5 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                
                {/* Header */}
                <div className="space-y-2">
                    <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em]">SYSTEM PROFILE</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                        About Me<span className="text-blue-500">.</span>
                    </h2>
                </div>

                {/* Subtitle bio */}
                <div>
                    <p className="text-gray-400 text-sm md:text-md lg:text-lg font-light leading-relaxed max-w-3xl">
                        I am <span className="text-white font-medium">Kumar Mrinal</span>, an Undergraduate Researcher and B.Tech CS &amp; AI student at <span className="text-white font-medium">IIIT Delhi</span>. My research is centered around modeling deep neural architectures for retinal cell dynamics, neural cryptanalysis of symmetric ciphers, and robust multilingual classification.
                    </p>
                </div>

                {/* Tabs Selectors */}
                <div className="flex flex-wrap gap-2 border-b border-white/5 pb-5">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] transition-all border ${
                                activeTab === tab.id
                                    ? 'bg-blue-600/90 border-blue-500 text-white shadow-lg shadow-blue-900/20'
                                    : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/10'
                            } rounded-sm`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab contents */}
                <div className="min-h-[350px] transition-all duration-300">
                    
                    {/* T1: EXPERIENCE & EDUCATION */}
                    {activeTab === 'experience' && (
                        <div className="space-y-8 animate-fadeIn">
                            
                            {/* Research Experience */}
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-mono text-blue-500/80 tracking-[0.3em] uppercase border-b border-white/5 pb-2">Research Profile</h4>
                                
                                <div className="relative pl-6 border-l border-blue-500/30 space-y-6">
                                    <div className="relative">
                                        <span className="absolute -left-[29px] top-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-black"></span>
                                        <div className="flex justify-between items-start flex-wrap gap-2">
                                            <h5 className="text-md font-bold text-white uppercase tracking-wider">Undergraduate Researcher @ Witty Lab</h5>
                                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Jan 2025 – Apr 2025</span>
                                        </div>
                                        <p className="text-xs font-mono text-blue-400 mt-1 uppercase tracking-wider">IIIT Delhi · Advisor: Prof. Pragya Kosta</p>
                                        <ul className="list-inside list-disc text-gray-400 text-xs mt-3 space-y-1.5 leading-relaxed pl-1">
                                            <li>Developed CNN-BiLSTM and BNCNN pipelines for retinal ganglion cell firing rate prediction.</li>
                                            <li>Implemented scalable data preprocessing and model training pipelines using neuroscience datasets.</li>
                                        </ul>
                                    </div>

                                    <div className="relative">
                                        <span className="absolute -left-[29px] top-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-black"></span>
                                        <div className="flex justify-between items-start flex-wrap gap-2">
                                            <h5 className="text-md font-bold text-white uppercase tracking-wider">Undergraduate Researcher @ Cryptography Research</h5>
                                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Jan 2025 – Apr 2025</span>
                                        </div>
                                        <p className="text-xs font-mono text-blue-400 mt-1 uppercase tracking-wider">IIIT Delhi · Advisor: Prof. Ravi Anand</p>
                                        <ul className="list-inside list-disc text-gray-400 text-xs mt-3 space-y-1.5 leading-relaxed pl-1">
                                            <li>Engineered deep classifiers (ResNet, CNN-BiLSTM distinguishers) to identify lightweight symmetric cipher vulnerabilities.</li>
                                            <li>Integrated classical differential cryptanalysis patterns directly into machine learning model training configurations.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Academic Timeline */}
                            <div className="space-y-4 pt-2">
                                <h4 className="text-[10px] font-mono text-blue-500/80 tracking-[0.3em] uppercase border-b border-white/5 pb-2">Academic Timeline</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                                        <span className="text-[9px] font-mono text-gray-500 tracking-wider">NOV 2022 - MAY 2026</span>
                                        <h5 className="text-sm font-bold text-white mt-1 uppercase tracking-wide">IIIT Delhi [IIITD]</h5>
                                        <p className="text-xs text-blue-400 font-mono mt-0.5">B.Tech in Computer Science &amp; AI</p>
                                    </div>
                                    <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                                        <span className="text-[9px] font-mono text-gray-500 tracking-wider">APR 2019 - MAR 2021</span>
                                        <h5 className="text-sm font-bold text-white mt-1 uppercase tracking-wide">LBS School, R.K. Puram</h5>
                                        <p className="text-xs text-blue-400 font-mono mt-0.5">CBSE 12th Board</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* T2: SKILLS & DOMAINS */}
                    {activeTab === 'skills' && (
                        <div className="space-y-8 animate-fadeIn">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {[
                                    {
                                        category: "Programming",
                                        items: ["Python", "SQL", "C++", "Java", "C"]
                                    },
                                    {
                                        category: "Artificial Intelligence",
                                        items: ["Machine Learning", "Deep Learning", "Generative AI", "Agentic AI", "LLMs", "NLP", "Computer Vision", "RAG", "Multimodal AI"]
                                    },
                                    {
                                        category: "Frameworks & Libraries",
                                        items: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face", "LangChain", "OpenCV", "ROS"]
                                    },
                                    {
                                        category: "Data & Distributed Systems",
                                        items: ["Vector Databases", "Apache Spark", "Neo4j", "Hadoop", "MapReduce"]
                                    },
                                    {
                                        category: "Core CS & Math",
                                        items: ["DSA", "Operating Systems", "DBMS", "Convex Optimization", "Probability & Statistics"]
                                    },
                                    {
                                        category: "Specialized Domains",
                                        items: ["Robotics", "Quantitative Finance", "AI Safety", "Multilingual AI"]
                                    }
                                ].map((skillGroup) => (
                                    <div key={skillGroup.category} className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-4">
                                        <h5 className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">{skillGroup.category}</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {skillGroup.items.map((skill) => (
                                                <span key={skill} className="px-3 py-1 bg-white/10 text-white font-mono text-[9px] uppercase tracking-wider rounded-full hover:bg-blue-600/20 hover:text-blue-300 transition-all cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    )}

                    {/* T3: CERTIFICATIONS & ROLES */}
                    {activeTab === 'certifications' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                            
                            {/* Certifications */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-mono text-blue-500/80 tracking-[0.3em] uppercase border-b border-white/5 pb-2">Academic Credentials</h4>
                                <div className="space-y-3">
                                    {[
                                        { title: "IBM Maitreyee 2025", url: "https://github.com/mrinal22258/Certificates/blob/main/IBM_certificate.pdf" },
                                        { title: "Nestlé E-Learning 2025", url: "https://github.com/mrinal22258/Nestle-E-Learning-2025-Certificate" },
                                        { title: "Self Driving Cars (U. Toronto)", url: "https://github.com/mrinal22258/SDC-Certificate" },
                                        { title: "Functional Programming in Haskell (U. Helsinki)", url: "https://github.com/mrinal22258/Functional-Programming-Certificate" }
                                    ].map((cert) => (
                                        <a 
                                            key={cert.title} 
                                            href={cert.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/20 transition-all rounded-xl"
                                        >
                                            <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">{cert.title}</span>
                                            <FiExternalLink className="text-gray-500 group-hover:text-blue-400 transition-colors" size={14} />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Leadership Roles */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-mono text-blue-500/80 tracking-[0.3em] uppercase border-b border-white/5 pb-2">Leadership &amp; Roles</h4>
                                <div className="relative pl-6 border-l border-white/10 space-y-5">
                                    {[
                                        { role: "Events OC", body: "Odyssey IIIT Delhi Cultural Fest", date: "Jan 2024" },
                                        { role: "Core Member", body: "Evariste IIIT Delhi Math Society", date: "Nov 2022 - Present" },
                                        { role: "Core Member", body: "Audiobytes IIIT Delhi Music Society", date: "Jan 2025 - Present" }
                                    ].map((pos, idx) => (
                                        <div key={idx} className="relative">
                                            <span className="absolute -left-[29px] top-1.5 w-2 h-2 bg-gray-600 rounded-full border border-black"></span>
                                            <div className="flex justify-between items-start flex-wrap gap-1">
                                                <h5 className="text-xs font-bold text-white uppercase tracking-wider">{pos.role}</h5>
                                                <span className="text-[9px] font-mono text-gray-500">{pos.date}</span>
                                            </div>
                                            <p className="text-[11px] text-gray-500 font-mono mt-0.5">{pos.body}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}

                    {/* T4: HONORS & AWARDS */}
                    {activeTab === 'awards' && (
                        <div className="space-y-6 animate-fadeIn">
                            <h4 className="text-[10px] font-mono text-blue-500/80 tracking-[0.3em] uppercase border-b border-white/5 pb-2">Awards &amp; Engagements</h4>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                
                                <a 
                                    href="https://github.com/mrinal22258/Certificates/blob/main/LSR%20certificate%20.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group p-6 bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 rounded-xl flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="text-blue-500 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                            <FiAward size={22} />
                                        </div>
                                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">3rd Place</h4>
                                        <p className="text-gray-500 text-[11px] leading-relaxed">Sherlocked Enigma '25, Lady Shri Ram College. Outperformed 100+ competing teams.</p>
                                    </div>
                                    <span className="text-[9px] font-mono text-blue-400 mt-4 flex items-center gap-1 group-hover:underline">
                                        VIEW CERTIFICATE <FiExternalLink size={10} />
                                    </span>
                                </a>

                                <div className="p-6 bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 rounded-xl">
                                    <div className="text-blue-500 mb-4 opacity-70">
                                        <FiAward size={22} />
                                    </div>
                                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">Core Organizer</h4>
                                    <p className="text-gray-500 text-[11px] leading-relaxed">Math Talk 2024 organized by Math Club (Evariste), drawing over 150+ academic participants.</p>
                                </div>

                                <div className="p-6 bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 rounded-xl">
                                    <div className="text-blue-500 mb-4 opacity-70">
                                        <FiAward size={22} />
                                    </div>
                                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">Core Performer</h4>
                                    <p className="text-gray-500 text-[11px] leading-relaxed">Music Week 2025 hosted by Music Club (Audiobytes) with over 100+ attendees.</p>
                                </div>

                            </div>
                        </div>
                    )}

                </div>

                {/* GitHub & Social Links Footer */}
                <div className="pt-6 flex flex-wrap gap-4 border-t border-white/5">
                    <a href="https://github.com/mrinal22258" target="_blank" rel="noreferrer"
                        className="inline-flex items-center space-x-3 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest transition-all duration-300 rounded-full shadow-lg shadow-blue-900/20">
                        <span>GitHub Profile</span>
                    </a>
                    <a href="https://www.linkedin.com/in/krmrinal/" target="_blank" rel="noreferrer"
                        className="inline-flex items-center space-x-3 px-8 py-3.5 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-full">
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
}
