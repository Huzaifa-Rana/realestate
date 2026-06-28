import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero({ onSearch }) {
  const [type, setType] = useState('All');
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=80",
      title: "Malibu Beachfront Reserve",
      tag: "Coastal Sanctuary"
    },
    {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
      title: "The Obsidian Sky Loft",
      tag: "Manhattan Penthouse"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
      title: "Aura Alpine Chalet",
      tag: "Aspen Mountain Retreat"
    }
  ];

  // Auto transition slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      type,
      location,
      maxPrice: maxPrice ? Number(maxPrice) : 0
    });
    
    const listingsSection = document.getElementById('listings');
    if (listingsSection) {
      listingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="hero-section" id="home" style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* 1. Full-Screen Background Image Slideshow with Cross-Fade */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <AnimatePresence>
          <motion.div
            key={activeSlide}
            style={{ position: 'absolute', inset: 0 }}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          >
            <img 
              src={slides[activeSlide].image} 
              alt={slides[activeSlide].title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark Vignette Overlay for Title Contrast & Elegance */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10, 8, 6, 0.7) 0%, rgba(10, 8, 6, 0.25) 65%, rgba(10, 8, 6, 0) 100%)', zIndex: 1 }} />
      </div>

      {/* 2. Floating Centered Typography & Search Overlays */}
      <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        {/* Tagline */}
        <motion.div 
          className="hero-tag-responsive"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="pulse-dot" style={{ background: 'var(--color-gold)', boxShadow: '0 0 8px var(--color-gold-glow)' }}></span>
          LuxeHaven Private pocket Ledger
        </motion.div>
        
        {/* Mobile-only active slide indicator */}
        <motion.div 
          className="hero-mobile-slide-title"
          key={activeSlide}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {slides[activeSlide].tag} — {slides[activeSlide].title}
        </motion.div>
        
        {/* Giant Editorial Heading */}
        <motion.h1 
          className="hero-title-responsive"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Living as an <span style={{ fontWeight: '800', letterSpacing: '-0.02em' }} className="gold-gradient-text">Art Form.</span>
        </motion.h1>
        
        {/* Editorial Subtext */}
        <motion.p 
          className="hero-description-responsive"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Discover an elite, off-market register of coastal sanctuaries, high-altitude chalets, and skyline penthouses curated for individuals who value design and absolute privacy.
        </motion.p>

        {/* Floating Minimalist Search Panel */}
        <motion.div 
          className="hero-search-wrapper" 
          style={{ 
            background: 'rgba(18, 16, 14, 0.55)',
            border: '1px solid rgba(255, 255, 255, 0.12)', 
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            padding: '10px 14px 10px 10px',
            borderRadius: 'var(--radius-md)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            width: '100%',
            maxWidth: '820px'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3, type: "spring", stiffness: 90 }}
          whileHover={{ borderColor: 'rgba(255,255,255,0.25)', scale: 1.01 }}
        >
          <form onSubmit={handleSearchSubmit} className="hero-search-form-responsive">
            
            {/* Location */}
            <div className="search-input-group" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.12)', textAlign: 'left', padding: '0 12px' }}>
              <label htmlFor="hero-location" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', fontSize: '0.68rem', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '4px' }}>
                <MapPin size={11} style={{ color: 'var(--color-gold)' }} />
                Location
              </label>
              <input 
                type="text" 
                id="hero-location"
                placeholder="Malibu, Aspen..." 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="hero-search-input"
                style={{ color: '#ffffff', background: 'transparent', border: 'none', width: '100%', fontSize: '0.85rem' }}
              />
            </div>

            {/* Type */}
            <div className="search-input-group" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.12)', textAlign: 'left', padding: '0 12px' }}>
              <label htmlFor="hero-type" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', fontSize: '0.68rem', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '4px' }}>
                <Building size={11} style={{ color: 'var(--color-gold)' }} />
                Residence
              </label>
              <select 
                id="hero-type"
                value={type} 
                onChange={(e) => setType(e.target.value)}
                style={{ color: '#ffffff', background: 'transparent', border: 'none', width: '100%', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                <option value="All" style={{ background: '#1c1a17', color: '#ffffff' }}>All Types</option>
                <option value="Villa" style={{ background: '#1c1a17', color: '#ffffff' }}>Villas</option>
                <option value="Apartment" style={{ background: '#1c1a17', color: '#ffffff' }}>Apartments</option>
                <option value="House" style={{ background: '#1c1a17', color: '#ffffff' }}>Houses</option>
                <option value="Penthouse" style={{ background: '#1c1a17', color: '#ffffff' }}>Penthouses</option>
              </select>
            </div>

            {/* Budget */}
            <div className="search-input-group" style={{ borderRight: 'none', textAlign: 'left', padding: '0 12px' }}>
              <label htmlFor="hero-budget" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', fontSize: '0.68rem', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '4px' }}>
                <DollarSign size={11} style={{ color: 'var(--color-gold)' }} />
                Max Budget
              </label>
              <select 
                id="hero-budget"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ color: '#ffffff', background: 'transparent', border: 'none', width: '100%', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                <option value="" style={{ background: '#1c1a17', color: '#ffffff' }}>No Limit</option>
                <option value="2000000" style={{ background: '#1c1a17', color: '#ffffff' }}>$2.0 Million</option>
                <option value="4000000" style={{ background: '#1c1a17', color: '#ffffff' }}>$4.0 Million</option>
                <option value="6000000" style={{ background: '#1c1a17', color: '#ffffff' }}>$6.0 Million</option>
                <option value="9000000" style={{ background: '#1c1a17', color: '#ffffff' }}>$9.0 Million</option>
                <option value="15000000" style={{ background: '#1c1a17', color: '#ffffff' }}>$15.0 Million</option>
              </select>
            </div>

            {/* Submit button */}
            <button 
              type="submit" 
              className="hero-submit-btn" 
              aria-label="Search listings"
            >
              <Search size={18} />
              <span className="search-btn-text">Search Residences</span>
            </button>

          </form>
        </motion.div>

        {/* Current Active Slide Label - Shifted up from bottom fade to ensure perfect contrast */}
        <div className="hero-active-slide-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
          <span className="accent-badge badge-gold" style={{ fontSize: '0.65rem', padding: '4px 10px', textShadow: 'none', background: 'rgba(18, 16, 14, 0.4)', backdropFilter: 'blur(4px)' }}>
            {slides[activeSlide].tag}
          </span>
          <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.75)', fontWeight: '500', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            — {slides[activeSlide].title}
          </span>
        </div>

      </div>

      {/* 3. Slider Nav Controls (Large Floating Edge Targets) */}
      <button 
        onClick={handlePrevSlide} 
        className="hero-nav-btn-responsive"
        style={{ position: 'absolute', left: '30px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'background 0.3s' }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={handleNextSlide} 
        className="hero-nav-btn-responsive"
        style={{ position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'background 0.3s' }}
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

    </header>
  );
}
