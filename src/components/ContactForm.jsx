import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle2, Send } from 'lucide-react';

export default function ContactForm({ prefilledMessage }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prefill message if selected from Agent card
  useEffect(() => {
    if (prefilledMessage) {
      setMessage(prefilledMessage);
    }
  }, [prefilledMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;
    setIsSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact" style={{ padding: '100px 0' }}>
      <div className="container">
        
        <div className="section-header">
          <p>Get In Touch</p>
          <h2>Acquire Your Sanctuary</h2>
        </div>

        {/* Scroll reveal contact panel */}
        <motion.div 
          className="contact-grid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            background: 'var(--bg-surface)', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)' 
          }}
        >
          
          {/* Left Info Panel (Sophisticated Obsidian Card with Forced White Text for Contrast) */}
          <div 
            className="contact-info-panel"
            style={{ 
              background: 'linear-gradient(135deg, #2a2521 0%, #13110f 100%)', 
              padding: '50px', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              color: '#ffffff'
            }}
          >
            <div>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: '400', marginBottom: '16px', color: '#ffffff' }}>
                LuxeHaven Advisory Desk
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '40px' }}>
                Contact our private concierge desk to discover off-market ledger listings, schedule viewings, or consult our brokers.
              </p>

              {/* Info Items */}
              <div className="contact-info-item" style={{ display: 'flex', gap: '16px', marginBottom: '30px' }}>
                <div className="contact-info-icon" style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(178, 142, 104, 0.15)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={18} />
                </div>
                <div className="contact-info-text">
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px' }}>Headquarters</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem' }}>844 Ocean Drive, Malibu, CA 90265</p>
                </div>
              </div>

              <div className="contact-info-item" style={{ display: 'flex', gap: '16px', marginBottom: '30px' }}>
                <div className="contact-info-icon" style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(178, 142, 104, 0.15)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={18} />
                </div>
                <div className="contact-info-text">
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px' }}>Direct Consultation Line</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem' }}>+1 (555) 019-9000</p>
                </div>
              </div>

              <div className="contact-info-item" style={{ display: 'flex', gap: '16px', marginBottom: '30px' }}>
                <div className="contact-info-icon" style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(178, 142, 104, 0.15)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={18} />
                </div>
                <div className="contact-info-text">
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px' }}>General Inquiries</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem' }}>concierge@luxehaven.com</p>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)' }}>
              &copy; {new Date().getFullYear()} LuxeHaven Estates. All rights reserved.
            </p>
          </div>

          {/* Right Form Panel */}
          <div className="contact-form-panel" style={{ padding: '50px', background: 'var(--bg-surface)' }}>
            {isSubmitted ? (
              <div className="form-success-box" style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={64} style={{ color: 'var(--color-emerald)', marginBottom: '20px', margin: '0 auto 20px' }} />
                <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: '400', marginBottom: '12px', color: 'var(--text-primary)' }}>Message Received</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 24px', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Thank you, <strong>{fullName}</strong>. Your inquiry has been forwarded to our lead advisors. A specialist will contact you shortly.
                </p>
                <button 
                  className="btn-secondary" 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
                
                {/* Full Name */}
                <div className="floating-form-group">
                  <input 
                    type="text" 
                    id="contact-name"
                    required
                    placeholder=" "
                    className="floating-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <label htmlFor="contact-name" className="floating-label">Full Name</label>
                </div>

                {/* Email Address */}
                <div className="floating-form-group">
                  <input 
                    type="email" 
                    id="contact-email"
                    required
                    placeholder=" "
                    className="floating-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="contact-email" className="floating-label">Email Address</label>
                </div>

                {/* Phone Number */}
                <div className="floating-form-group">
                  <input 
                    type="tel" 
                    id="contact-phone"
                    placeholder=" "
                    className="floating-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label htmlFor="contact-phone" className="floating-label">Phone Number (Optional)</label>
                </div>

                {/* Message Text */}
                <div className="floating-form-group">
                  <textarea 
                    id="contact-message"
                    required
                    rows="4"
                    placeholder=" "
                    className="floating-input"
                    style={{ resize: 'vertical' }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <label htmlFor="contact-message" className="floating-label">Tell us about your requirements...</label>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn-primary" style={{ width: '100%', gap: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={16} />
                  Send Advisory Inquiry
                </button>

              </form>
            )}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
