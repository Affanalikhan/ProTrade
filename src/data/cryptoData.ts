export interface CryptoToken {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  icon: string;
  balance?: number;
}

export const cryptoTokens: CryptoToken[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change24h: 2.45, volume24h: 15000000000, marketCap: 860000000000, icon: '₿', balance: 0.05432 },
  { symbol: 'ETH', name: 'Ethereum', price: 2650.00, change24h: 3.22, volume24h: 8000000000, marketCap: 318000000000, icon: 'Ξ', balance: 2.341 },
  { symbol: 'BNB', name: 'BNB', price: 315.60, change24h: 1.87, volume24h: 1200000000, marketCap: 48000000000, icon: 'B', balance: 12.5 },
  { symbol: 'XRP', name: 'XRP', price: 0.62, change24h: -0.95, volume24h: 980000000, marketCap: 34000000000, icon: 'X', balance: 1250.0 },
  { symbol: 'SOL', name: 'Solana', price: 142.50, change24h: 5.67, volume24h: 2500000000, marketCap: 67000000000, icon: 'S', balance: 45.67 },
  { symbol: 'ADA', name: 'Cardano', price: 0.45, change24h: 4.23, volume24h: 650000000, marketCap: 16000000000, icon: '₳', balance: 2850.0 },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.078, change24h: 8.91, volume24h: 650000000, marketCap: 11000000000, icon: 'D', balance: 15000.0 },
  { symbol: 'AVAX', name: 'Avalanche', price: 28.50, change24h: -3.45, volume24h: 380000000, marketCap: 11500000000, icon: 'A', balance: 25.8 },
  { symbol: 'LINK', name: 'Chainlink', price: 14.80, change24h: 6.78, volume24h: 520000000, marketCap: 8200000000, icon: 'L', balance: 125.4 },
  { symbol: 'DOT', name: 'Polkadot', price: 7.25, change24h: -1.23, volume24h: 420000000, marketCap: 9800000000, icon: '●', balance: 185.2 },
  { symbol: 'MATIC', name: 'Polygon', price: 0.85, change24h: -2.34, volume24h: 420000000, marketCap: 7800000000, icon: 'M', balance: 1850.0 },
  { symbol: 'UNI', name: 'Uniswap', price: 6.80, change24h: 3.45, volume24h: 180000000, marketCap: 4200000000, icon: '🦄', balance: 95.5 },
  { symbol: 'LTC', name: 'Litecoin', price: 95.40, change24h: 1.56, volume24h: 850000000, marketCap: 7100000000, icon: 'Ł', balance: 8.7 },
  { symbol: 'BCH', name: 'Bitcoin Cash', price: 245.80, change24h: -2.87, volume24h: 450000000, marketCap: 4800000000, icon: '฿', balance: 3.2 },
  { symbol: 'ATOM', name: 'Cosmos', price: 12.45, change24h: 7.23, volume24h: 220000000, marketCap: 3600000000, icon: '⚛', balance: 125.8 },
  { symbol: 'APT', name: 'Aptos', price: 8.45, change24h: 12.34, volume24h: 150000000, marketCap: 3200000000, icon: 'Ⱥ', balance: 75.3 },
  { symbol: 'NEAR', name: 'NEAR Protocol', price: 3.85, change24h: 4.67, volume24h: 180000000, marketCap: 2800000000, icon: 'N', balance: 485.2 },
  { symbol: 'FIL', name: 'Filecoin', price: 5.25, change24h: -1.89, volume24h: 160000000, marketCap: 2400000000, icon: '⨎', balance: 125.4 },
  { symbol: 'VET', name: 'VeChain', price: 0.025, change24h: 3.78, volume24h: 120000000, marketCap: 2100000000, icon: 'V', balance: 25000.0 },
  { symbol: 'ICP', name: 'Internet Computer', price: 4.85, change24h: -3.21, volume24h: 95000000, marketCap: 1900000000, icon: '∞', balance: 95.7 },
  { symbol: 'ALGO', name: 'Algorand', price: 0.18, change24h: 2.45, volume24h: 85000000, marketCap: 1400000000, icon: 'Ⱥ', balance: 5500.0 },
  { symbol: 'XLM', name: 'Stellar', price: 0.125, change24h: 1.23, volume24h: 180000000, marketCap: 3500000000, icon: '*', balance: 8500.0 },
  { symbol: 'HBAR', name: 'Hedera', price: 0.065, change24h: 4.56, volume24h: 95000000, marketCap: 2200000000, icon: 'ℏ', balance: 15000.0 },
  { symbol: 'FLOW', name: 'Flow', price: 0.85, change24h: -2.34, volume24h: 45000000, marketCap: 850000000, icon: '🌊', balance: 750.0 },
  { symbol: 'EGLD', name: 'MultiversX', price: 42.50, change24h: 6.78, volume24h: 65000000, marketCap: 1200000000, icon: 'E', balance: 15.8 },
  { symbol: 'XTZ', name: 'Tezos', price: 1.25, change24h: -1.45, volume24h: 75000000, marketCap: 1100000000, icon: 'ꜩ', balance: 850.0 },
  { symbol: 'THETA', name: 'Theta Network', price: 1.45, change24h: 3.89, volume24h: 55000000, marketCap: 1450000000, icon: 'Θ', balance: 685.2 },
  { symbol: 'AXS', name: 'Axie Infinity', price: 7.25, change24h: 8.45, volume24h: 125000000, marketCap: 950000000, icon: '🪓', balance: 75.5 },
  { symbol: 'SAND', name: 'The Sandbox', price: 0.45, change24h: 5.67, volume24h: 95000000, marketCap: 850000000, icon: '🏖', balance: 2250.0 },
  { symbol: 'MANA', name: 'Decentraland', price: 0.38, change24h: -2.15, volume24h: 85000000, marketCap: 750000000, icon: 'M', balance: 2850.0 },
  { symbol: 'CRO', name: 'Cronos', price: 0.095, change24h: 1.89, volume24h: 65000000, marketCap: 2400000000, icon: 'C', balance: 8500.0 },
  { symbol: 'FTM', name: 'Fantom', price: 0.32, change24h: 4.23, volume24h: 125000000, marketCap: 850000000, icon: '👻', balance: 3250.0 },
  { symbol: 'ENJ', name: 'Enjin Coin', price: 0.28, change24h: 3.45, volume24h: 45000000, marketCap: 450000000, icon: 'E', balance: 3850.0 },
  { symbol: 'CHZ', name: 'Chiliz', price: 0.085, change24h: 2.67, volume24h: 55000000, marketCap: 650000000, icon: '🌶', balance: 12500.0 },
  { symbol: 'DOGS', name: 'Dogs', price: 0.00095, change24h: 15.67, volume24h: 25000000, marketCap: 485000000, icon: '🐕', balance: 125000.0 },
  { symbol: 'PEPE', name: 'Pepe', price: 0.0000085, change24h: 8.45, volume24h: 85000000, marketCap: 325000000, icon: '🐸', balance: 8500000.0 },
  { symbol: 'SHIB', name: 'Shiba Inu', price: 0.0000145, change24h: 4.67, volume24h: 250000000, marketCap: 8500000000, icon: '🐕', balance: 25000000.0 },
  { symbol: 'WIF', name: 'dogwifhat', price: 2.45, change24h: 12.34, volume24h: 180000000, marketCap: 2450000000, icon: '🐕‍🦺', balance: 450.0 },
  { symbol: 'BONK', name: 'Bonk', price: 0.000025, change24h: 6.78, volume24h: 95000000, marketCap: 185000000, icon: '🔨', balance: 4500000.0 },
  { symbol: 'FLOKI', name: 'FLOKI', price: 0.00018, change24h: 9.23, volume24h: 65000000, marketCap: 175000000, icon: '🐺', balance: 550000.0 },
  // Stablecoins
  { symbol: 'USDT', name: 'Tether', price: 1.00, change24h: 0.01, volume24h: 25000000000, marketCap: 83000000000, icon: '₮', balance: 5250.0 },
  { symbol: 'USDC', name: 'USD Coin', price: 1.00, change24h: -0.01, volume24h: 5500000000, marketCap: 25000000000, icon: '$', balance: 2850.0 },
  { symbol: 'BUSD', name: 'Binance USD', price: 1.00, change24h: 0.00, volume24h: 2500000000, marketCap: 5400000000, icon: '$', balance: 1250.0 },
  { symbol: 'DAI', name: 'Dai', price: 1.00, change24h: 0.02, volume24h: 450000000, marketCap: 4200000000, icon: '◈', balance: 850.0 }
];

export const getTrendingCoins = () => {
  return cryptoTokens
    .sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h))
    .slice(0, 6);
};

export const getTopGainers = () => {
  return cryptoTokens
    .filter(coin => coin.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 10);
};

export const getTopLosers = () => {
  return cryptoTokens
    .filter(coin => coin.change24h < 0)
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 10);
};

export const getMemeCoins = () => {
  const memeSymbols = ['DOGE', 'SHIB', 'PEPE', 'WIF', 'BONK', 'FLOKI', 'DOGS'];
  return cryptoTokens.filter(coin => memeSymbols.includes(coin.symbol));
};

export const getStableCoins = () => {
  const stableSymbols = ['USDT', 'USDC', 'BUSD', 'DAI'];
  return cryptoTokens.filter(coin => stableSymbols.includes(coin.symbol));
};
