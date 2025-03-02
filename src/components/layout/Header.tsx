import React, { useState } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockNotifications } from '../../data/mockData';

const Header: React.FC<{ toggleSidebar: () => void, isSidebarOpen: boolean }> = ({ 
  toggleSidebar, 
  isSidebarOpen 
}) => {
  const { currentUser } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  if (!currentUser) return null;

  const userNotifications = mockNotifications.filter(
    notification => notification.userId === currentUser.id
  );
  
  const unreadCount = userNotifications.filter(
    notification => !notification.isRead
  ).length;

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700">Notifications</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {userNotifications.length > 0 ? (
                  userNotifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          !notification.isRead ? 'bg-blue-500' : 'bg-gray-300'
                        }`} />
                        <div>
                          <h4 className="font-medium text-gray-800">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
              
              {userNotifications.length > 0 && (
                <div className="p-3 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800 w-full text-center">
                    Mark all as read
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {currentUser.profileImage ? (
            <img 
              src={currentUser.profileImage} 
              alt={currentUser.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {currentUser.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="hidden md:block">
            <h3 className="font-medium text-gray-800">{currentUser.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{currentUser.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;