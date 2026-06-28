import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeTheme, onThemeToggle }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'listings', label: 'Residences' },
    { id: 'agents', label: 'Advisors' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQs' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'listings', 'agents', 'testimonials', 'faq', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setIsMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container">
        
        {/* Brand Logo */}
        <div className="nav-brand" onClick={() => handleLinkClick('home')}>
          <Building2 size={24} className="gold-gradient-text" style={{ display: 'inline', marginRight: '8px' }} />
          <span>Luxe</span>Haven
        </div>

        {/* Links Navigation */}
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id} style={{ position: 'relative' }}>
              <span 
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleLinkClick(item.id)}
              >
                {item.label}
              </span>
              
              {/* Sliding Active Underline Indicator */}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="activeNavbarIndicator"
                  className="nav-active-line"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--color-gold)',
                    borderRadius: '2px',
                    boxShadow: '0 0 8px var(--color-gold-glow)'
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Theme and Mobile Menu Toggle */}
        <div className="nav-actions">
          <button 
            className="theme-toggle" 
            onClick={onThemeToggle}
            aria-label="Toggle Theme"
          >
            {activeTheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <button 
            className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>
    </motion.nav>
  );
}
