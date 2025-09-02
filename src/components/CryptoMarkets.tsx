import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Star, Filter } from 'lucide-react';
import { cryptoTokens, getTrendingCoins, getTopGainers, getTopLosers, getMemeCoins, getStableCoins, CryptoToken } from '../data/cryptoData';

const CryptoMarkets: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', name: 'All Coins', count: cryptoTokens.length },
    { id: 'trending', name: 'Trending', count: 6 },
    { id: 'gainers', name: 'Top Gainers', count: 10 },
    { id: 'losers', name: 'Top Losers', count: 10 },
    { id: 'meme', name: 'Meme Coins', count: getMemeCoins().length },
    { id: 'stable', name: 'Stablecoins', count: getStableCoins().length },
    { id: 'favorites', name: 'Favorites', count: favorites.size }
  ];

  const getCoinsForCategory = (category: string): CryptoToken[] => {
    switch (category) {
      case 'trending':
        return getTrendingCoins();
      case 'gainers':
        return getTopGainers();
      case 'losers':
        return getTopLosers();
      case 'meme':
        return getMemeCoins();
      case 'stable':
        return getStableCoins();
      case 'favorites':
        return cryptoTokens.filter(coin => favorites.has(coin.symbol));
      default:
        return cryptoTokens;
    }
  };

  const filteredCoins = getCoinsForCategory(activeCategory).filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number): string => {
    if (price < 0.001) return `$${price.toFixed(8)}`;
    if (price < 1) return `$${price.toFixed(6)}`;
    if (price < 100) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(0)}`;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const toggleFavorite = (symbol: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(symbol)) {
      newFavorites.delete(symbol);
    } else {
      newFavorites.add(symbol);
    }
    setFavorites(newFavorites);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
          <span className="gradient-text">Crypto Markets</span>
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '18px' }}>
          Discover and trade 40+ cryptocurrencies with real-time prices
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '24px', position: 'relative' }}>
        <Search 
          size={20} 
          style={{ 
            position: 'absolute', 
            left: '16px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#9ca3af' 
          }} 
        />
        <input
          type="text"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px 12px 48px',
            background: 'rgba(31, 41, 55, 0.5)',
            border: '1px solid #374151',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px'
          }}
        />
      </div>

      {/* Category Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '24px', 
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              ...(activeCategory === category.id 
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
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Market Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00ff88', marginBottom: '4px' }}>
            {cryptoTokens.filter(c => c.change24h > 0).length}
          </div>
          <div style={{ color: '#9ca3af', fontSize: '14px' }}>Gainers</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4757', marginBottom: '4px' }}>
            {cryptoTokens.filter(c => c.change24h < 0).length}
          </div>
          <div style={{ color: '#9ca3af', fontSize: '14px' }}>Losers</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
            $2.4T
          </div>
          <div style={{ color: '#9ca3af', fontSize: '14px' }}>Market Cap</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
            $85B
          </div>
          <div style={{ color: '#9ca3af', fontSize: '14px' }}>24h Volume</div>
        </div>
      </div>

      {/* Coins Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 120px 120px 120px 120px 60px',
          gap: '16px',
          padding: '16px',
          borderBottom: '1px solid #374151',
          fontSize: '14px',
          color: '#9ca3af',
          fontWeight: '600'
        }}>
          <div>Name</div>
          <div style={{ textAlign: 'right' }}>Price</div>
          <div style={{ textAlign: 'right' }}>24h Change</div>
          <div style={{ textAlign: 'right' }}>Volume</div>
          <div style={{ textAlign: 'right' }}>Market Cap</div>
          <div></div>
        </div>

        {/* Table Body */}
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {filteredCoins.map((coin, index) => (
            <div
              key={coin.symbol}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 120px 120px 120px 60px',
                gap: '16px',
                padding: '16px',
                borderBottom: '1px solid #374151',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(31, 41, 55, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {/* Coin Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                    {coin.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                    {coin.symbol}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div style={{ textAlign: 'right', color: 'white', fontWeight: '600' }}>
                {formatPrice(coin.price)}
              </div>

              {/* 24h Change */}
              <div style={{ 
                textAlign: 'right', 
                fontWeight: '600',
                color: coin.change24h >= 0 ? '#00ff88' : '#ff4757',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '4px'
              }}>
                {coin.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(coin.change24h).toFixed(2)}%
              </div>

              {/* Volume */}
              <div style={{ textAlign: 'right', color: '#9ca3af' }}>
                {formatNumber(coin.volume24h)}
              </div>

              {/* Market Cap */}
              <div style={{ textAlign: 'right', color: '#9ca3af' }}>
                {formatNumber(coin.marketCap)}
              </div>

              {/* Favorite Button */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(coin.symbol);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: favorites.has(coin.symbol) ? '#fbbf24' : '#6b7280',
                    padding: '4px'
                  }}
                >
                  <Star size={16} fill={favorites.has(coin.symbol) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No Results */}
      {filteredCoins.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '64px 0',
          color: '#9ca3af'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            No coins found
          </div>
          <div>Try adjusting your search or category filter</div>
        </div>
      )}
    </div>
  );
};

export default CryptoMarkets;
