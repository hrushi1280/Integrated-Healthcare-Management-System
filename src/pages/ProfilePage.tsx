import React from 'react';
import { User, Mail, Calendar, Droplet, AlertCircle, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockPatients, mockDoctors, mockAdmins } from '../data/mockData';
import { Patient, Doctor, Admin } from '../types';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;
  
  // Get detailed user data based on role
  let userData: Patient | Doctor | Admin | null = null;
  
  switch (currentUser.role) {
    case 'patient':
      userData = mockPatients.find(p => p.id === currentUser.id) as Patient;
      break;
    case 'doctor':
      userData = mockDoctors.find(d => d.id === currentUser.id) as Doctor;
      break;
    case 'admin':
      userData = mockAdmins.find(a => a.id === currentUser.id) as Admin;
      break;
  }
  
  if (!userData) return null;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-600">View and manage your profile information</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="md:flex">
          {/* Profile Sidebar */}
          <div className="md:w-1/3 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex flex-col items-center">
              {userData.profileImage ? (
                <img 
                  src={userData.profileImage} 
                  alt={userData.name} 
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <User size={48} className="text-gray-400" />
                </div>
              )}
              
              <h2 className="text-xl font-bold text-gray-800 mb-1">{userData.name}</h2>
              <p className="text-gray-600 mb-4 capitalize">{userData.role}</p>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <Edit size={16} />
                <span>Edit Profile</span>
              </button>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center text-gray-700">
                <Mail size={18} className="mr-3 text-gray-500" />
                <span>{userData.email}</span>
              </div>
              
              {userData.role === 'patient' && (
                <>
                  <div className="flex items-center text-gray-700">
                    <Calendar size={18} className="mr-3 text-gray-500" />
                    <span>Born {formatDate((userData as Patient).dateOfBirth)}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Droplet size={18} className="mr-3 text-gray-500" />
                    <span>Blood Type: {(userData as Patient).bloodType}</span>
                  </div>
                </>
              )}
              
              {userData.role === 'doctor' && (
                <>
                  <div className="flex items-center text-gray-700">
                    <User size={18} className="mr-3 text-gray-500" />
                    <span>Specialty: {(userData as Doctor).specialty}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <User size={18} className="mr-3 text-gray-500" />
                    <span>Department: {(userData as Doctor).department}</span>
                  </div>
                </>
              )}
              
              {userData.role === 'admin' && (
                <>
                  <div className="flex items-center text-gray-700">
                    <User size={18} className="mr-3 text-gray-500" />
                    <span>Department: {(userData as Admin).department}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <User size={18} className="mr-3 text-gray-500" />
                    <span>Access Level: {(userData as Admin).accessLevel}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="md:w-2/3 p-6">
            {userData.role === 'patient' && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Allergies</h4>
                  {(userData as Patient).allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {(userData as Patient).allergies.map((allergy, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No known allergies</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Medical History</h4>
                  {(userData as Patient).medicalHistory.length > 0 ? (
                    <div className="space-y-4">
                      {(userData as Patient).medicalHistory.map(record => (
                        <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <h5 className="font-medium text-gray-800">{record.diagnosis}</h5>
                            <span className="text-sm text-gray-500">{formatDate(record.date)}</span>
                          </div>
                          <p className="text-gray-600 mb-2">{record.treatment}</p>
                          <p className="text-sm text-gray-500">Doctor: {record.doctorName}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No medical history records</p>
                  )}
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <AlertCircle size={20} className="text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">Privacy Notice</h4>
                      <p className="text-sm text-blue-700">
                        Your medical information is kept private and secure. Only authorized healthcare 
                        providers can access your complete medical records.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {userData.role === 'doctor' && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Information</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Availability</h4>
                  <div className="space-y-2">
                    {(userData as Doctor).availability.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-800">{slot.day}</span>
                        <span className="text-gray-600">{slot.startTime} - {slot.endTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Patients</h4>
                  <p className="text-gray-600 mb-2">
                    You currently have {(userData as Doctor).patients.length} patients under your care.
                  </p>
                  <button className="text-blue-600 hover:text-blue-800">
                    View patient list
                  </button>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <AlertCircle size={20} className="text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">Update Your Schedule</h4>
                      <p className="text-sm text-blue-700">
                        Keep your availability up to date to ensure patients can book appointments 
                        during your working hours.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {userData.role === 'admin' && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Administrative Information</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Manage hospital inventory and supplies</li>
                    <li>Oversee staff accounts and permissions</li>
                    <li>Monitor system operations and performance</li>
                    <li>Generate and analyze reports</li>
                    <li>Ensure compliance with healthcare regulations</li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">System Access</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">User Management</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Full Access</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">Inventory Management</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Full Access</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">Financial Records</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">View Only</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <AlertCircle size={20} className="text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">Security Reminder</h4>
                      <p className="text-sm text-blue-700">
                        As an administrator, you have access to sensitive information. 
                        Remember to log out when you're not using the system and never share your credentials.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;