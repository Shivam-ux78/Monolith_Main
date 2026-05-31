import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Mail, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ width: '80px' }}
        animate={{ width: isOpen ? '240px' : '80px' }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="hidden md:flex fixed left-0 top-0 h-full z-50 glassmorphism flex-col justify-between py-8 overflow-hidden border-r border-r-[rgba(255,255,255,0.05)]"
      >
        <div className="flex flex-col items-center w-full">
          <div className="w-full flex justify-center mb-16 gap-x-1 gap-y-1 px-2 flex-wrap">
            <div className="w-10 h-10 rounded-sm bg-[#050505] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#00FFFF] font-display font-bold text-xl shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              M
            </div>
            {isOpen && "AME".split('').map((letter, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 rounded-sm bg-[#050505] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#00FFFF] font-display font-bold text-xl shadow-[0_0_15px_rgba(0,255,255,0.3)]"
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

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-b-[rgba(255,255,255,0.05)] px-4 py-4 flex justify-between items-center"
      >
        <div className="w-10 h-10 rounded-sm bg-[#050505] border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[#00FFFF] font-display font-bold text-lg shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          M
        </div>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white hover:text-[#00FFFF] transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -20 }}
        transition={{ duration: 0.2 }}
        className={`md:hidden fixed top-16 left-0 right-0 z-40 glassmorphism border-b border-b-[rgba(255,255,255,0.05)] ${mobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="flex flex-col space-y-4 px-4 py-4">
          <NavItemMobile to="/" icon={<Home size={20} />} label="HOME" onClick={() => setMobileMenuOpen(false)} />
          <NavItemMobile to="/portfolio" icon={<Briefcase size={20} />} label="PORTFOLIO" onClick={() => setMobileMenuOpen(false)} />
          <NavItemMobile to="/contact" icon={<Mail size={20} />} label="CONTACT" onClick={() => setMobileMenuOpen(false)} />
        </div>
      </motion.div>
    </>
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

const NavItemMobile = ({ to, icon, label, onClick }: { to: string, icon: React.ReactNode, label: string, onClick: () => void }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => `
      flex items-center space-x-3 text-[#b9cac9] hover:text-white transition-colors duration-300 py-2 px-2 rounded
      ${isActive ? 'text-[#00FFFF] drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] bg-[rgba(0,255,255,0.05)]' : 'hover:bg-[rgba(255,255,255,0.05)]'}
    `}
  >
    <div className="flex justify-center">{icon}</div>
    <span className="font-display tracking-[0.05em] uppercase text-sm">
      {label}
    </span>
  </NavLink>
);
