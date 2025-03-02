import React from 'react';
import { Users, UserCheck, Package, AlertTriangle } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import InventoryStatus from '../components/dashboard/InventoryStatus';
import { useAuth } from '../context/AuthContext';
import { mockPatients, mockDoctors, mockInventory, mockAppointments } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== 'admin') return null;

  // Stats
  const totalPatients = mockPatients.length;
  const totalDoctors = mockDoctors.length;
  const totalInventoryItems = mockInventory.length;
  const lowStockItems = mockInventory.filter(item => item.quantity <= item.threshold).length;

  // Appointments stats
  const totalAppointments = mockAppointments.length;
  const completedAppointments = mockAppointments.filter(
    appointment => appointment.status === 'completed'
  ).length;
  const scheduledAppointments = mockAppointments.filter(
    appointment => appointment.status === 'scheduled' || appointment.status === 'confirmed'
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {currentUser.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value={totalPatients}
          icon={<Users size={20} className="text-blue-600" />}
          color="blue"
          change={{
            value: '5%',
            type: 'increase'
          }}
        />
        <StatCard
          title="Total Doctors"
          value={totalDoctors}
          icon={<UserCheck size={20} className="text-green-600" />}
          color="green"
        />
        <StatCard
          title="Inventory Items"
          value={totalInventoryItems}
          icon={<Package size={20} className="text-purple-600" />}
          color="purple"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockItems}
          icon={<AlertTriangle size={20} className="text-red-600" />}
          color="red"
          change={{
            value: '2',
            type: 'increase'
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory Status</h2>
          <InventoryStatus inventory={mockInventory} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointment Statistics</h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-base font-medium text-gray-700 mb-2">Appointment Status</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(completedAppointments / totalAppointments) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Completed: {completedAppointments}</span>
                  <span>Total: {totalAppointments}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700">Scheduled</h4>
                    <span className="text-lg font-bold text-gray-800">{scheduledAppointments}</span>
                  </div>
                  <div className="text-sm text-gray-500">Appointments scheduled or confirmed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;