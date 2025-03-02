import React from 'react';
import { Users, Calendar, Clock, CheckCircle } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import AppointmentList from '../components/dashboard/AppointmentList';
import { useAuth } from '../context/AuthContext';
import { mockAppointments, mockDoctors, mockPatients } from '../data/mockData';
import { Doctor } from '../types';

const DoctorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.role !== 'doctor') return null;
  
  // Get doctor data
  const doctorData = mockDoctors.find(d => d.id === currentUser.id) as Doctor;
  
  // Get doctor appointments
  const doctorAppointments = mockAppointments.filter(
    appointment => appointment.doctorId === currentUser.id
  );
  
  // Today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todaysAppointments = doctorAppointments.filter(
    appointment => appointment.date === today
  );
  
  // Upcoming appointments
  const upcomingAppointments = doctorAppointments.filter(
    appointment => ['scheduled', 'confirmed'].includes(appointment.status) && appointment.date >= today
  );
  
  // Stats
  const totalPatients = doctorData.patients.length;
  const totalAppointments = doctorAppointments.length;
  const completedAppointments = doctorAppointments.filter(
    appointment => appointment.status === 'completed'
  ).length;
  const appointmentToday = todaysAppointments.length;

  // Get patient list
  const patientList = mockPatients.filter(patient => 
    doctorData.patients.includes(patient.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
        <p className="text-gray-600">Welcome back, {currentUser.name}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Patients" 
          value={totalPatients} 
          icon={<Users size={20} className="text-blue-600" />}
          color="blue"
        />
        <StatCard 
          title="Appointments Today" 
          value={appointmentToday} 
          icon={<Calendar size={20} className="text-purple-600" />}
          color="purple"
        />
        <StatCard 
          title="Upcoming Appointments" 
          value={upcomingAppointments.length} 
          icon={<Clock size={20} className="text-orange-600" />}
          color="orange"
        />
        <StatCard 
          title="Completed Appointments" 
          value={completedAppointments} 
          icon={<CheckCircle size={20} className="text-green-600" />}
          color="green"
          change={{
            value: '12%',
            type: 'increase'
          }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Schedule</h2>
          <AppointmentList 
            appointments={todaysAppointments} 
            title="Today's Appointments"
            emptyMessage="You don't have any appointments scheduled for today."
            showDoctor={false}
            showPatient={true}
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
          <AppointmentList 
            appointments={upcomingAppointments.slice(0, 5)} 
            title="Upcoming Appointments"
            emptyMessage="You don't have any upcoming appointments."
            showDoctor={false}
            showPatient={true}
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Patients</h2>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {patientList.map(patient => (
              <div key={patient.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center mb-3">
                  {patient.profileImage ? (
                    <img 
                      src={patient.profileImage} 
                      alt={patient.name} 
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span className="text-gray-600 font-medium">
                        {patient.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-800">{patient.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years • {patient.bloodType}
                    </p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Allergies:</strong> {patient.allergies.join(', ') || 'None'}
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  <strong>Last Visit:</strong> {patient.medicalHistory.length > 0 
                    ? new Date(patient.medicalHistory[0].date).toLocaleDateString() 
                    : 'No previous visits'}
                </div>
                
                <div className="flex justify-end">
                  <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;