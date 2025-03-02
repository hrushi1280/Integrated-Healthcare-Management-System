import React from 'react';
import InventoryTable from '../components/inventory/InventoryTable';
import { useAuth } from '../context/AuthContext';
import { mockInventory } from '../data/mockData';

const InventoryPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.role !== 'admin') return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <p className="text-gray-600">Manage hospital inventory and supplies</p>
      </div>
      
      <InventoryTable inventory={mockInventory} />
    </div>
  );
};

export default InventoryPage;