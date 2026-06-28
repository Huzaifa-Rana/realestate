import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Eye } from 'lucide-react';

export default function Philosophy() {
  return (
    <section className="philosophy-section" id="philosophy" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div className="philosophy-grid-responsive">
          
          {/* Left Column - Copy & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: '750', fontSize: '0.75rem', marginBottom: '16px' }}>
              Our Philosophy
            </p>
            <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: '300', lineHeight: '1.2', marginBottom: '32px' }}>
              Preserving Privacy. <br />
              Elevating Architecture.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '24px' }}>
              LuxeHaven was founded on a singular premise: that the acquisition of extraordinary architecture should be handled with the same care and discretion as fine art. We do not participate in public directories or mass listings.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '40px' }}>
              Through our private pocket ledger, we orchestrate direct matches between verified buyers and architectural estates, preserving confidentiality and asset integrity at every step.
            </p>

            {/* Core Values Strip */}
            <div className="philosophy-values-responsive">
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '10px', background: 'var(--color-gold-light)', borderRadius: 'var(--radius-sm)', color: 'var(--color-gold)' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>Guaranteed Privacy</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Complete NDA preservation and off-market catalog processing.</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '10px', background: 'var(--color-gold-light)', borderRadius: 'var(--radius-sm)', color: 'var(--color-gold)' }}>
                  <Eye size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>Verified Registers</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>Direct coordination with verified estates and private equity assets.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Asymmetric Multi-Image Stack */}
          <div style={{ position: 'relative', width: '100%', height: '480px' }}>
            <motion.div 
              style={{ position: 'absolute', top: 0, left: 0, width: '80%', height: '85%', zIndex: 1, overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                alt="Living room detail" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>

            <motion.div 
              style={{ position: 'absolute', bottom: 0, right: 0, width: '55%', height: '60%', zIndex: 2, overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '4px solid var(--bg-app)', boxShadow: 'var(--shadow-lg)' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80" 
                alt="Modern villa detail" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
