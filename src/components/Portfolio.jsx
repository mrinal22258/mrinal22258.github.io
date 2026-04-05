import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

const projectData = [
  {
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800",
    title: "Gendered Abuse Detection",
    tags: ["CNN-BiLSTM", "GRU-Attention", "NLP", "Multilingual"],
    desc: "Deep learning models for detecting gendered & explicit abuse in English, Hindi, and Tamil tweets using the ICON23 shared task dataset.",
    github: "https://github.com/mrinal22258/Gendered-Abuse-Detection-in-Indic-Languages",
    link: "https://www.kaggle.com/competitions/gendered-abuse-detection-shared-task/data",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    title: "TurtleBot Visual Servoing",
    tags: ["ROS", "Computer Vision", "Robotics", "OpenCV"],
    desc: "Visual servoing system enabling TurtleBot to track and follow moving objects using real-time camera feedback and motion control algorithms.",
    github: "https://github.com/mrinal22258/Robotics",
    link: "https://github.com/mrinal22258/Robotics",
  },
  {
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    title: "Diabetes Risk Prediction",
    tags: ["ML", "Hypothesis Testing", "BRFSS 2015", "Data Science"],
    desc: "Statistical inference and ML pipeline on BRFSS 2015 data to identify significant risk factors for diabetes, with visualization and model training.",
    github: "https://github.com/mrinal22258/Data-Science",
    link: "https://github.com/mrinal22258/Data-Science",
  },
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    title: "Big Data Analytics",
    tags: ["Apache Spark", "Hadoop", "Giraph", "Neo4j"],
    desc: "Distributed data processing and graph analytics pipelines using Spark, Hadoop, MapReduce, Giraph, and Neo4j for large-scale dataset analysis.",
    github: "https://github.com/mrinal22258/Big-Data-Analytics",
    link: "https://github.com/mrinal22258/Big-Data-Analytics",
  },
];

const Portfolio = () => {
  return (
    <section id="projects" className="bg-[#020202] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-blue-500 font-mono tracking-[0.4em] uppercase text-[10px] mb-4"
        >
          Project Showcase
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter"
        >
          Selected Works<span className="text-blue-500">.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {projectData.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="relative overflow-hidden aspect-[16/9] m-2 rounded-xl">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-8">
              <h3 className="text-xl font-black text-white mb-2 tracking-tight uppercase">{project.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[9px] uppercase tracking-widest font-mono px-3 py-1 bg-white/10 text-blue-300 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 bg-white/5 text-white rounded-xl hover:bg-blue-600 transition-all border border-white/10">
                  <FiGithub size={18} />
                </a>
                <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="External Link" className="p-3 bg-white/5 text-white rounded-xl hover:bg-blue-600 transition-all border border-white/10">
                  <FiExternalLink size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
