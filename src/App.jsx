import React, { useState, useMemo } from 'react';
import ProductCard from './components/ProductCard';
import { products } from './data/products';
import ComparisonPanel from './components/ComparisonPanel';
import SearchFilter from './components/SearchFilter';

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1200]);

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

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 flex justify-center">
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">SmartPhone Comparison</h1>
              <p className="text-gray-600">Compare up to 3 smartphones side by side</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
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
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {selectedProducts.length > 0 && (
              <span className="ml-2 text-blue-600 font-medium">
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
            <p className="text-gray-500 text-lg">No products found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBrands([]);
                setPriceRange([0, maxPrice]);
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
    </>
  );
}

export default App;
