import React, { useState } from 'react';
import { Building2, Send } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
  };

  const handleLinkClick = (id) => {
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
    <footer className="footer">
      <div className="container">
        
        <div className="footer-grid">
          
          {/* Column 1: Brand Info */}
          <div className="footer-column">
            <div className="footer-logo">
              <Building2 size={24} className="gold-gradient-text" style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>Luxe</span>
              <span style={{ fontWeight: '300', verticalAlign: 'middle' }}>Haven</span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Curating exceptional lifestyles through elite, high-performance real estate advisory.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon-btn" aria-label="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="Twitter">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="Instagram">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="LinkedIn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-column">
            <h3>Explore</h3>
            <ul className="footer-links">
              <li><span style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('home')}>Home Portal</span></li>
              <li><span style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('listings')}>Premium Residences</span></li>
              <li><span style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('agents')}>Elite Advisory Team</span></li>
              <li><span style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('testimonials')}>Client Endorsements</span></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="footer-column">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><span style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('faq')}>Common FAQs</span></li>
              <li><a href="#">Privacy Directives</a></li>
              <li><a href="#">Terms & Agreements</a></li>
              <li><a href="#">Security Protocols</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-column">
            <h3>Newsletter</h3>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
              Subscribe to receive private notification of off-market pocket listings.
            </p>
            {isSubscribed ? (
              <div style={{ marginTop: '16px', color: 'var(--color-emerald)', fontSize: '0.85rem', fontWeight: '600' }}>
                Subscription Confirmed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter email address..." 
                  required
                  className="newsletter-input"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" className="search-btn" style={{ width: '48px', height: '48px' }} aria-label="Subscribe to newsletter">
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>Designed for Luxury Portfolios. Powered by Vite & React.</p>
          <p>Broker License ID: #983-289-LA. LuxeHaven Estates.</p>
        </div>

      </div>
    </footer>
  );
}
