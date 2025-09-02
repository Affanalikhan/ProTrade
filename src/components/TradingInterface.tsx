import React, { useState } from 'react';
import { Plus, Minus, ArrowUpDown } from 'lucide-react';
import TradingChart from './TradingChart';
import ConvertModal from './ConvertModal';
import TransferModal from './TransferModal';

interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

const TradingInterface: React.FC = () => {
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [side, setSide] = useState<'long' | 'short'>('long');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [leverage, setLeverage] = useState(1);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  // Mock order book data
  const generateOrderBook = (): { bids: OrderBookEntry[], asks: OrderBookEntry[] } => {
    const bids: OrderBookEntry[] = [];
    const asks: OrderBookEntry[] = [];
    let totalBid = 0;
    let totalAsk = 0;

    for (let i = 0; i < 10; i++) {
      const bidPrice = 44000 - i * 10;
      const bidSize = Math.random() * 5 + 0.1;
      totalBid += bidSize;
      bids.push({ price: bidPrice, size: bidSize, total: totalBid });

      const askPrice = 44010 + i * 10;
      const askSize = Math.random() * 5 + 0.1;
      totalAsk += askSize;
      asks.push({ price: askPrice, size: askSize, total: totalAsk });
    }

    return { bids, asks };
  };

  const { bids, asks } = generateOrderBook();

  const leverageOptions = [1, 2, 5, 10, 20, 50, 101];

  const formatNumber = (num: number, decimals = 2) => {
    return num.toFixed(decimals);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Chart and Order Book */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trading Chart */}
          <TradingChart />

          {/* Order Book */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Order Book</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bids */}
              <div>
                <div className="text-sm text-gray-400 mb-2 grid grid-cols-3 gap-2">
                  <span>Price (USDC)</span>
                  <span className="text-right">Size (BTC)</span>
                  <span className="text-right">Total</span>
                </div>
                <div className="space-y-1">
                  {bids.map((bid, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 text-sm py-1 hover:bg-gray-800/50 rounded transition-colors cursor-pointer">
                      <span className="text-drift-green font-medium">{formatNumber(bid.price, 0)}</span>
                      <span className="text-white text-right">{formatNumber(bid.size, 4)}</span>
                      <span className="text-gray-400 text-right">{formatNumber(bid.total, 4)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asks */}
              <div>
                <div className="text-sm text-gray-400 mb-2 grid grid-cols-3 gap-2">
                  <span>Price (USDC)</span>
                  <span className="text-right">Size (BTC)</span>
                  <span className="text-right">Total</span>
                </div>
                <div className="space-y-1">
                  {asks.map((ask, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 text-sm py-1 hover:bg-gray-800/50 rounded transition-colors cursor-pointer">
                      <span className="text-drift-red font-medium">{formatNumber(ask.price, 0)}</span>
                      <span className="text-white text-right">{formatNumber(ask.size, 4)}</span>
                      <span className="text-gray-400 text-right">{formatNumber(ask.total, 4)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Trading Panel */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setShowConvertModal(true)}
              className="bg-gradient-to-r from-drift-accent to-drift-blue text-black py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Convert</span>
            </button>
            <button
              onClick={() => setShowTransferModal(true)}
              className="border border-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-200"
            >
              Transfer
            </button>
          </div>

          {/* Trading Panel */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Trade BTC-PERP</h3>

            {/* Long/Short Toggle */}
            <div className="flex bg-gray-800 rounded-lg p-1 mb-4">
              <button
                onClick={() => setSide('long')}
                className={`flex-1 py-2 rounded font-medium transition-all ${
                  side === 'long'
                    ? 'bg-drift-green text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Long
              </button>
              <button
                onClick={() => setSide('short')}
                className={`flex-1 py-2 rounded font-medium transition-all ${
                  side === 'short'
                    ? 'bg-drift-red text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Short
              </button>
            </div>

            {/* Order Type */}
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Order Type</div>
              <div className="flex bg-gray-800 rounded-lg p-1">
                {(['market', 'limit', 'stop'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 py-2 rounded text-sm font-medium transition-all ${
                      orderType === type
                        ? 'bg-drift-accent text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Leverage */}
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Leverage: {leverage}x</div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLeverage(Math.max(1, leverage - 1))}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-400" />
                </button>
                <div className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-center">
                  <span className="text-white font-semibold">{leverage}x</span>
                </div>
                <button
                  onClick={() => setLeverage(Math.min(101, leverage + 1))}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {leverageOptions.map((lev) => (
                  <button
                    key={lev}
                    onClick={() => setLeverage(lev)}
                    className={`px-2 py-1 rounded text-xs transition-all ${
                      leverage === lev
                        ? 'bg-drift-accent text-black'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {lev}x
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            {orderType !== 'market' && (
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Price</div>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-drift-accent"
                />
              </div>
            )}

            {/* Size */}
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Size (BTC)</div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-drift-accent"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Available: $5,250.00</span>
                <button className="text-drift-accent hover:text-drift-accent/80 transition-colors">
                  MAX
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estimated Entry</span>
                <span className="text-white">$44,125.50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Liquidation Price</span>
                <span className="text-drift-red">$42,890.25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Fees</span>
                <span className="text-white">$2.50</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-gray-400">Buying Power</span>
                <span className="text-white">${(parseFloat(amount || '0') * leverage * 44125).toLocaleString()}</span>
              </div>
            </div>

            {/* Trade Button */}
            <button
              disabled={!amount || parseFloat(amount) <= 0}
              className={`w-full py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${
                side === 'long'
                  ? 'bg-drift-green hover:bg-drift-green/90 text-black'
                  : 'bg-drift-red hover:bg-drift-red/90 text-white'
              }`}
            >
              {side === 'long' ? 'Long' : 'Short'} BTC-PERP
            </button>

            <div className="text-xs text-gray-400 mt-2 text-center">
              Max leverage: 101x • Funding: 0.0125%
            </div>
          </div>

          {/* Positions */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Open Positions</h3>
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">No open positions</div>
              <div className="text-sm text-gray-500">
                Place a trade to see your positions here
              </div>
            </div>
          </div>

          {/* Account Balance */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Account Balance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Balance</span>
                <span className="text-white font-semibold">$5,250.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Available</span>
                <span className="text-white">$5,250.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Used Margin</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Unrealized PnL</span>
                <span className="text-drift-green">$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConvertModal 
        isOpen={showConvertModal} 
        onClose={() => setShowConvertModal(false)} 
      />
      <TransferModal 
        isOpen={showTransferModal} 
        onClose={() => setShowTransferModal(false)} 
      />
    </div>
  );
};

export default TradingInterface;
