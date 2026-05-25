import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ width: '80px' }}
      animate={{ width: isOpen ? '240px' : '80px' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="fixed left-0 top-0 h-full z-50 glassmorphism flex flex-col justify-between py-8 overflow-hidden border-r-0 border-t-0 border-b-0 border-l-0 border-r-[rgba(255,255,255,0.05)]"
    >
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center mb-16 gap-x-1 gap-y-1 px-2 flex-wrap">
          <div className="w-10 h-10 rounded-sm bg-[#050505] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#00FFFF] font-display font-bold text-xl shadow-[0_0_15px_rgba(0,255,255,0.3)] min-w-[40px]">N</div>
          {isOpen && "AME".split('').map((letter, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 rounded-sm bg-[#050505] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#00FFFF] font-display font-bold text-xl shadow-[0_0_15px_rgba(0,255,255,0.3)] min-w-[10px]"
            >
              {letter}
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col space-y-8 w-full px-6">
          <NavItem to="/" icon={<Home size={24} />} label="HOME" isOpen={isOpen} />
          <NavItem to="/portfolio" icon={<Briefcase size={24} />} label="PORTFOLIO" isOpen={isOpen} />
          <NavItem to="/contact" icon={<Mail size={24} />} label="CONTACT" isOpen={isOpen} />
        </div>
      </div>


    </motion.nav>
  );
}

const NavItem = ({ to, icon, label, isOpen }: { to: string, icon: React.ReactNode, label: string, isOpen: boolean }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center space-x-4 text-[#b9cac9] hover:text-white transition-colors duration-300 w-full
      ${isActive ? 'text-[#00FFFF] drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]' : ''}
    `}
  >
    <div className="min-w-[24px] flex justify-center">{icon}</div>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className="font-display tracking-[0.1em] uppercase text-sm whitespace-nowrap"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      {label}
    </motion.span>
  </NavLink>
);
