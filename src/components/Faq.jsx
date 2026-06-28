import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I schedule an in-person private viewing?",
      answer: "You can book a viewing directly through our online Schedule Tour feature on any property details card, or contact our agency directly. A white-glove agent will call you within 2 hours to confirm your verification credentials and book access."
    },
    {
      question: "Can I manage a luxury purchase remotely?",
      answer: "Yes, absolutely. Over 40% of our luxury transactions are processed for international clients. We offer high-resolution 3D virtual walkthroughs, live video tours, secure remote escrow integrations, and fully digital notary and contract signings."
    },
    {
      question: "Do you represent exclusive off-market listings?",
      answer: "Yes, we maintain a Private Pocket Ledger containing off-market properties, high-end penthouses, and private estates not visible on public directories. Please register your requirements in our contact portal for custom matching."
    },
    {
      question: "What smart-home integrations are common in your residences?",
      answer: "Most properties feature smart locks, integrated climate controls, motorized shades, and voice-command automation systems (such as Crestron or Control4) that can be operated from anywhere in the world."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        
        <div className="section-header">
          <p>Common Queries</p>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item ${isOpen ? 'open' : ''}`}
                style={{ overflow: 'hidden' }}
              >
                <div 
                  className="faq-question" 
                  onClick={() => handleToggle(index)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', cursor: 'pointer' }}
                >
                  <span style={{ transition: 'color 0.2s', color: isOpen ? 'var(--color-gold)' : 'inherit' }}>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} style={{ color: isOpen ? 'var(--color-gold)' : 'inherit' }} />
                  </motion.div>
                </div>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-answer-inner" style={{ padding: '0 24px 24px 24px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
