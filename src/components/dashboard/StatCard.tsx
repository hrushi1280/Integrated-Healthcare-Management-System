import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease';
  };
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, color }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          iconBg: 'bg-blue-100'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          iconBg: 'bg-green-100'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          iconBg: 'bg-purple-100'
        };
      case 'orange':
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-600',
          iconBg: 'bg-orange-100'
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          text: 'text-red-600',
          iconBg: 'bg-red-100'
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-600',
          iconBg: 'bg-gray-100'
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className={`${colorClasses.bg} rounded-lg p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${colorClasses.text} mt-1`}>{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${
                change.type === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {change.type === 'increase' ? '↑' : '↓'} {change.value}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${colorClasses.iconBg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;