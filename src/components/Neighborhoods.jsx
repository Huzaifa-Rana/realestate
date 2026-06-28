import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function Neighborhoods() {
  const regions = [
    {
      name: "Malibu Beachfront",
      listings: "12 Private Properties",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      avgPrice: "$12.4M Avg",
      tag: "Coastal Luxury"
    },
    {
      name: "Aspen Alpine Peaks",
      listings: "8 Alpine Chalets",
      image: "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=600&q=80",
      avgPrice: "$9.2M Avg",
      tag: "Alpine Retreat"
    },
    {
      name: "Manhattan Sky Lofts",
      listings: "15 Sky Penthouses",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80",
      avgPrice: "$14.8M Avg",
      tag: "Skyline Sanctum"
    },
    {
      name: "Saint-Tropez Coast",
      listings: "6 Off-Market Estates",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
      avgPrice: "$18.5M Avg",
      tag: "European Riviera"
    }
  ];

  return (
    <section className="neighborhoods-section" id="neighborhoods" style={{ padding: '100px 0', background: 'var(--bg-surface-elevated)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        
        <div className="section-header">
          <p>Elite Enclaves</p>
          <h2>Featured Destinations</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
          {regions.map((region, idx) => (
            <motion.div
              key={idx}
              className="neighborhood-card"
              style={{
                position: 'relative',
                height: '380px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ 
                y: -6,
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {/* Background Image */}
              <img 
                src={region.image} 
                alt={region.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                className="hover-zoom-img"
              />

              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18, 16, 14, 0.85) 0%, rgba(18, 16, 14, 0.2) 60%, transparent 100%)', zIndex: 1 }} />

              {/* Tag */}
              <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
                <span className="accent-badge badge-gold" style={{ fontSize: '0.6rem', padding: '4px 8px', textShadow: 'none', background: 'rgba(18, 16, 14, 0.6)', backdropFilter: 'blur(4px)' }}>
                  {region.tag}
                </span>
              </div>

              {/* Bottom Details Overlay */}
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 10, color: 'white' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-gold)', fontWeight: '750' }}>
                  {region.listings}
                </span>
                <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', fontWeight: '400', color: 'white', marginTop: '4px', marginBottom: '8px' }}>
                  {region.name}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', opacity: 0.9 }}>
                  <span>{region.avgPrice}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-gold)' }}>
                    <span>Explore</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .neighborhood-card:hover .hover-zoom-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
