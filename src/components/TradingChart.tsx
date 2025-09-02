import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface ChartData {
  time: string;
  price: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

const TradingChart: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H');
  const [chartType, setChartType] = useState('line');

  // Mock chart data
  const generateMockData = (): ChartData[] => {
    const data: ChartData[] = [];
    let basePrice = 44000;
    
    for (let i = 0; i < 100; i++) {
      const variation = (Math.random() - 0.5) * 1000;
      const open = basePrice;
      const close = basePrice + variation;
      const high = Math.max(open, close) + Math.random() * 200;
      const low = Math.min(open, close) - Math.random() * 200;
      
      data.push({
        time: new Date(Date.now() - (100 - i) * 60000).toLocaleTimeString(),
        price: close,
        volume: Math.random() * 1000000,
        open,
        high,
        low,
        close
      });
      
      basePrice = close;
    }
    
    return data;
  };

  const [chartData] = useState(generateMockData());
  const timeframes = ['5M', '15M', '1H', '4H', '1D', '1W'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
          <p className="text-gray-300 text-sm">{`Time: ${label}`}</p>
          <p className="text-drift-accent font-semibold">
            {`Price: $${payload[0].value.toFixed(2)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">BTC-PERP</h3>
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-white">$44,125.50</span>
            <span className="text-drift-green font-semibold">+2.45%</span>
          </div>
        </div>
        
        {/* Chart Controls */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
          {/* Chart Type */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                chartType === 'line'
                  ? 'bg-drift-accent text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                chartType === 'area'
                  ? 'bg-drift-accent text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Area
            </button>
          </div>
          
          {/* Timeframe */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  selectedTimeframe === tf
                    ? 'bg-drift-accent text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                domain={['dataMin - 500', 'dataMax + 500']}
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#00d4aa"
                fillOpacity={1}
                fill="url(#colorPrice)"
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                domain={['dataMin - 500', 'dataMax + 500']}
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#00d4aa"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-800">
        <div>
          <div className="text-gray-400 text-sm">24h Volume</div>
          <div className="text-white font-semibold">$2.5B</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Open Interest</div>
          <div className="text-white font-semibold">$850M</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Funding Rate</div>
          <div className="text-drift-green font-semibold">0.0125%</div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">Next Funding</div>
          <div className="text-white font-semibold">2h 45m</div>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;
