import React from 'react';
import { X, Trash2, Camera, Monitor, Battery, HardDrive, Cpu, DollarSign } from 'lucide-react';

const ComparisonPanel = ({
  selectedProducts,
  onRemoveProduct,
  onClearAll,
  isVisible
}) => {
  if (!isVisible) return null;

  const features = [
    { key: 'price', label: 'Price', icon: DollarSign, formatter: (value) => `$${value}` },
    { key: 'screenSize', label: 'Screen Size', icon: Monitor, formatter: (value) => value },
    { key: 'battery', label: 'Battery', icon: Battery, formatter: (value) => value },
    { key: 'camera', label: 'Camera', icon: Camera, formatter: (value) => value },
    { key: 'storage', label: 'Storage', icon: HardDrive, formatter: (value) => value },
    { key: 'processor', label: 'Processor', icon: Cpu, formatter: (value) => value }
  ];

  const getFeatureValue = (product, featureKey) => {
    if (featureKey === 'price') return product.price;
    return product.features[featureKey];
  };

  const getHighlightClass = (featureKey, productIndex) => {
    const values = selectedProducts.map(p => getFeatureValue(p, featureKey));
    const currentValue = values[productIndex];
    
    if (featureKey === 'price') {
      const minPrice = Math.min(...values);
      return currentValue === minPrice ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
    }
    
    // For other features, highlight if all are different
    const uniqueValues = new Set(values);
    return uniqueValues.size > 1 ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 z-50 max-h-96 overflow-y-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Product Comparison ({selectedProducts.length}/3)
          </h2>
          <button
            onClick={onClearAll}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={16} />
            <span>Clear All</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 border-b border-gray-200 font-medium text-gray-700">
                  Feature
                </th>
                {selectedProducts.map(product => (
                  <th key={product.id} className="text-center py-2 px-3 border-b border-gray-200">
                    <div className="flex flex-col items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg mb-2"
                      />
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-600">{product.brand}</div>
                      <button
                        onClick={() => onRemoveProduct(product.id)}
                        className="mt-2 p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map(({ key, label, icon: Icon, formatter }) => (
                <tr key={key}>
                  <td className="py-3 px-3 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Icon size={16} className="text-gray-500" />
                      <span className="font-medium text-gray-700">{label}</span>
                    </div>
                  </td>
                  {selectedProducts.map((product, index) => (
                    <td key={product.id} className="py-3 px-3 border-b border-gray-100 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg border text-sm font-medium ${getHighlightClass(key, index)}`}
                      >
                        {formatter(getFeatureValue(product, key))}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;