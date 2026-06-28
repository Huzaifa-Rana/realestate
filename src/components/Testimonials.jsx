import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);

  const reviews = [
    {
      name: "Elizabeth & Richard Cole",
      role: "Obsidian Penthouse Buyers",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      quote: "Working with LuxeHaven to secure our Manhattan penthouse was absolute perfection. Sophia understood our need for strict privacy and facilitated a flawless, off-market transaction. The attention to detail is second to none.",
      stars: 5
    },
    {
      name: "Dr. Alistair Sterling",
      role: "Serenity Bay Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      quote: "The virtual walkthrough allowed us to preview every inch of Serenity Bay from Zurich. When we flew in to see it in person, it matched the digital layout exactly. Marcus Vance is the gold standard of real estate brokers.",
      stars: 5
    },
    {
      name: "Victoria H. Vance",
      role: "Luxury Real Estate Developer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      quote: "As a developer, I require absolute professionalism. Ethan Cross has represented three of my luxury residential projects, producing record-breaking sales margins. I recommend them without reservation.",
      stars: 5
    }
  ];

  // Auto-advance slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setActiveSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    } else if (info.offset.x > swipeThreshold) {
      setActiveSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    }
  };

  return (
    <section className="testimonials-section" id="testimonials" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div className="section-header">
          <p>Client Endorsements</p>
          <h2>Stories of Exceptional Living</h2>
        </div>

        <div className="testimonial-carousel" style={{ position: 'relative', width: '100%', minHeight: '340px' }}>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeSlide}
              className="testimonial-card glass-panel"
              style={{ 
                margin: '0 auto', 
                maxWidth: '740px', 
                padding: '40px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
                background: 'var(--bg-surface)',
                cursor: 'grab' 
              }}
              
              // Slide transitions
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              
              // Touch Drag swipe configurations
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={handleDragEnd}
              whileDrag={{ cursor: 'grabbing', scale: 0.98 }}
            >
              <Quote size={40} className="quote-icon" style={{ margin: '0 auto 16px', opacity: 0.15, color: 'var(--color-gold)' }} />
              
              {/* Stars */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
                {[...Array(reviews[activeSlide].stars)].map((_, i) => (
                  <Star key={i} size={15} fill="var(--color-gold)" color="var(--color-gold)" />
                ))}
              </div>

              <p className="testimonial-text" style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: '400', marginBottom: '30px', color: 'var(--text-primary)', lineHeight: '1.6', fontStyle: 'italic', textAlign: 'center' }}>
                "{reviews[activeSlide].quote}"
              </p>

              <div className="client-profile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <img 
                  src={reviews[activeSlide].image} 
                  alt={reviews[activeSlide].name} 
                  className="client-img"
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div className="client-info" style={{ textAlign: 'left' }}>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '700' }}>{reviews[activeSlide].name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{reviews[activeSlide].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Sliders Dots Indicators */}
        <div className="carousel-indicators" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          {reviews.map((_, index) => (
            <div 
              key={index} 
              className={`carousel-dot ${activeSlide === index ? 'active' : ''}`}
              style={{ 
                width: activeSlide === index ? '24px' : '8px', 
                height: '8px', 
                background: activeSlide === index ? 'var(--color-gold)' : 'rgba(178, 142, 104, 0.2)',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onClick={() => setActiveSlide(index)}
              role="button"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
