import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

export default function MortgageCalculator({ basePrice }) {
  const [homePrice, setHomePrice] = useState(basePrice || 1000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Synchronize when active property price changes
  useEffect(() => {
    if (basePrice) {
      setHomePrice(basePrice);
    }
  }, [basePrice]);

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPaymentPercent, interestRate, loanTerm]);

  const calculateMortgage = () => {
    const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
    const principal = homePrice - downPaymentAmount;
    const monthlyRate = interestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment((principal / numberOfPayments).toFixed(0));
      return;
    }

    const payment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setMonthlyPayment(isFinite(payment) ? payment.toFixed(0) : 0);
  };

  const downPaymentAmount = ((homePrice * downPaymentPercent) / 100).toLocaleString();
  const principalAmount = (homePrice - (homePrice * downPaymentPercent) / 100).toLocaleString();

  return (
    <div className="mortgage-box">
      <h3>
        <Calculator size={20} className="gold-gradient-text" />
        Mortgage Estimator
      </h3>
      
      <div className="calc-sliders">
        {/* Home Price Slider */}
        <div className="slider-group">
          <div className="slider-header">
            <span>Property Price</span>
            <span>${homePrice.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min={Math.max(100000, homePrice - 1500000)} 
            max={homePrice + 3000000} 
            step={50000}
            value={homePrice} 
            onChange={(e) => setHomePrice(Number(e.target.value))}
          />
        </div>

        {/* Down Payment % Slider */}
        <div className="slider-group">
          <div className="slider-header">
            <span>Down Payment ({downPaymentPercent}%)</span>
            <span>${downPaymentAmount}</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="80" 
            step="1"
            value={downPaymentPercent} 
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
          />
        </div>

        {/* Interest Rate Slider */}
        <div className="slider-group">
          <div className="slider-header">
            <span>Interest Rate</span>
            <span>{interestRate}%</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="12" 
            step="0.1"
            value={interestRate} 
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>

        {/* Loan Term Slider */}
        <div className="slider-group">
          <div className="slider-header">
            <span>Loan Term</span>
            <span>{loanTerm} Years</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="30" 
            step="5"
            value={loanTerm} 
            onChange={(e) => setLoanTerm(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="calc-result">
        <h4>Estimated Monthly Payment</h4>
        <div className="monthly-payment">${Number(monthlyPayment).toLocaleString()}</div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          Principal: ${principalAmount} | Down Payment: ${downPaymentAmount}
        </p>
      </div>
    </div>
  );
}
