import React, { useState } from 'react';
import { Wallet, Send, ArrowUpDown, Plus, Eye, EyeOff, Copy, Download, Upload } from 'lucide-react';
import { cryptoTokens, CryptoToken } from '../data/cryptoData';

const SpotWallet: React.FC = () => {
  const [showBalances, setShowBalances] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter only coins with balances for the wallet
  const walletCoins = cryptoTokens.filter(coin => coin.balance && coin.balance > 0);
  
  const filteredCoins = walletCoins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBalance = walletCoins.reduce((sum, coin) => {
    return sum + (coin.balance! * coin.price);
  }, 0);

  const formatBalance = (balance: number): string => {
    if (balance >= 1000000) return `${(balance / 1000000).toFixed(2)}M`;
    if (balance >= 1000) return `${(balance / 1000).toFixed(2)}K`;
    if (balance < 0.001) return balance.toFixed(8);
    if (balance < 1) return balance.toFixed(6);
    return balance.toFixed(4);
  };

  const formatPrice = (price: number): string => {
    if (price < 0.001) return `$${price.toFixed(8)}`;
    if (price < 1) return `$${price.toFixed(6)}`;
    if (price < 100) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(0)}`;
  };

  const copyAddress = (symbol: string) => {
    // Mock address - in real app this would be user's actual wallet address
    const mockAddress = `${symbol}1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T`;
    navigator.clipboard.writeText(mockAddress);
    // In real app, you'd show a toast notification here
  };

  const WalletOverview = () => (
    <div>
      {/* Balance Header */}
      <div className="card" style={{ marginBottom: '24px', textAlign: 'center', padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>
            Total Balance
          </h2>
          <button
            onClick={() => setShowBalances(!showBalances)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9ca3af',
              padding: '4px'
            }}
          >
            {showBalances ? <Eye size={24} /> : <EyeOff size={24} />}
          </button>
        </div>
        
        <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>
          <span className="gradient-text">
            {showBalances ? `$${totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : '****'}
          </span>
        </div>
        
        <div style={{ color: '#9ca3af', marginBottom: '24px' }}>
          ≈ {walletCoins.length} assets
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button 
            className="btn-primary"
            onClick={() => setActiveTab('deposit')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
          >
            <Download size={16} />
            Deposit
          </button>
          <button 
            className="btn-secondary"
            onClick={() => setActiveTab('withdraw')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
          >
            <Upload size={16} />
            Withdraw
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(31, 41, 55, 0.5)',
            border: '1px solid #374151',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px'
          }}
        />
      </div>

      {/* Assets List */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 120px 120px 100px',
          gap: '16px',
          padding: '16px',
          borderBottom: '1px solid #374151',
          fontSize: '14px',
          color: '#9ca3af',
          fontWeight: '600'
        }}>
          <div>Asset</div>
          <div style={{ textAlign: 'right' }}>Balance</div>
          <div style={{ textAlign: 'right' }}>Value (USD)</div>
          <div style={{ textAlign: 'center' }}>Actions</div>
        </div>

        {filteredCoins.map((coin) => (
          <div
            key={coin.symbol}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 120px 120px 100px',
              gap: '16px',
              padding: '16px',
              borderBottom: '1px solid #374151',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(31, 41, 55, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {/* Asset Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #00d4aa 0%, #3742fa 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'black'
              }}>
                {coin.icon}
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'white', fontSize: '16px' }}>
                  {coin.symbol}
                </div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                  {coin.name}
                </div>
              </div>
            </div>

            {/* Balance */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>
                {showBalances ? formatBalance(coin.balance!) : '****'}
              </div>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                {formatPrice(coin.price)}
              </div>
            </div>

            {/* USD Value */}
            <div style={{ textAlign: 'right', color: 'white', fontWeight: '600', fontSize: '16px' }}>
              {showBalances ? `$${(coin.balance! * coin.price).toFixed(2)}` : '****'}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
              <button
                style={{
                  background: 'rgba(0, 212, 170, 0.1)',
                  border: '1px solid #00d4aa',
                  borderRadius: '6px',
                  padding: '6px',
                  cursor: 'pointer',
                  color: '#00d4aa'
                }}
                title="Send"
              >
                <Send size={14} />
              </button>
              <button
                style={{
                  background: 'rgba(55, 66, 250, 0.1)',
                  border: '1px solid #3742fa',
                  borderRadius: '6px',
                  padding: '6px',
                  cursor: 'pointer',
                  color: '#3742fa'
                }}
                title="Trade"
              >
                <ArrowUpDown size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DepositTab = () => (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
          Deposit Crypto
        </h2>
        <p style={{ color: '#9ca3af' }}>
          Send crypto to your ProTrade wallet
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {cryptoTokens.slice(0, 12).map((coin) => (
          <div key={coin.symbol} className="card" style={{ padding: '20px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #00d4aa 0%, #3742fa 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'black'
              }}>
                {coin.icon}
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'white' }}>
                  {coin.symbol}
                </div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                  {coin.name}
                </div>
              </div>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '12px',
              fontSize: '12px',
              color: '#9ca3af',
              fontFamily: 'monospace'
            }}>
              {coin.symbol}1A2B3C4D5E6F7G8H9I0J1K2L3M...
            </div>
            
            <button
              onClick={() => copyAddress(coin.symbol)}
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Copy size={14} />
              Copy Address
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const WithdrawTab = () => (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
          Withdraw Crypto
        </h2>
        <p style={{ color: '#9ca3af' }}>
          Send crypto from your ProTrade wallet to external addresses
        </p>
      </div>

      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: '600' }}>
              Select Asset
            </label>
            <select style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(31, 41, 55, 0.5)',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px'
            }}>
              {walletCoins.map(coin => (
                <option key={coin.symbol} value={coin.symbol}>
                  {coin.symbol} - {coin.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: '600' }}>
              Recipient Address
            </label>
            <input
              type="text"
              placeholder="Enter wallet address"
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(31, 41, 55, 0.5)',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: '600' }}>
              Amount
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px'
                }}
              />
              <button
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#00d4aa',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                MAX
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255, 193, 7, 0.1)', borderRadius: '8px', border: '1px solid #ffc107' }}>
            <div style={{ color: '#ffc107', fontSize: '14px', marginBottom: '8px', fontWeight: '600' }}>
              ⚠️ Important
            </div>
            <div style={{ color: '#9ca3af', fontSize: '12px' }}>
              • Double-check the recipient address
              • Transactions cannot be reversed
              • Network fees will apply
            </div>
          </div>

          <button
            className="btn-primary"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 1rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #00d4aa 0%, #3742fa 100%)',
          padding: '12px',
          borderRadius: '12px'
        }}>
          <Wallet size={24} color="black" />
        </div>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>
            Spot Wallet
          </h1>
          <p style={{ color: '#9ca3af', margin: 0 }}>
            Manage your cryptocurrency holdings
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {[
          { id: 'overview', name: 'Overview', icon: Wallet },
          { id: 'deposit', name: 'Deposit', icon: Download },
          { id: 'withdraw', name: 'Withdraw', icon: Upload }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              ...(activeTab === tab.id 
                ? {
                    background: 'linear-gradient(135deg, #00d4aa 0%, #3742fa 100%)',
                    color: 'black'
                  }
                : {
                    background: 'rgba(31, 41, 55, 0.5)',
                    color: '#9ca3af',
                    border: '1px solid #374151'
                  }
              )
            }}
          >
            <tab.icon size={16} />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <WalletOverview />}
      {activeTab === 'deposit' && <DepositTab />}
      {activeTab === 'withdraw' && <WithdrawTab />}
    </div>
  );
};

export default SpotWallet;
