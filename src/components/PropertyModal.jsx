import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, Check, Video } from 'lucide-react';
import MortgageCalculator from './MortgageCalculator';
import ScheduleTour from './ScheduleTour';

export default function PropertyModal({ property, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTourIndex, setActiveTourIndex] = useState(0);

  const { title, type, price, location, beds, baths, sqft, description, features, images, agent, virtualTour } = property;

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevTour = () => {
    setActiveTourIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNextTour = () => {
    setActiveTourIndex((prev) => (prev === virtualTour.length - 1 ? virtualTour.length - 1 : prev + 1));
  };

  return (
    <motion.div 
      className="modal-overlay" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <motion.div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
      >
        
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-body">
          {/* Image Slider Gallery */}
          <div className="modal-gallery">
            <img 
              src={images[activeImageIndex]} 
              alt={`${title} Gallery ${activeImageIndex}`} 
              className="modal-gallery-img"
            />
            {images.length > 1 && (
              <>
                <button className="gallery-nav-btn gallery-prev" onClick={handlePrevImage}>
                  <ChevronLeft size={24} />
                </button>
                <button className="gallery-nav-btn gallery-next" onClick={handleNextImage}>
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(7, 11, 19, 0.7)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'white' }}>
              {activeImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Modal Grid Info */}
          <div className="modal-info-grid">
            
            {/* Left Column (Details) */}
            <div className="modal-details">
              <div className="modal-header">
                <div className="modal-meta">
                  <span className="accent-badge badge-gold">{type}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ID: LH-0{property.id}</span>
                </div>
                <h2 className="modal-title">{title}</h2>
                <div className="modal-location">
                  <MapPin size={16} className="gold-gradient-text" />
                  {location}
                </div>
                <div className="modal-price">
                  {price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0
                  })}
                </div>
              </div>

              {/* Specs Strip */}
              <div className="modal-specs-strip">
                <div className="spec-item">
                  <Bed size={18} />
                  <span>{beds} Bedrooms</span>
                </div>
                <div className="spec-item">
                  <Bath size={18} />
                  <span>{baths} Bathrooms</span>
                </div>
                <div className="spec-item">
                  <Square size={16} />
                  <span>{sqft.toLocaleString()} Sq Ft</span>
                </div>
              </div>

              {/* Description */}
              <div className="modal-description">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Overview</h3>
                <p>{description}</p>
              </div>

              {/* Features Grid */}
              <div className="modal-features">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Key Amenities</h3>
                <div className="modal-features-list">
                  {features.map((feature, idx) => (
                    <div key={idx} className="feature-tag">
                      <Check size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated 3D Virtual Tour */}
              {virtualTour && virtualTour.length > 0 && (
                <div className="virtual-tour-box">
                  <h3>
                    <Video size={20} className="gold-gradient-text" />
                    Simulated 3D Walkthrough
                  </h3>
                  <div className="virtual-tour-screen">
                    <img 
                      src={virtualTour[activeTourIndex].image} 
                      alt={virtualTour[activeTourIndex].scene} 
                      className="virtual-tour-img"
                    />
                    <div className="virtual-tour-overlay">
                      <span className="accent-badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '8px', fontSize: '0.65rem' }}>
                        {virtualTour[activeTourIndex].scene}
                      </span>
                      <p style={{ color: 'white', fontSize: '0.85rem', lineHeight: '1.4', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                        {virtualTour[activeTourIndex].description}
                      </p>
                    </div>
                  </div>
                  <div className="virtual-tour-controls">
                    <button 
                      className="tour-btn" 
                      onClick={handlePrevTour}
                      disabled={activeTourIndex === 0}
                    >
                      Previous Scene
                    </button>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                      Scene {activeTourIndex + 1} of {virtualTour.length}
                    </span>
                    <button 
                      className="tour-btn" 
                      onClick={handleNextTour}
                      disabled={activeTourIndex === virtualTour.length - 1}
                    >
                      Next Scene
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (Sidebar Contacts / Tools) */}
            <div className="modal-sidebar">
              
              {/* Agent Profile Box */}
              <div className="sidebar-card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Listed By</h3>
                <div className="agent-mini-profile">
                  <img 
                    src={agent.image} 
                    alt={agent.name} 
                    className="agent-mini-img"
                  />
                  <div className="agent-mini-info">
                    <h4>{agent.name}</h4>
                    <p>{agent.role}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <div>Phone: <strong>{agent.phone}</strong></div>
                  <div>Email: <strong>{agent.email}</strong></div>
                </div>
              </div>

              {/* Booking System */}
              <ScheduleTour 
                propertyTitle={title} 
                agentName={agent.name} 
              />

              {/* Mortgage Calculator */}
              <MortgageCalculator basePrice={price} />

            </div>

          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}
