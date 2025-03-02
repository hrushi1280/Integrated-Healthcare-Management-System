import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  Calendar, 
  Clock, 
  User, 
  Users, 
  Pill, 
  FileText, 
  Package, 
  Settings, 
  LogOut,
  Activity,
  Stethoscope,
  ShieldCheck
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  const renderNavLinks = () => {
    // Common links for all users
    const commonLinks = [
      { to: '/dashboard', icon: <Home size={20} />, text: 'Dashboard' },
      { to: '/profile', icon: <User size={20} />, text: 'Profile' },
    ];

    // Role-specific links
    let roleLinks = [];
    
    switch (currentUser.role) {
      case 'patient':
        roleLinks = [
          { to: '/appointments', icon: <Calendar size={20} />, text: 'Appointments' },
          { to: '/medications', icon: <Pill size={20} />, text: 'Medications' },
          { to: '/medical-records', icon: <FileText size={20} />, text: 'Medical Records' },
        ];
        break;
      case 'doctor':
        roleLinks = [
          { to: '/appointments', icon: <Calendar size={20} />, text: 'Appointments' },
          { to: '/schedule', icon: <Clock size={20} />, text: 'Schedule' },
          { to: '/patients', icon: <Users size={20} />, text: 'Patients' },
          { to: '/medical-records', icon: <FileText size={20} />, text: 'Medical Records' },
        ];
        break;
      case 'admin':
        roleLinks = [
          { to: '/users', icon: <Users size={20} />, text: 'Users' },
          { to: '/inventory', icon: <Package size={20} />, text: 'Inventory' },
          { to: '/analytics', icon: <Activity size={20} />, text: 'Analytics' },
          { to: '/settings', icon: <Settings size={20} />, text: 'Settings' },
        ];
        break;
    }

    return [...commonLinks, ...roleLinks].map((link, index) => (
      <NavLink key={index} to={link.to} className={navLinkClass}>
        {link.icon}
        <span>{link.text}</span>
      </NavLink>
    ));
  };

  const getRoleIcon = () => {
    switch (currentUser.role) {
      case 'patient':
        return <User className="text-blue-600" />;
      case 'doctor':
        return <Stethoscope className="text-green-600" />;
      case 'admin':
        return <ShieldCheck className="text-purple-600" />;
      default:
        return <User className="text-gray-600" />;
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <Activity size={24} />
          HealthCare
        </h1>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {currentUser.profileImage ? (
            <img 
              src={currentUser.profileImage} 
              alt={currentUser.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={20} className="text-gray-500" />
            </div>
          )}
          <div>
            <h3 className="font-medium text-gray-800">{currentUser.name}</h3>
            <div className="flex items-center text-sm text-gray-500 gap-1">
              {getRoleIcon()}
              <span className="capitalize">{currentUser.role}</span>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {renderNavLinks()}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;