import React from 'react';
import { motion } from 'framer-motion';
import { Star, Phone, Mail } from 'lucide-react';

export default function AgentSection({ onAgentSelect }) {
  const agents = [
    {
      name: "Marcus Vance",
      role: "Luxury Portfolio Director",
      rating: 5,
      deals: "150+ Deals Sold",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=350&q=80",
      phone: "+1 (555) 019-2834",
      email: "marcus@luxehaven.com"
    },
    {
      name: "Sophia Sterling",
      role: "Coastal Estates Specialist",
      rating: 5,
      deals: "210+ Deals Sold",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=350&q=80",
      phone: "+1 (555) 019-8822",
      email: "sophia@luxehaven.com"
    },
    {
      name: "Ethan Cross",
      role: "Alpine & Mountain Broker",
      rating: 4.9,
      deals: "95+ Deals Sold",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=350&q=80",
      phone: "+1 (555) 019-4512",
      email: "ethan@luxehaven.com"
    }
  ];

  const handleContactClick = (agentName) => {
    if (onAgentSelect) {
      onAgentSelect(agentName);
    }
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="agents-section" id="agents">
      <div className="container">
        
        <div className="section-header">
          <p>Expert Brokerage</p>
          <h2>Meet Our Luxury Advisors</h2>
        </div>

        <div className="grid-responsive">
          {agents.map((agent, index) => (
            <motion.div 
              key={index} 
              className="agent-card glass-panel" 
              style={{ border: '1px solid var(--border-color)', overflow: 'hidden', padding: '30px', background: 'var(--bg-surface)' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ 
                y: -8, 
                borderColor: 'var(--color-gold)', 
                boxShadow: 'var(--shadow-lg), 0 0 20px var(--color-gold-glow)' 
              }}
            >
              <img 
                src={agent.image} 
                alt={agent.name} 
                className="agent-img"
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 20px', border: '3px solid var(--color-gold)', display: 'block' }}
              />
              <h3 className="agent-name" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', fontWeight: '400', fontSize: '1.5rem', marginBottom: '4px' }}>
                {agent.name}
              </h3>
              <div className="agent-role" style={{ fontSize: '0.8rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', marginBottom: '20px' }}>
                {agent.role}
              </div>
              
              {/* Star Rating */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '10px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(agent.rating) ? 'var(--color-gold)' : 'none'} 
                    color="var(--color-gold)" 
                  />
                ))}
                <span style={{ fontSize: '0.85rem', fontWeight: '750', marginLeft: '6px', color: 'var(--text-primary)' }}>{agent.rating}</span>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                {agent.deals} | Consistent Top Producer
              </p>

              <div className="agent-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', fontSize: '0.85rem', padding: '12px' }}
                  onClick={() => handleContactClick(agent.name)}
                >
                  <Mail size={14} style={{ marginRight: '6px' }} />
                  Consult {agent.name.split(' ')[0]}
                </button>
                <a 
                  href={`tel:${agent.phone.replace(/\D/g, '')}`} 
                  className="btn-secondary" 
                  style={{ width: '100%', fontSize: '0.85rem', padding: '12px', boxSizing: 'border-box' }}
                >
                  <Phone size={14} style={{ marginRight: '6px' }} />
                  {agent.phone}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
