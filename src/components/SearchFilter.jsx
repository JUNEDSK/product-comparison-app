import React from 'react';
import { Search, X } from 'lucide-react';

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedBrands,
  onBrandToggle,
  availableBrands,
  priceRange,
  onPriceRangeChange,
  maxPrice
}) => {
  const clearFilters = () => {
    onSearchChange('');
    selectedBrands.forEach(brand => onBrandToggle(brand));
    onPriceRangeChange([0, maxPrice]);
  };

  const hasActiveFilters = searchTerm || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Brand Filter */}
        <div className="flex flex-wrap gap-2">
          {availableBrands.map(brand => (
            <button
              key={brand}
              onClick={() => onBrandToggle(brand)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedBrands.includes(brand)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Price Range */}
        <div className="flex items-center space-x-2 min-w-max">
          <span className="text-sm text-gray-600 dark:text-gray-300">Price:</span>
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
            className="w-20"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300 w-10">${priceRange[1]}</span>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors text-gray-600 dark:text-gray-300
            ${hasActiveFilters
              ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer'
              : 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800'}`}
        >
          <X size={16} />
          <span className="text-sm">Clear</span>
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
