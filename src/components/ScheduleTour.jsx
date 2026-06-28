import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, User, Phone, Mail } from 'lucide-react';

export default function ScheduleTour({ propertyTitle, agentName }) {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  // Generate 4 upcoming dates starting from today
  const getDates = () => {
    const dates = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 4; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        dayName: days[d.getDay()],
        dayNum: d.getDate(),
        month: months[d.getMonth()],
        fullString: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`
      });
    }
    return dates;
  };

  const dates = getDates();
  const times = ['10:00 AM', '1:30 PM', '3:00 PM', '5:30 PM'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="sidebar-card tour-scheduler">
        <div className="tour-success animate-fade-in">
          <CheckCircle2 size={54} />
          <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '8px' }}>Tour Reserved!</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
            Your tour for <strong>{propertyTitle}</strong> is scheduled on <strong>{dates[selectedDate].fullString}</strong> at <strong>{times[selectedTime]}</strong>.
          </p>
          <div style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Agent <strong>{agentName}</strong> will contact you at <strong>{phone}</strong> to confirm access details.
          </div>
          <button 
            className="btn-secondary" 
            style={{ width: '100%', marginTop: '20px', padding: '8px' }}
            onClick={() => {
              setIsBooked(false);
              setFullName('');
              setEmail('');
              setPhone('');
            }}
          >
            Schedule Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-card tour-scheduler">
      <h3>
        <Calendar size={20} className="gold-gradient-text" />
        Schedule a Private Tour
      </h3>
      
      <form onSubmit={handleSubmit}>
        {/* Date Grid Selector */}
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>Select Date</p>
        <div className="date-grid">
          {dates.map((date, index) => (
            <div 
              key={index} 
              className={`date-chip ${selectedDate === index ? 'active' : ''}`}
              onClick={() => setSelectedDate(index)}
            >
              <span>{date.dayName}</span>
              <span style={{ fontSize: '1.1rem', fontWeight: '800', margin: '2px 0' }}>{date.dayNum}</span>
              <span>{date.month}</span>
            </div>
          ))}
        </div>

        {/* Time Grid Selector */}
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>Select Preferred Time</p>
        <div className="time-slots">
          {times.map((time, index) => (
            <div 
              key={index} 
              className={`time-slot ${selectedTime === index ? 'active' : ''}`}
              onClick={() => setSelectedTime(index)}
            >
              <Clock size={12} style={{ marginRight: '4px', display: 'inline', verticalAlign: 'middle' }} />
              <span style={{ verticalAlign: 'middle' }}>{time}</span>
            </div>
          ))}
        </div>

        {/* Contact Input Form */}
        <div className="floating-form-group">
          <input 
            type="text" 
            placeholder=" "
            required 
            className="floating-input"
            style={{ padding: '10px 12px 10px 36px', fontSize: '0.85rem' }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <User size={14} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
          <label className="floating-label" style={{ left: '36px', top: '10px', fontSize: '0.85rem' }}>Full Name</label>
        </div>

        <div className="floating-form-group">
          <input 
            type="email" 
            placeholder=" "
            required 
            className="floating-input"
            style={{ padding: '10px 12px 10px 36px', fontSize: '0.85rem' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Mail size={14} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
          <label className="floating-label" style={{ left: '36px', top: '10px', fontSize: '0.85rem' }}>Email Address</label>
        </div>

        <div className="floating-form-group">
          <input 
            type="tel" 
            placeholder=" "
            required 
            className="floating-input"
            style={{ padding: '10px 12px 10px 36px', fontSize: '0.85rem' }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Phone size={14} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
          <label className="floating-label" style={{ left: '36px', top: '10px', fontSize: '0.85rem' }}>Phone Number</label>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '0.9rem', padding: '12px' }}>
          Schedule Tour
        </button>
      </form>
    </div>
  );
}
