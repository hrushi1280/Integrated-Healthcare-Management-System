import React, { useState } from 'react';
import { Pill, Plus, Clock, Check, X, Calendar, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockPatients } from '../data/mockData';
import { Patient, Medication, Reminder } from '../types';

const MedicationsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  
  if (!currentUser || currentUser.role !== 'patient') return null;
  
  // Get patient data
  const patientData = mockPatients.find(p => p.id === currentUser.id) as Patient;
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Filter medications
  const currentMedications = patientData.medications.filter(med => med.endDate >= today);
  const pastMedications = patientData.medications.filter(med => med.endDate < today);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const MedicationCard: React.FC<{ medication: Medication }> = ({ medication }) => {
    const isActive = medication.endDate >= today;
    
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Pill size={18} className="mr-2 text-blue-500" />
            {medication.name}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isActive ? 'Active' : 'Completed'}
          </span>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Dosage</p>
              <p className="font-medium text-gray-800">{medication.dosage}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Frequency</p>
              <p className="font-medium text-gray-800">{medication.frequency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Start Date</p>
              <p className="font-medium text-gray-800">{formatDate(medication.startDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">End Date</p>
              <p className="font-medium text-gray-800">{formatDate(medication.endDate)}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Prescribed By</p>
            <p className="font-medium text-gray-800">{medication.prescribedBy}</p>
          </div>
          
          {isActive && medication.reminders.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Reminders</p>
              <div className="space-y-2">
                {medication.reminders.map(reminder => (
                  <div 
                    key={reminder.id} 
                    className={`flex items-center justify-between p-2 rounded-md ${
                      reminder.lastTaken ? 'bg-green-50' : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Clock size={14} className={`mr-2 ${
                        reminder.lastTaken ? 'text-green-500' : 'text-blue-500'
                      }`} />
                      <span className="text-sm font-medium">
                        {formatTime(reminder.time)}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {reminder.lastTaken ? (
                        <span className="text-xs text-green-600 flex items-center">
                          <Check size={14} className="mr-1" />
                          Taken
                        </span>
                      ) : (
                        <>
                          <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
                            <Check size={14} />
                          </button>
                          <button className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
                            <X size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Medications</h1>
        <p className="text-gray-600">Manage your medications and reminders</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('current')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'current'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Current Medications
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Medication History
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'current' ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Current Medications</h2>
                <button className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  <Plus size={16} />
                  <span>Add Reminder</span>
                </button>
              </div>
              
              {currentMedications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentMedications.map(medication => (
                    <MedicationCard key={medication.id} medication={medication} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="bg-gray-100 p-3 rounded-full inline-flex mb-3">
                    <Pill size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-1">No current medications</p>
                  <p className="text-sm text-gray-500">You don't have any active medications at the moment.</p>
                </div>
              )}
              
              {currentMedications.length > 0 && (
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <AlertCircle size={20} className="text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">Medication Reminders</h4>
                      <p className="text-sm text-blue-700">
                        Set up reminders for your medications to ensure you never miss a dose. 
                        You can customize reminder times and receive notifications.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Medication History</h2>
              
              {pastMedications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastMedications.map(medication => (
                    <MedicationCard key={medication.id} medication={medication} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="bg-gray-100 p-3 rounded-full inline-flex mb-3">
                    <Calendar size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-1">No medication history</p>
                  <p className="text-sm text-gray-500">You don't have any past medications in your history.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationsPage;