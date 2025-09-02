import React, { useState } from 'react';
import { TrendingUp, ArrowRight, Wallet } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CryptoMarkets from './components/CryptoMarkets';
import SpotWallet from './components/SpotWallet';

// Simple Header Component
const SimpleHeader: React.FC<{ onNavigate: (view: 'home' | 'trade' | 'markets' | 'wallet') => void }> = ({ onNavigate }) => {

  return (
    <header style={{
      background: 'rgba(0, 0, 0, 0.9)',
      borderBottom: '1px solid #374151',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #00d4aa 0%, #3742fa 100%)',
            padding: '8px',
            borderRadius: '8px'
          }}>
            <TrendingUp size={24} color="black" />
          </div>
          <span className="gradient-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            ProTrade
          </span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '32px' }}>
          <button 
            onClick={() => onNavigate('trade')}
            style={{ color: '#d1d5db', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}
          >
            Trade
          </button>
          <button 
            onClick={() => onNavigate('markets')}
            style={{ color: '#d1d5db', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}
          >
            Markets
          </button>
          <button 
            onClick={() => onNavigate('wallet')}
            style={{ color: '#d1d5db', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Wallet size={16} />
            Wallet
          </button>
        </nav>

        {/* Connect Button */}
        <button className="btn-primary">
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

// Simple Hero Section
const SimpleHero: React.FC<{ onNavigateToTrade: () => void }> = ({ onNavigateToTrade }) => {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          <span className="gradient-text">The Future of</span><br />
          <span style={{ color: 'white' }}>Wealth Creation for All</span>
        </h1>
        
        <p style={{
          fontSize: '20px',
          color: '#9ca3af',
          marginBottom: '32px',
          maxWidth: '600px',
          margin: '0 auto 32px'
        }}>
          Trade, earn and build generational wealth with up to 101x leverage on the most efficient DEX
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={onNavigateToTrade} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 32px',
            fontSize: '18px'
          }}>
            <span>Trade Now</span>
            <ArrowRight size={20} />
          </button>
          <button className="btn-secondary" style={{
            padding: '16px 32px',
            fontSize: '18px'
          }}>
            Start Earning
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginTop: '64px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div className="gradient-text" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '8px' }}>$1B+</div>
            <div style={{ color: '#9ca3af' }}>TVL</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="gradient-text" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '8px' }}>$70B+</div>
            <div style={{ color: '#9ca3af' }}>Cumulative Volume</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="gradient-text" style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '8px' }}>19,256,573</div>
            <div style={{ color: '#9ca3af' }}>Total Trades</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Trading Chart
const SimpleTradingChart: React.FC = () => {
  const [chartData] = useState(() => {
    const data = [];
    let basePrice = 44000;
    
    for (let i = 0; i < 50; i++) {
      const variation = (Math.random() - 0.5) * 1000;
      basePrice += variation;
      data.push({
        time: i,
        price: basePrice,
      });
    }
    
    return data;
  });

  return (
    <div className="card" style={{ margin: '32px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>BTC-PERP</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>$44,125.50</span>
            <span className="text-green" style={{ fontWeight: '600' }}>+2.45%</span>
          </div>
        </div>
      </div>

      <div style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
            <YAxis domain={['dataMin - 500', 'dataMax + 500']} stroke="#9CA3AF" fontSize={12} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#00d4aa"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Main App Component
const SimpleApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'trade' | 'markets' | 'wallet'>('home');

  const handleNavigation = (view: 'home' | 'trade' | 'markets' | 'wallet') => {
    setCurrentView(view);
  };

  const renderBackButton = (title: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{title}</h1>
      <button 
        onClick={() => setCurrentView('home')}
        style={{ color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
      >
        ← Back to Home
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh' }}>
      <SimpleHeader onNavigate={handleNavigation} />
      
      <main>
        {currentView === 'home' && (
          <>
            <SimpleHero onNavigateToTrade={() => setCurrentView('trade')} />
            
            {/* Features */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 1rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '16px' }}>
                  <span className="gradient-text">Why Choose ProTrade?</span>
                </h2>
                <p style={{ color: '#9ca3af', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                  Built for traders, by traders. Experience the next generation of decentralized trading.
                </p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '32px'
              }}>
                <div className="card" style={{ cursor: 'pointer' }} onClick={() => setCurrentView('trade')}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'white' }}>Lightning Fast</h3>
                  <p style={{ color: '#9ca3af' }}>
                    Built on high-performance infrastructure for 100ms finality and instant trade execution.
                  </p>
                </div>
                
                <div className="card" style={{ cursor: 'pointer' }} onClick={() => setCurrentView('markets')}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'white' }}>40+ Crypto Markets</h3>
                  <p style={{ color: '#9ca3af' }}>
                    Trade Bitcoin, Ethereum, BNB, XRP, DOGS and many more cryptocurrencies with competitive fees.
                  </p>
                </div>
                
                <div className="card" style={{ cursor: 'pointer' }} onClick={() => setCurrentView('wallet')}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>💰</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'white' }}>Spot Wallet</h3>
                  <p style={{ color: '#9ca3af' }}>
                    Securely store, deposit, and withdraw your cryptocurrency holdings with ease.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {currentView === 'trade' && (
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 1rem' }}>
            {renderBackButton('Trading Dashboard')}
            <SimpleTradingChart />
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '32px' }}>
              <button className="btn-primary" style={{ padding: '16px', fontSize: '16px' }}>
                Convert
              </button>
              <button className="btn-secondary" style={{ padding: '16px', fontSize: '16px' }}>
                Transfer
              </button>
            </div>
          </div>
        )}

        {currentView === 'markets' && <CryptoMarkets />}
        {currentView === 'wallet' && <SpotWallet />}
      </main>
    </div>
  );
};

export default SimpleApp;
