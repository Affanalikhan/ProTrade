import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

const TokenListing: React.FC = () => {
  const tokens: Token[] = [
    { symbol: 'SOL', name: 'Solana', price: 142.50, change24h: 3.22, volume24h: 2500000000, marketCap: 67000000000 },
    { symbol: 'BTC', name: 'Bitcoin', price: 44000.00, change24h: -1.45, volume24h: 15000000000, marketCap: 860000000000 },
    { symbol: 'ETH', name: 'Ethereum', price: 2650.00, change24h: 2.18, volume24h: 8000000000, marketCap: 318000000000 },
    { symbol: 'APT', name: 'Aptos', price: 8.45, change24h: 5.67, volume24h: 150000000, marketCap: 3200000000 },
    { symbol: 'MATIC', name: 'Polygon', price: 0.85, change24h: -2.34, volume24h: 420000000, marketCap: 7800000000 },
    { symbol: 'JTO', name: 'Jito', price: 3.28, change24h: 8.91, volume24h: 85000000, marketCap: 420000000 },
    { symbol: 'BNB', name: 'BNB', price: 315.60, change24h: 1.87, volume24h: 1200000000, marketCap: 48000000000 },
    { symbol: 'XRP', name: 'XRP', price: 0.62, change24h: -0.95, volume24h: 980000000, marketCap: 34000000000 },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.078, change24h: 4.23, volume24h: 650000000, marketCap: 11000000000 },
    { symbol: 'AVAX', name: 'Avalanche', price: 28.50, change24h: -3.45, volume24h: 380000000, marketCap: 11500000000 },
    { symbol: 'LINK', name: 'Chainlink', price: 14.80, change24h: 6.78, volume24h: 520000000, marketCap: 8200000000 },
    { symbol: 'WIF', name: 'dogwifhat', price: 2.45, change24h: 12.34, volume24h: 180000000, marketCap: 2450000000 },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(4)}`;
    if (price < 100) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(0)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">Trade Popular Markets</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Access 40+ of the hottest crypto markets with industry-leading leverage
        </p>
      </div>

      {/* Token Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {tokens.map((token) => (
          <div
            key={token.symbol}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-drift-accent/50 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-drift-accent to-drift-blue rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">{token.symbol[0]}</span>
                </div>
                <div>
                  <div className="font-semibold text-white">{token.symbol}</div>
                  <div className="text-xs text-gray-400">{token.name}</div>
                </div>
              </div>
              <div className={`flex items-center ${token.change24h >= 0 ? 'text-drift-green' : 'text-drift-red'}`}>
                {token.change24h >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(token.change24h).toFixed(2)}%
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-xl font-bold text-white">
                {formatPrice(token.price)}
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Volume: {formatNumber(token.volume24h)}</span>
                <span>MCap: {formatNumber(token.marketCap)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trade Actions */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-drift-accent to-drift-blue text-black px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 mr-4">
          View All Markets
        </button>
        <button className="border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-200">
          Start Trading
        </button>
      </div>
    </div>
  );
};

export default TokenListing;
