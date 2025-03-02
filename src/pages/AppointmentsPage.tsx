import React from 'react';
import AppointmentCalendar from '../components/appointments/AppointmentCalendar';
import { useAuth } from '../context/AuthContext';
import { mockAppointments } from '../data/mockData';

const AppointmentsPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;
  
  // Filter appointments based on user role
  const filteredAppointments = mockAppointments.filter(appointment => {
    if (currentUser.role === 'patient') {
      return appointment.patientId === currentUser.id;
    } else if (currentUser.role === 'doctor') {
      return appointment.doctorId === currentUser.id;
    }
    // Admin can see all appointments
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <p className="text-gray-600">
          {currentUser.role === 'patient' 
            ? 'View and manage your appointments' 
            : currentUser.role === 'doctor'
              ? 'View and manage your patient appointments'
              : 'View and manage all appointments'
          }
        </p>
      </div>
      
      <AppointmentCalendar 
        appointments={filteredAppointments} 
        userRole={currentUser.role as 'patient' | 'doctor' | 'admin'} 
      />
    </div>
  );
};

export default AppointmentsPage;