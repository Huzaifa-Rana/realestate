import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import PropertyGrid from './components/PropertyGrid';
import PropertyModal from './components/PropertyModal';
import Neighborhoods from './components/Neighborhoods';
import AgentSection from './components/AgentSection';
import Concierge from './components/Concierge';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { propertiesData } from './data/propertiesData';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);
  const [prefilledMessage, setPrefilledMessage] = useState('');

  // Synchronize theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('luxehaven-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('luxehaven-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSearch = (filterData) => {
    setSearchFilter(filterData);
  };

  const handleAgentSelect = (agentName) => {
    setPrefilledMessage(
      `Hi ${agentName}, I was browsing LuxeHaven's premium residences and would love to consult with you about available properties matching my profile. Please contact me at your earliest convenience.`
    );
  };

  return (
    <>
      {/* Ambient background graphics */}
      <div className="grid-overlay"></div>
      <div className="glow-container">
        <div className="glow-circle glow-1"></div>
        <div className="glow-circle glow-2"></div>
        <div className="glow-circle glow-3"></div>
      </div>

      <Navbar activeTheme={theme} onThemeToggle={handleThemeToggle} />
      
      <main>
        {/* Hero Landing & Filtering System */}
        <Hero onSearch={handleSearch} />
        
        {/* Brand story / Philosophy */}
        <Philosophy />
        
        {/* Listings Catalog */}
        <PropertyGrid 
          properties={propertiesData} 
          onSelectProperty={setSelectedProperty} 
          globalFilter={searchFilter}
        />
        
        {/* Featured Neighborhoods Showcase */}
        <Neighborhoods />
        
        {/* Agent Team */}
        <AgentSection onAgentSelect={handleAgentSelect} />
        
        {/* Luxury VIP Lifestyle Concierge */}
        <Concierge />
        
        {/* Testimonials Slides */}
        <Testimonials />
        
        {/* Frequently Asked Questions */}
        <Faq />
        
        {/* Contact Form */}
        <ContactForm prefilledMessage={prefilledMessage} />
      </main>

      {/* Foot navigation */}
      <Footer />

      {/* Lightbox / Details Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
