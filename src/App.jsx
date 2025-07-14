import React, { useState, useMemo } from 'react';
import ProductCard from './components/ProductCard';
import ComparisonPanel from './components/ComparisonPanel';
import SearchFilter from './components/SearchFilter';
import { products } from './data/products';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDarkMode } from './hooks/useDarkMode';
import { Sun, Moon, Smartphone  } from 'lucide-react';

function App() {
  const [selectedProducts, setSelectedProducts] = useLocalStorage('selectedProducts', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1200]);
  const [isDark, setIsDark] = useDarkMode(); // 🔥 Dark mode state

  const availableBrands = useMemo(() => {
    return Array.from(new Set(products.map(product => product.brand)));
  }, []);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map(product => product.price));
  }, []);

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesBrand && matchesPrice;
    });
  }, [searchTerm, selectedBrands, priceRange]);

  const handleSelectProduct = (product) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleDeselectProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleClearAll = () => {
    setSelectedProducts([]);
  };

  const isProductSelected = (productId) => {
    return selectedProducts.some(p => p.id === productId);
  };

  const canSelectMore = selectedProducts.length < 3;
  console.log('Dark mode is:', isDark);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className="bg-dark-800 shadow-sm border-b border-dark-700">
        <div className="container mx-auto px-10 py-6 flex justify-between items-center">
          <div className="flex items-center gap-1">
          <Smartphone size={32} className="text-primary-500" />
          <div>
            <h1 className="text-3xl font-bold">Smart Phones</h1>
          </div>
        </div>
     
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            className="p-2 rounded-full dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-900 text-light-200 hover:bg-dark-600 transition-colors"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

     <div className="container mx-auto px-10 py-8">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedBrands={selectedBrands}
          onBrandToggle={handleBrandToggle}
          availableBrands={availableBrands}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          maxPrice={maxPrice}
        />

        <div className="mb-6">
          <p className="text-light-400">
            Showing {filteredProducts.length} of {products.length} products
            {selectedProducts.length > 0 && (
              <span className="ml-2 text-primary-500 font-medium">
                • {selectedProducts.length} selected for comparison
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={isProductSelected(product.id)}
              onSelect={handleSelectProduct}
              onDeselect={handleDeselectProduct}
              canSelect={canSelectMore}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="min-h-96 flex flex-col items-center justify-center col-span-full">
            <p className="text-light-400 text-lg">No products found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBrands([]);
                setPriceRange([0, maxPrice]);
              }}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Comparison Panel */}
      <ComparisonPanel
        selectedProducts={selectedProducts}
        onRemoveProduct={handleDeselectProduct}
        onClearAll={handleClearAll}
        isVisible={selectedProducts.length >= 2}
      />
    </div>
  );
}

export default App;
