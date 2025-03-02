import React from 'react';
import { Pill, Clock, Check, X } from 'lucide-react';
import { Medication } from '../../types';

interface MedicationRemindersProps {
  medications: Medication[];
}

const MedicationReminders: React.FC<MedicationRemindersProps> = ({ medications }) => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Filter active medications (current date is between start and end date)
  const activeMedications = medications.filter(med => {
    return med.startDate <= today && med.endDate >= today;
  });

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Medication Reminders</h3>
      </div>

      {activeMedications.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {activeMedications.map(medication => (
            <div key={medication.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-800 flex items-center">
                  <Pill size={16} className="mr-2 text-blue-500" />
                  {medication.name}
                </h4>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {medication.dosage}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{medication.frequency}</p>
              
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
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-500">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-gray-100 p-3 rounded-full mb-3">
              <Pill size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-600 mb-1">No active medications</p>
            <p className="text-sm text-gray-500">You don't have any medications scheduled for today</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationReminders;