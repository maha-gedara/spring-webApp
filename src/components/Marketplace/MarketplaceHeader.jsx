import React from 'react';
import { Link } from 'react-router-dom';

const MarketplaceHeader = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">SkillVerse Marketplace</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/all-ads" className="hover:underline">
            All Ads
          </Link>
          <Link to="/create-ad" className="hover:underline">
            Create Ad
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default MarketplaceHeader;
