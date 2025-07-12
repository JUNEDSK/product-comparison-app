import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import { products } from './data/products';

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (product) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleDeselectProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
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

    <div className="min-h-screen bg-gray-50 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={isProductSelected(product.id)}
            onToggleCompare={isProductSelected(product.id) ? handleDeselectProduct : handleSelectProduct}
            canSelect={canSelectMore}
          />
        ))}
      </div>
    </div>
    </>
  
  );
}

export default App;
