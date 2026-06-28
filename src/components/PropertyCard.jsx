import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

export default function PropertyCard({ property, onSelect }) {
  const { title, type, price, location, beds, baths, sqft, tag, images } = property;

  // Format price: e.g., 4850000 -> $4,850,000
  const formattedPrice = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  const getTagBadgeClass = (tag) => {
    switch (tag.toLowerCase()) {
      case 'trending': return 'badge-trending';
      case 'new': return 'badge-new';
      default: return 'badge-gold';
    }
  };

  return (
    <motion.div 
      className="property-card glass-panel hover-zoom-container" 
      onClick={() => onSelect(property)}
      
      // Viewport Reveal Animation
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      
      // Spring Hover Scaling & Shadow depth
      whileHover={{ 
        y: -10,
        borderColor: 'var(--color-gold)',
        boxShadow: 'var(--shadow-lg), 0 0 20px var(--color-gold-glow)',
        scale: 1.015
      }}
      whileTap={{ scale: 0.98 }}
      style={{ 
        cursor: 'pointer', 
        overflow: 'hidden', 
        border: '1px solid var(--border-color)',
        background: 'var(--bg-surface)' 
      }}
    >
      <div className="card-img-container" style={{ borderBottom: '1px solid var(--border-color)', overflow: 'hidden', height: '240px', position: 'relative' }}>
        {tag && (
          <div className={`accent-badge card-badge ${getTagBadgeClass(tag)}`} style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10 }}>
            {tag}
          </div>
        )}
        <img 
          src={images[0]} 
          alt={title} 
          className="card-img hover-zoom-img" 
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="card-price-badge" style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', zIndex: 10 }}>
          {formattedPrice}
        </div>
      </div>
      <div className="card-content" style={{ padding: '24px' }}>
        <div className="card-location" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          <MapPin size={12} style={{ color: 'var(--color-gold)' }} />
          {location}
        </div>
        <h3 className="card-title" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: '400', marginBottom: '16px', color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <div className="card-specs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <div className="spec-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <Bed size={16} style={{ color: 'var(--color-gold)' }} />
            <span>{beds} Beds</span>
          </div>
          <div className="spec-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <Bath size={16} style={{ color: 'var(--color-gold)' }} />
            <span>{baths} Baths</span>
          </div>
          <div className="spec-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <Square size={14} style={{ color: 'var(--color-gold)' }} />
            <span>{sqft.toLocaleString()} Sq Ft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
