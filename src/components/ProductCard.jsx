import React from 'react';
import { Plus, Check, Camera, Monitor, Battery, HardDrive, Cpu } from 'lucide-react';

const ProductCard = ({
  product,
  isSelected,
  onToggleCompare,
  canSelect = true // Optional: allow disabling selection if needed
}) => {
  const handleToggleSelect = () => {
    onToggleCompare(product.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
            <Check size={16} />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
          </div>
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <Monitor size={14} className="mr-2 text-gray-500" />
            <span className="font-medium">Screen:</span>
            <span className="ml-1">{product.features.screenSize}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Battery size={14} className="mr-2 text-gray-500" />
            <span className="font-medium">Battery:</span>
            <span className="ml-1">{product.features.battery}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Camera size={14} className="mr-2 text-gray-500" />
            <span className="font-medium">Camera:</span>
            <span className="ml-1">{product.features.camera}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <HardDrive size={14} className="mr-2 text-gray-500" />
            <span className="font-medium">Storage:</span>
            <span className="ml-1">{product.features.storage}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Cpu size={14} className="mr-2 text-gray-500" />
            <span className="font-medium">Processor:</span>
            <span className="ml-1">{product.features.processor}</span>
          </div>
        </div>

        <button
          onClick={handleToggleSelect}
          disabled={!canSelect && !isSelected}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            isSelected
              ? 'bg-green-600 text-white hover:bg-green-700'
              : canSelect
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSelected ? (
            <>
              <Check size={16} />
              <span>Added to Compare</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span>Add to Compare</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
