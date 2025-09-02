import React, { useState } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Trade', href: '/trade' },
    { name: 'Earn', href: '/earn' },
    { name: 'Stake', href: '/stake' },
    { name: 'Vaults', href: '/vaults' },
    { name: 'Stats', href: '/stats' },
    { name: 'Learn', href: '/learn' },
    { name: 'Governance', href: '/governance' },
  ];

  return (
    <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-drift-accent to-drift-blue p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold gradient-text">ProTrade</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Connect Wallet
            </button>
            <button className="bg-gradient-to-r from-drift-accent to-drift-blue text-black px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
              Launch App
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 rounded-lg mt-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <button className="w-full px-4 py-2 text-gray-300 hover:text-white transition-colors text-left">
                  Connect Wallet
                </button>
                <button className="w-full bg-gradient-to-r from-drift-accent to-drift-blue text-black px-6 py-2 rounded-lg font-semibold">
                  Launch App
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
