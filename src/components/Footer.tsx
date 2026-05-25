import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-12 md:px-24 bg-[#050505] border-t border-[rgba(255,255,255,0.05)] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
         <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-sm bg-[#050505] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#00FFFF] font-display font-bold text-sm shadow-[0_0_10px_rgba(0,255,255,0.2)]">N</div>
             <span className="font-display text-[#b9cac9] tracking-widest text-sm font-semibold uppercase">NAME AGENCY</span>
         </div>
         
         <div className="flex space-x-8">
             <a href="#" className="font-sans text-[10px] text-[#b9cac9] uppercase tracking-widest hover:text-[#00FFFF] transition-colors">Twitter</a>
             <a href="#" className="font-sans text-[10px] text-[#b9cac9] uppercase tracking-widest hover:text-[#00FFFF] transition-colors">LinkedIn</a>
             <a href="#" className="font-sans text-[10px] text-[#b9cac9] uppercase tracking-widest hover:text-[#00FFFF] transition-colors">GitHub</a>
         </div>
         
         <p className="font-mono text-[10px] text-[rgba(255,255,255,0.3)]">© 2026 NAME. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
