import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from './PropertyCard';
import { SlidersHorizontal } from 'lucide-react';

export default function PropertyGrid({ properties, onSelectProperty, globalFilter }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const categories = ['All', 'Villa', 'Apartment', 'House', 'Penthouse'];

  useEffect(() => {
    let result = [...properties];

    // 1. Apply Global Search Filters (from Hero)
    if (globalFilter) {
      const { type, location, maxPrice } = globalFilter;

      if (type && type !== 'All') {
        result = result.filter(p => p.type.toLowerCase() === type.toLowerCase());
      }
      
      if (location) {
        result = result.filter(p => 
          p.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (maxPrice && maxPrice > 0) {
        result = result.filter(p => p.price <= maxPrice);
      }
    }

    // 2. Apply Category Tabs Filter
    if (activeCategory !== 'All') {
      result = result.filter(p => p.type.toLowerCase() === activeCategory.toLowerCase());
    }

    // 3. Apply Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'sqft-desc') {
      result.sort((a, b) => b.sqft - a.sqft);
    }

    setFilteredProperties(result);
  }, [activeCategory, sortBy, globalFilter, properties]);

  return (
    <section className="listings-section" id="listings">
      <div className="container">
        
        <div className="section-header">
          <p>Curated Portfolio</p>
          <h2>Exclusive Premium Properties</h2>
        </div>

        {/* Filter Controls Bar */}
        <div className="filter-bar">
          
          {/* Category Tabs with sliding background pill */}
          <div className="category-tabs" style={{ position: 'relative', zIndex: 1 }}>
            {categories.map((cat) => (
              <div
                key={cat}
                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                style={{ position: 'relative', zIndex: 2, cursor: 'pointer', background: 'transparent' }}
                onClick={() => setActiveCategory(cat)}
              >
                <span style={{ color: activeCategory === cat ? '#04060c' : 'inherit', transition: 'color 0.25s' }}>
                  {cat === 'All' ? 'All Properties' : `${cat}s`}
                </span>
                
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeCategoryIndicator"
                    className="category-tab-active-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--color-gold)',
                      borderRadius: 'var(--radius-full)',
                      zIndex: -1
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-selector">
            <SlidersHorizontal size={14} style={{ color: 'var(--color-gold)' }} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Default Sort</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="sqft-desc">Size: Largest First</option>
            </select>
          </div>
        </div>

        {/* Listings Grid with Morphing Layouts */}
        <motion.div 
          className="grid-responsive"
          layout
          style={{ position: 'relative' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => (
              <motion.div 
                key={property.id} 
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <PropertyCard 
                  property={property} 
                  onSelect={onSelectProperty}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProperties.length === 0 && (
          <motion.div 
            style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', zIndex: 10, position: 'relative' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>No properties found matching your criteria.</p>
            <button 
              className="btn-primary" 
              onClick={() => {
                setActiveCategory('All');
                setSortBy('default');
              }}
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
