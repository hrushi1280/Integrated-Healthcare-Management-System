import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { Clock, User, FileText } from 'lucide-react';
import { Appointment } from '../../types';
import 'react-calendar/dist/Calendar.css';

interface AppointmentCalendarProps {
  appointments: Appointment[];
  userRole: 'patient' | 'doctor' | 'admin';
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ appointments, userRole }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Get appointments for the selected date
  const getAppointmentsForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return appointments.filter(appointment => appointment.date === dateString);
  };
  
  // Check if a date has appointments
  const hasAppointments = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return appointments.some(appointment => appointment.date === dateString);
  };
  
  const selectedDateAppointments = getAppointmentsForDate(selectedDate);
  
  // Custom tile content to show dots for dates with appointments
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && hasAppointments(date)) {
      return (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
        </div>
      );
    }
    return null;
  };

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

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Appointment Calendar</h3>
      </div>
      
      <div className="p-4 md:flex">
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-4">
          <div className="calendar-container">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={tileContent}
              className="w-full border-0 rounded-lg shadow-sm"
              tileClassName="relative"
            />
          </div>
          
          <div className="mt-4 flex justify-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              {userRole === 'patient' ? 'Book New Appointment' : 'Add Appointment Slot'}
            </button>
          </div>
        </div>
        
        <div className="md:w-1/2 md:pl-4 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
          <h4 className="font-medium text-gray-800 mb-4">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h4>
          
          {selectedDateAppointments.length > 0 ? (
            <div className="space-y-4">
              {selectedDateAppointments.map(appointment => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-500 mr-2" />
                      <span className="font-medium">{appointment.time}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    {userRole === 'patient' ? (
                      <div className="flex items-center text-gray-700">
                        <User size={16} className="mr-1" />
                        <span>Dr. {appointment.doctorName}</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-700">
                        <User size={16} className="mr-1" />
                        <span>{appointment.patientName}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-start">
                    <FileText size={16} className="mr-1 mt-0.5 text-gray-400" />
                    <p className="text-sm text-gray-600">{appointment.reason}</p>
                  </div>
                  
                  <div className="mt-3 flex justify-end space-x-2">
                    {appointment.status === 'scheduled' && (
                      <>
                        <button className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                          {userRole === 'doctor' ? 'Confirm' : 'Reschedule'}
                        </button>
                        <button className="px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.status === 'confirmed' && userRole === 'doctor' && (
                      <button className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                <Calendar size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-600 mb-1">No appointments for this date</p>
              <p className="text-sm text-gray-500">
                {userRole === 'patient' 
                  ? 'Click "Book New Appointment" to schedule one' 
                  : 'No appointments scheduled for this day'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;