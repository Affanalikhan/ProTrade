import React, { useState } from 'react';
import { X, Send, ChevronDown, Copy } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  icon: string;
}

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [selectedToken, setSelectedToken] = useState<Token>({
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 0.05432,
    icon: '₿'
  });
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);
  const [memo, setMemo] = useState('');

  const availableTokens: Token[] = [
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.05432, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', balance: 2.341, icon: 'Ξ' },
    { symbol: 'SOL', name: 'Solana', balance: 45.67, icon: 'S' },
    { symbol: 'USDC', name: 'USD Coin', balance: 1250.00, icon: '$' },
    { symbol: 'USDT', name: 'Tether', balance: 850.50, icon: '$' },
    { symbol: 'AVAX', name: 'Avalanche', balance: 12.5, icon: 'A' },
  ];

  const networkFee = 0.0001; // Example network fee

  const recentAddresses = [
    {
      name: 'Trading Account',
      address: '1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S',
      label: 'Personal'
    },
    {
      name: 'Cold Storage',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      label: 'Hardware'
    },
    {
      name: 'Exchange Wallet',
      address: '3FKjULwQKJXJhFgqwefNHp9xLLXJuZe2gA',
      label: 'Binance'
    }
  ];

  const handleMaxAmount = () => {
    setAmount(selectedToken.balance.toString());
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Transfer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Token Selection */}
          <div>
            <div className="text-sm text-gray-400 mb-2">Asset</div>
            <div className="relative">
              <button
                onClick={() => setShowTokenDropdown(!showTokenDropdown)}
                className="w-full flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-drift-accent to-drift-blue rounded-full flex items-center justify-center text-black font-bold">
                    {selectedToken.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">{selectedToken.symbol}</div>
                    <div className="text-xs text-gray-400">Balance: {selectedToken.balance}</div>
                  </div>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>
              
              {showTokenDropdown && (
                <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                  {availableTokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => {
                        setSelectedToken(token);
                        setShowTokenDropdown(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-drift-accent to-drift-blue rounded-full flex items-center justify-center text-black font-bold text-sm">
                          {token.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-white">{token.symbol}</div>
                          <div className="text-xs text-gray-400">{token.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white">{token.balance}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Amount */}
          <div>
            <div className="text-sm text-gray-400 mb-2">Amount</div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-500 focus:outline-none mb-2"
              />
              <div className="flex justify-between items-center">
                <button
                  onClick={handleMaxAmount}
                  className="text-xs text-drift-accent hover:text-drift-accent/80 transition-colors"
                >
                  MAX
                </button>
                <div className="text-sm text-gray-400">
                  ≈ ${(parseFloat(amount || '0') * (selectedToken.symbol === 'BTC' ? 44000 : selectedToken.symbol === 'ETH' ? 2650 : 142)).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Recipient */}
          <div>
            <div className="text-sm text-gray-400 mb-2">Recipient Address</div>
            <div className="space-y-3">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter wallet address or ENS name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-drift-accent"
              />
              
              {/* Recent Addresses */}
              <div>
                <div className="text-xs text-gray-500 mb-2">Recent Addresses</div>
                <div className="space-y-1">
                  {recentAddresses.map((addr, index) => (
                    <button
                      key={index}
                      onClick={() => setRecipient(addr.address)}
                      className="w-full flex items-center justify-between bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-lg px-3 py-2 transition-colors"
                    >
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">{addr.name}</div>
                        <div className="text-xs text-gray-400">
                          {addr.address.slice(0, 6)}...{addr.address.slice(-6)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {addr.label}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(addr.address);
                          }}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Memo (Optional) */}
          <div>
            <div className="text-sm text-gray-400 mb-2">Memo (Optional)</div>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="Add a note for this transfer"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-drift-accent"
            />
          </div>

          {/* Transfer Details */}
          <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Network Fee</span>
              <span className="text-white">{networkFee} {selectedToken.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">You'll Send</span>
              <span className="text-white">{amount || '0'} {selectedToken.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Cost</span>
              <span className="text-white font-semibold">
                {(parseFloat(amount || '0') + networkFee).toFixed(8)} {selectedToken.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Estimated Time</span>
              <span className="text-white">~10-30 minutes</span>
            </div>
          </div>

          {/* Transfer Button */}
          <button
            disabled={!amount || !recipient || parseFloat(amount) <= 0 || parseFloat(amount) > selectedToken.balance}
            className="w-full bg-gradient-to-r from-drift-accent to-drift-blue text-black py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>
              {!amount || parseFloat(amount) <= 0 
                ? 'Enter Amount' 
                : !recipient 
                ? 'Enter Recipient' 
                : parseFloat(amount) > selectedToken.balance
                ? 'Insufficient Balance'
                : 'Transfer'
              }
            </span>
          </button>

          {/* Warning */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
            <div className="text-yellow-400 text-xs">
              ⚠️ Make sure the recipient address is correct. Cryptocurrency transfers cannot be reversed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
