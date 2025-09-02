import React from 'react';
import { TrendingUp, Twitter, Github, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-drift-accent to-drift-blue p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold gradient-text">ProTrade</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              The future of decentralized trading. Trade perpetual futures with up to 101x leverage on the most efficient DEX.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-drift-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-drift-accent transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-drift-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Trade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Earn</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Stake</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Vaults</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Stats</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Learn</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Security</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Bug Bounties</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Media Kit</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Governance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ProTrade Protocol. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Subscribe to ProTrade's newsletter</span>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border border-gray-700 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:border-drift-accent"
              />
              <button className="bg-drift-accent text-black px-4 py-2 rounded-r-lg text-sm font-semibold hover:bg-opacity-90 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
