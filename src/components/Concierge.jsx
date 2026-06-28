import React from 'react';
import { motion } from 'framer-motion';
import { Plane, ShieldAlert, Navigation, Compass } from 'lucide-react';

export default function Concierge() {
  const services = [
    {
      title: "Private Aviation Coordination",
      desc: "Direct flight paths and charter arrangements to remote mountain airstrips, coastal heliports, and global private airports.",
      icon: <Plane size={24} />
    },
    {
      title: "Yacht Slip & Deepwater Access",
      desc: "Acquisition of deep-water dock slips, private marine slips, and custom yacht concierge coordinates for megayacht berthing.",
      icon: <Navigation size={24} />
    },
    {
      title: "Asset Custody & Smart Care",
      desc: "Discreet coordination of estate security, technical smart-home automation system preservation, and grounds staff management.",
      icon: <ShieldAlert size={24} />
    },
    {
      title: "Bespoke Art Curation",
      desc: "Coordinated fine art cataloging, temperature-humidity balance guides, and direct vault installation for private collections.",
      icon: <Compass size={24} />
    }
  ];

  return (
    <section className="concierge-section" id="concierge" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        
        <div className="section-header">
          <p>VIP Services</p>
          <h2>Luxury Lifestyle Concierge</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              className="glass-panel srv-card"
              style={{
                padding: '40px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{
                y: -6,
                borderColor: 'var(--color-gold)',
                boxShadow: 'var(--shadow-lg), 0 0 20px var(--color-gold-glow)'
              }}
            >
              <div style={{ padding: '14px', background: 'var(--color-gold-light)', color: 'var(--color-gold)', borderRadius: 'var(--radius-sm)', alignSelf: 'flex-start' }}>
                {srv.icon}
              </div>

              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: '400', color: 'var(--text-primary)' }}>
                {srv.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {srv.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
