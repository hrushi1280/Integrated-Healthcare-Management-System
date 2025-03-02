import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider,useAuth } from './context/AuthContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import LoginPage from './pages/LoginPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AppointmentsPage from './pages/AppointmentsPage';
import InventoryPage from './pages/InventoryPage';
import MedicationsPage from './pages/MedicationsPage';
import ProfilePage from './pages/ProfilePage';

// Role-based dashboard selector
const DashboardSelector: React.FC = () => {
  return <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardSelector />} />
            
            <Route path="dashboard" element={
              <RoleBasedRoute 
                patientComponent={<PatientDashboard />}
                doctorComponent={<DoctorDashboard />}
                adminComponent={<AdminDashboard />}
              />
            } />
            
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="medications" element={<MedicationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            
            {/* Add more routes as needed */}
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#fff',
            color: '#333',
          },
        }}
      />
    </AuthProvider>
  );
}

// Helper component to render different components based on user role
interface RoleBasedRouteProps {
  patientComponent: React.ReactNode;
  doctorComponent: React.ReactNode;
  adminComponent: React.ReactNode;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
  patientComponent, 
  doctorComponent, 
  adminComponent 
}) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  switch (currentUser.role) {
    case 'patient':
      return <>{patientComponent}</>;
    case 'doctor':
      return <>{doctorComponent}</>;
    case 'admin':
      return <>{adminComponent}</>;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default App;