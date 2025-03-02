import React from 'react';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { Appointment } from '../../types';

interface AppointmentListProps {
  appointments: Appointment[];
  title: string;
  emptyMessage: string;
  showPatient?: boolean;
  showDoctor?: boolean;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  title,
  emptyMessage,
  showPatient = false,
  showDoctor = true,
}) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>

      {appointments.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {showPatient && (
                    <div className="flex items-center text-gray-700 mr-4">
                      <User size={16} className="mr-1" />
                      <span>{appointment.patientName}</span>
                    </div>
                  )}
                  {showDoctor && (
                    <div className="flex items-center text-gray-700">
                      <User size={16} className="mr-1" />
                      <span>{appointment.doctorName}</span>
                    </div>
                  )}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar size={16} className="mr-1" />
                <span>{formatDate(appointment.date)}</span>
                <span className="mx-2">•</span>
                <Clock size={16} className="mr-1" />
                <span>{appointment.time}</span>
              </div>

              <div className="flex items-start">
                <FileText size={16} className="mr-1 mt-0.5 text-gray-400" />
                <p className="text-sm text-gray-600">{appointment.reason}</p>
              </div>

              <div className="mt-3 flex justify-end space-x-2">
                <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                  Details
                </button>
                {appointment.status === 'scheduled' && (
                  <button className="px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-500">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;