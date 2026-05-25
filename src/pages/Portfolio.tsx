import React from 'react';
import HeroScene from '../components/HeroScene';

export default function Portfolio() {
  return (
    <div className="relative w-full min-h-screen text-white pt-32 pb-24">
      <HeroScene type="portfolio" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-12 md:px-24">
          <div className="flex items-center mb-16 space-x-6">
              <h2 className="font-display text-4xl font-bold tracking-tight uppercase text-glow text-[#00FFFF]">Index &gt;</h2>
              <div className="h-[1px] w-full max-w-[200px] bg-gradient-to-r from-[#00FFFF] to-transparent opacity-50"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {[1, 2, 3, 4, 5, 6].map((item) => (
                   <div key={item} className="flex flex-col group cursor-pointer slide-up">
                        <div className="w-full aspect-[4/3] bg-[#050505] border border-[rgba(255,255,255,0.05)] rounded-md mb-4 relative overflow-hidden transition-all duration-500 group-hover:border-[rgba(0,255,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                             <div className="absolute inset-0 bg-gradient-to-br from-[#050505] to-[#0A192F] opacity-80 group-hover:opacity-40 transition-opacity"></div>
                             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 glassmorphism border-0">
                                 <div className="w-8 h-8 rounded-full border border-[#00FFFF] flex items-center justify-center mb-2 shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                                     <div className="w-1 h-1 rounded-full bg-[#00FFFF]"></div>
                                 </div>
                                 <span className="font-display text-[#00FFFF] tracking-widest text-xs font-bold uppercase text-glow">Link Established</span>
                             </div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                               <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-[#00FFFF] transition-colors">PROJECT 0{item}</h3>
                               <p className="font-sans text-[10px] text-[#b9cac9] uppercase tracking-widest opacity-60">Web / Immersive / XR</p>
                            </div>
                            <span className="font-mono text-xs text-[#00FFFF] opacity-50">SYS.26</span>
                        </div>
                   </div>
               ))}
          </div>
      </div>
    </div>
  );
}
