import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#050505] border-t border-[rgba(255,255,255,0.05)] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:flex-row md:justify-between md:items-center md:gap-0">
         <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-sm bg-[#050505] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#00FFFF] font-display font-bold text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)]">
               M
             </div>
             <span className="font-display text-[#b9cac9] tracking-widest text-xs sm:text-sm font-semibold uppercase">Monolith Agency</span>
         </div>
         
         <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8">
             <a href="#" className="font-sans text-[9px] sm:text-[10px] text-[#b9cac9] uppercase tracking-widest hover:text-[#00FFFF] transition-colors">Twitter</a>
             <a href="#" className="font-sans text-[9px] sm:text-[10px] text-[#b9cac9] uppercase tracking-widest hover:text-[#00FFFF] transition-colors">LinkedIn</a>
             <a href="#" className="font-sans text-[9px] sm:text-[10px] text-[#b9cac9] uppercase tracking-widest hover:text-[#00FFFF] transition-colors">GitHub</a>
         </div>
         
         <p className="font-mono text-[8px] sm:text-[9px] text-[rgba(255,255,255,0.3)] order-last md:order-none">© 2026 MONOLITH. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
