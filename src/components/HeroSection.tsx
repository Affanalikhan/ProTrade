import React from 'react';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-drift-blue/10 via-transparent to-drift-accent/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Main Hero Content */}
        <div className="text-center">
          <div className="mb-8">
            <span className="bg-gradient-to-r from-drift-accent to-drift-blue text-black px-4 py-2 rounded-full text-sm font-semibold">
              Introducing ProTrade Vaults
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">The Future of</span><br />
            <span className="text-white">Wealth Creation for All</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Trade, earn and build generational wealth with up to 101x leverage on the most efficient DEX
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="bg-gradient-to-r from-drift-accent to-drift-blue text-black px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
              <span>Trade Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-all duration-200">
              Start Earning
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">$1B+</div>
            <div className="text-gray-400">TVL</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">$70B+</div>
            <div className="text-gray-400">Cumulative Volume</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">19,256,573</div>
            <div className="text-gray-400">Total Trades</div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
            <div className="bg-drift-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-drift-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Higher Leverage</h3>
            <p className="text-gray-400 text-sm">
              Trade 40+ markets with up to 20x leverage. Go up to 50x leverage on SOL, BTC or ETH perps.
            </p>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
            <div className="bg-drift-blue/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-drift-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">
              Built for 100ms finality with seamless trade and yield opportunities.
            </p>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
            <div className="bg-drift-green/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-drift-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Audited</h3>
            <p className="text-gray-400 text-sm">
              Audited by industry-leading security firms with world-class risk management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
