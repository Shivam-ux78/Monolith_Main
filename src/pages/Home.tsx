import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroScene from '../components/HeroScene';
import StageCanvas from '../components/Stages3D';

const stages = [
  { id: 1, title: 'Discovery & Blueprint', desc: 'Analyzing the core objectives to formulate a high-fidelity interaction model.' },
  { id: 2, title: 'Generative Design', desc: 'Crafting premium immersive user interfaces driven by data and light.' },
  { id: 3, title: 'Core Development', desc: 'Engineering robust WebGL and React architectures.' },
  { id: 4, title: 'Secure Testing', desc: 'Ensuring structural integrity across spatial computations.' },
  { id: 5, title: 'System Deployment', desc: 'Launching the digital monolith into global servers.' }
];

const stats = [
  { label: 'PROJECTS SHIPPED', value: '124' },
  { label: 'GLOBAL CLIENTS', value: '42' },
  { label: 'UPTIME GUARANTEE', value: '99.9%' },
  { label: 'HOURS OF INNOVATION', value: '10k+' }
];

const projects = [
  { id: 1, title: 'NEON GRID', desc: 'A cutting-edge Web3 ecommerce platform featuring volumetric product previews.', img: '/cyber_ecommerce.png' },
  { id: 2, title: 'CRYPTO INSIGHT', desc: 'Real-time blockchain analytics visualized through immersive data landscapes.', img: '/crypto_dashboard.png' },
  { id: 3, title: 'AETHERIS AI', desc: 'Next-generation neural engine dashboard with complex structural layouts.', img: '/ai_platform.png' }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const navigate = useNavigate();

  return (
    <div className="relative w-full text-white bg-[#050505]">
      {/* Fixed Hero Background */}
      <motion.div style={{ opacity: heroOpacity }} className="fixed top-0 left-0 w-full h-full pointer-events-none -translate-z-0">
          <HeroScene type="home" />
      </motion.div>

      {/* Main Container */}
      <div className="relative w-full min-h-screen">
          {/* Section 1: Hero */}
          <section className="min-h-screen flex items-center max-w-7xl mx-auto px-12 md:px-24">
            <div className="md:w-1/2 flex flex-col items-start space-y-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glassmorphism rounded-full px-4 py-1.5 inline-flex items-center space-x-3 pointer-events-auto">
                    <span className="w-2 h-2 rounded-full bg-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-pulse"></span>
                    <span className="font-display text-[10px] tracking-widest text-[#b9cac9] uppercase font-bold">Available for Hire</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter">
                    PREMIUM WEB <br />
                    <span className="text-glow text-[#00FFFF]">FREELANCE</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="font-sans text-[#b9cac9] text-base md:text-lg max-w-md leading-relaxed border-l-2 border-[rgba(255,255,255,0.1)] pl-6">
                    I engineer high-performance, immersive 3D websites and digital solutions that elevate your brand beyond the screen.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex space-x-4 pt-4">
                    <button 
                        onClick={() => navigate('/portfolio')}
                        className="glow-btn pointer-events-auto">VIEW PROJECTS</button>
                    <button 
                        onClick={() => {
                            const pipeline = document.getElementById('pipeline');
                            pipeline?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="ghost-btn pointer-events-auto">MY PROCESS</button>
                </motion.div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50">
                    <span className="font-mono text-[10px] tracking-widest uppercase">Explore Services</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#00FFFF] to-transparent"></div>
                </motion.div>
            </div>
          </section>

          {/* Section 1.2: Stats / Global Impact */}
          <section className="bg-[#050505] relative z-20 py-20 border-t border-b border-[rgba(255,255,255,0.05)] overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FFFF]/5 to-transparent"></div>
             <div className="max-w-7xl mx-auto px-12 md:px-24">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                   {stats.map((stat, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col space-y-2"
                      >
                         <span className="font-display text-4xl font-bold text-white tracking-tighter">
                            {stat.value}
                         </span>
                         <span className="font-mono text-[9px] text-[#00FFFF] tracking-widest uppercase opacity-60">
                            {stat.label}
                         </span>
                      </motion.div>
                   ))}
                </div>
             </div>
          </section>

          {/* Section 1.5: Featured Projects Showcase */}
          <section className="bg-[#050505] relative z-10 py-24 border-t border-[rgba(255,255,255,0.05)]">
             <div className="max-w-7xl mx-auto px-12 md:px-24">
                  <motion.div 
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="mb-16 flex flex-col items-center text-center">
                     <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight uppercase text-glow text-[#00FFFF] mb-6">Latest Work</h2>
                     <p className="font-sans text-[#b9cac9] max-w-2xl text-base leading-relaxed border-l-2 border-[rgba(0,255,255,0.3)] pl-6 text-left">
                        I don't just build websites. I engineer digital ecosystems. Explore my recent deployments and high-performance structural layouts.
                     </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {projects.map((proj, idx) => (
                           <motion.div 
                               key={proj.id}
                               initial={{ opacity: 0, scale: 0.95, y: 30 }}
                               whileInView={{ opacity: 1, scale: 1, y: 0 }}
                               viewport={{ once: true, margin: "-50px" }}
                               transition={{ duration: 0.6, delay: idx * 0.2 }}
                               onClick={() => navigate('/portfolio')}
                               className="glassmorphism rounded-md border border-[rgba(0,255,255,0.1)] overflow-hidden group cursor-pointer hover:border-[rgba(0,255,255,0.4)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] flex flex-col"
                           >
                               <div className="h-64 w-full relative overflow-hidden bg-[#0A192F]">
                                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90"></div>
                               </div>
                               <div className="p-8 relative flex-grow flex flex-col">
                                  <div className="w-8 h-[2px] bg-[#00FFFF] mb-4 group-hover:w-16 transition-all duration-300"></div>
                                  <h3 className="font-display text-xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-[#00FFFF] transition-colors">{proj.title}</h3>
                                  <p className="font-sans text-[#b9cac9] text-sm leading-relaxed border-l-2 border-[rgba(255,255,255,0.05)] pl-4 group-hover:border-[rgba(0,255,255,0.3)] transition-colors flex-grow">
                                      {proj.desc}
                                  </p>
                                  <div className="mt-8 flex items-center space-x-2 text-[10px] font-mono text-[#00FFFF] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                      <span>Access Node</span>
                                      <span>&gt;&gt;</span>
                                  </div>
                                </div>
                           </motion.div>
                      ))}
                  </div>
             </div>
          </section>

          {/* Section 1.7: Tech Stack Marquee */}
          <section className="bg-[#050505] relative z-20 py-16 border-t border-b border-[rgba(255,255,255,0.05)] overflow-hidden">
              <div className="flex space-x-12 animate-marquee whitespace-nowrap">
                  {['REACT', 'THREE.JS', 'NEXT.JS', 'TYPESCRIPT', 'WEBGL', 'POCKETBASE', 'FRAMER MOTION', 'TAILWIND'].map((tech, i) => (
                      <div key={i} className="flex items-center space-x-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] shadow-[0_0_5px_#00FFFF]"></div>
                          <span className="font-display text-xl font-bold text-white/20 hover:text-[#00FFFF] transition-colors cursor-default tracking-tighter uppercase">{tech}</span>
                      </div>
                  ))}
                  {/* Duplicate for infinite loop */}
                  {['REACT', 'THREE.JS', 'NEXT.JS', 'TYPESCRIPT', 'WEBGL', 'POCKETBASE', 'FRAMER MOTION', 'TAILWIND'].map((tech, i) => (
                      <div key={i + 10} className="flex items-center space-x-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] shadow-[0_0_5px_#00FFFF]"></div>
                          <span className="font-display text-xl font-bold text-white/20 hover:text-[#00FFFF] transition-colors cursor-default tracking-tighter uppercase">{tech}</span>
                      </div>
                  ))}
              </div>
          </section>

          {/* Section 2: 5 Stages Timeline */}
          <section id="pipeline" className="bg-[#050505] relative z-10 border-t border-[rgba(255,255,255,0.05)]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A192F]/50 to-transparent pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-12 md:px-24 py-32 relative">
                  <motion.div 
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="mb-24 flex items-center space-x-6">
                     <h2 className="font-display text-4xl font-bold tracking-tight uppercase text-glow text-[#00FFFF]">Pipeline &gt;</h2>
                     <div className="h-[1px] w-full max-w-[200px] bg-gradient-to-r from-[#00FFFF] to-transparent opacity-50"></div>
                  </motion.div>

                  <div className="flex flex-col space-y-32">
                      {stages.map((stage, index) => (
                          <motion.div 
                              key={stage.id}
                              initial={{ opacity: 0, y: 100 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-20%" }}
                              transition={{ duration: 0.8 }}
                              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                          >
                              {/* 3D Visual */}
                              <div className="w-full md:w-1/2 flex justify-center">
                                   <StageCanvas stage={stage.id} />
                              </div>
                              
                              {/* Text Detail */}
                              <div className={`w-full md:w-1/2 flex flex-col justify-center space-y-6 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} mt-8 md:mt-0`}>
                                 <div className="flex items-center space-x-4">
                                   <span className="font-mono text-3xl font-bold text-[#00FFFF] opacity-50">0{stage.id}</span>
                                   <h3 className="font-display text-3xl uppercase tracking-widest">{stage.title}</h3>
                                 </div>
                                 <p className="font-sans text-[#b9cac9] text-lg leading-relaxed border-l border-[rgba(0,255,255,0.3)] pl-6">
                                    {stage.desc}
                                 </p>
                              </div>
                          </motion.div>
                      ))}
                  </div>
              </div>
          </section>

          {/* Section 3: Call to Action */}
          <section className="bg-[#050505] relative z-10 py-32 border-t border-[rgba(255,255,255,0.05)]">
             <div className="max-w-4xl mx-auto px-12 md:px-24 text-center">
                 <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8 }}
                     className="glassmorphism p-16 rounded-md border border-[rgba(0,255,255,0.1)] shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden"
                 >
                     {/* Tech accent lines */}
                     <div className="absolute top-0 right-0 w-16 h-[1px] bg-[#00FFFF]" />
                     <div className="absolute top-0 right-0 w-[1px] h-16 bg-[#00FFFF]" />
                     <div className="absolute bottom-0 left-0 w-16 h-[1px] bg-[#00FFFF]" />
                     <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-[#00FFFF]" />

                     <h2 className="font-display text-4xl md:text-5xl font-bold text-glow text-[#00FFFF] mb-6 uppercase tracking-tight">Start Your Project</h2>
                     <p className="font-sans text-[#b9cac9] text-base leading-relaxed mb-12 max-w-lg mx-auto">
                        Send me a message to establish a direct connection and discuss how we can build your next digital masterpiece.
                     </p>
                     
                     <form
                        onSubmit={(e) => {
                           e.preventDefault();
                           navigate('/contact');
                        }}
                        className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 max-w-md mx-auto"
                     >
                         <input 
                            type="email" 
                            required
                            placeholder="Enter your email" 
                            className="bg-[#050505] bg-opacity-80 border border-[rgba(255,255,255,0.2)] text-white px-6 py-3 focus:outline-none focus:border-[#00FFFF] transition-colors font-sans text-sm w-full md:w-auto flex-grow"
                         />
                         <button type="submit" className="glow-btn w-full md:w-auto whitespace-nowrap">INITIATE</button>
                     </form>
                 </motion.div>
             </div>
          </section>
      </div>
    </div>
  );
}
