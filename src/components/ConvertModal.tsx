import React, { useState } from 'react';
import { X, ArrowUpDown, ChevronDown } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  icon: string;
}

interface ConvertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConvertModal: React.FC<ConvertModalProps> = ({ isOpen, onClose }) => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState<Token>({
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 0.05432,
    icon: '₿'
  });
  const [toToken, setToToken] = useState<Token>({
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 2.341,
    icon: 'Ξ'
  });
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const availableTokens: Token[] = [
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.05432, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', balance: 2.341, icon: 'Ξ' },
    { symbol: 'SOL', name: 'Solana', balance: 45.67, icon: 'S' },
    { symbol: 'USDC', name: 'USD Coin', balance: 1250.00, icon: '$' },
    { symbol: 'USDT', name: 'Tether', balance: 850.50, icon: '$' },
    { symbol: 'AVAX', name: 'Avalanche', balance: 12.5, icon: 'A' },
  ];

  const exchangeRate = 16.75; // BTC to ETH example rate

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value) {
      setToAmount((parseFloat(value) * exchangeRate).toFixed(6));
    } else {
      setToAmount('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Convert</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* From Token */}
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-400 mb-2">From</div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="relative">
                  <button
                    onClick={() => setShowFromDropdown(!showFromDropdown)}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg px-3 py-2"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-drift-accent to-drift-blue rounded-full flex items-center justify-center text-black font-bold text-sm">
                      {fromToken.icon}
                    </div>
                    <span className="font-semibold text-white">{fromToken.symbol}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {showFromDropdown && (
                    <div className="absolute top-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 w-48">
                      {availableTokens.map((token) => (
                        <button
                          key={token.symbol}
                          onClick={() => {
                            setFromToken(token);
                            setShowFromDropdown(false);
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-gray-700 transition-colors"
                        >
                          <div className="w-6 h-6 bg-gradient-to-r from-drift-accent to-drift-blue rounded-full flex items-center justify-center text-black font-bold text-sm">
                            {token.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-white">{token.symbol}</div>
                            <div className="text-xs text-gray-400">{token.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Balance: {fromToken.balance}</div>
                </div>
              </div>
              
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-500 focus:outline-none"
              />
              
              <div className="flex justify-between items-center mt-2">
                <button className="text-xs text-drift-accent hover:text-drift-accent/80 transition-colors">
                  MAX
                </button>
                <div className="text-sm text-gray-400">
                  ≈ ${(parseFloat(fromAmount || '0') * 44000).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwapTokens}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full p-2 transition-colors"
            >
              <ArrowUpDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* To Token */}
          <div>
            <div className="text-sm text-gray-400 mb-2">To</div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="relative">
                  <button
                    onClick={() => setShowToDropdown(!showToDropdown)}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg px-3 py-2"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-drift-accent to-drift-blue rounded-full flex items-center justify-center text-black font-bold text-sm">
                      {toToken.icon}
                    </div>
                    <span className="font-semibold text-white">{toToken.symbol}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {showToDropdown && (
                    <div className="absolute top-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 w-48">
                      {availableTokens.filter(token => token.symbol !== fromToken.symbol).map((token) => (
                        <button
                          key={token.symbol}
                          onClick={() => {
                            setToToken(token);
                            setShowToDropdown(false);
                          }}
                          className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-gray-700 transition-colors"
                        >
                          <div className="w-6 h-6 bg-gradient-to-r from-drift-accent to-drift-blue rounded-full flex items-center justify-center text-black font-bold text-sm">
                            {token.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-white">{token.symbol}</div>
                            <div className="text-xs text-gray-400">{token.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Balance: {toToken.balance}</div>
                </div>
              </div>
              
              <input
                type="number"
                value={toAmount}
                readOnly
                placeholder="0.00"
                className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-500 focus:outline-none"
              />
              
              <div className="flex justify-end mt-2">
                <div className="text-sm text-gray-400">
                  ≈ ${(parseFloat(toAmount || '0') * 2650).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Exchange Info */}
          <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Exchange Rate</span>
              <span className="text-white">1 {fromToken.symbol} = {exchangeRate} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Fee (0.1%)</span>
              <span className="text-white">{(parseFloat(fromAmount || '0') * 0.001).toFixed(6)} {fromToken.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Estimated Time</span>
              <span className="text-white">~30 seconds</span>
            </div>
          </div>

          {/* Convert Button */}
          <button
            disabled={!fromAmount || parseFloat(fromAmount) <= 0}
            className="w-full bg-gradient-to-r from-drift-accent to-drift-blue text-black py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
          >
            {!fromAmount || parseFloat(fromAmount) <= 0 ? 'Enter Amount' : 'Convert'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConvertModal;
