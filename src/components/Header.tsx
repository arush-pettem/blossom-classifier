
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 border-b bg-white">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Bloom's Taxonomy Classifier</h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Guide
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
