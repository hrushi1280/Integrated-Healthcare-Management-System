import React from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import { InventoryItem } from '../../types';

interface InventoryStatusProps {
  inventory: InventoryItem[];
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ inventory }) => {
  // Filter low stock items
  const lowStockItems = inventory.filter(item => item.quantity <= item.threshold);
  
  // Sort by quantity relative to threshold (most critical first)
  const sortedLowStock = [...lowStockItems].sort((a, b) => {
    const aRatio = a.quantity / a.threshold;
    const bRatio = b.quantity / b.threshold;
    return aRatio - bRatio;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Inventory Status</h3>
        {lowStockItems.length > 0 && (
          <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm">
            <AlertTriangle size={16} className="mr-1" />
            <span>{lowStockItems.length} items low</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {sortedLowStock.length > 0 ? (
          <div className="space-y-4">
            {sortedLowStock.slice(0, 5).map(item => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Package size={18} className="text-gray-500 mr-2" />
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Current stock: {item.quantity} {item.unit}</span>
                    <span className="text-gray-600">Threshold: {item.threshold} {item.unit}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        item.quantity <= item.threshold * 0.5 
                          ? 'bg-red-500' 
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, (item.quantity / item.threshold) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-end">
                  <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                    Restock
                  </button>
                </div>
              </div>
            ))}
            
            {lowStockItems.length > 5 && (
              <div className="text-center">
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  View all {lowStockItems.length} low stock items
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <Package size={24} className="text-green-600" />
            </div>
            <p className="text-gray-600 mb-1">All inventory items are well stocked</p>
            <p className="text-sm text-gray-500">No items are below their threshold levels</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryStatus;