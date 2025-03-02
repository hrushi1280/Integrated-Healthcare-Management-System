import React from 'react';
import { Calendar, Clock, Pill, FileText } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import AppointmentList from '../components/dashboard/AppointmentList';
import MedicationReminders from '../components/dashboard/MedicationReminders';
import { useAuth } from '../context/AuthContext';
import { mockAppointments, mockPatients } from '../data/mockData';
import { Patient } from '../types';

const PatientDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.role !== 'patient') return null;
  
  // Get patient data
  const patientData = mockPatients.find(p => p.id === currentUser.id) as Patient;
  
  // Get patient appointments
  const patientAppointments = mockAppointments.filter(
    appointment => appointment.patientId === currentUser.id
  );
  
  // Upcoming appointments
  const upcomingAppointments = patientAppointments.filter(
    appointment => ['scheduled', 'confirmed'].includes(appointment.status)
  );
  
  // Stats
  const totalAppointments = patientAppointments.length;
  const completedAppointments = patientAppointments.filter(
    appointment => appointment.status === 'completed'
  ).length;
  const activeMedications = patientData.medications.length;
  const medicalRecords = patientData.medicalHistory.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Patient Dashboard</h1>
        <p className="text-gray-600">Welcome back, {currentUser.name}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Upcoming Appointments" 
          value={upcomingAppointments.length} 
          icon={<Calendar size={20} className="text-blue-600" />}
          color="blue"
        />
        <StatCard 
          title="Completed Visits" 
          value={completedAppointments} 
          icon={<Clock size={20} className="text-green-600" />}
          color="green"
        />
        <StatCard 
          title="Active Medications" 
          value={activeMedications} 
          icon={<Pill size={20} className="text-purple-600" />}
          color="purple"
        />
        <StatCard 
          title="Medical Records" 
          value={medicalRecords} 
          icon={<FileText size={20} className="text-orange-600" />}
          color="orange"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentList 
          appointments={upcomingAppointments.slice(0, 3)} 
          title="Upcoming Appointments"
          emptyMessage="You don't have any upcoming appointments."
          showDoctor={true}
          showPatient={false}
        />
        
        <MedicationReminders medications={patientData.medications} />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Medical Records</h2>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {patientData.medicalHistory.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {patientData.medicalHistory.slice(0, 3).map(record => (
                <div key={record.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-500">{new Date(record.date).toLocaleDateString()}</span>
                    <span className="text-sm text-gray-500">{record.doctorName}</span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">{record.diagnosis}</h3>
                  <p className="text-sm text-gray-600">{record.treatment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No medical records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;