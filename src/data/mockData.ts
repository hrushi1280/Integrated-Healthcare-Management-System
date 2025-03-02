import { Patient, Doctor, Admin, Appointment, InventoryItem, Notification, Medication } from '../types';

// Mock Users
export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Vaibhav Pandarkar',
    email: 'john.doe@example.com',
    role: 'patient',
    profileImage: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh893m4cBHXjx-L2c-713mSnDz99cWAlbGuFtzoZB_gUAHM-ne3GbM_CU2SQoZMTEgIMPpNCV3gd0SEhcNvUxARZ3TIO2eptymWZR5-RzIm5Ov7LfZUM5Y3e18a1VLf1x6EbmmlEWEwHxk5DLEfqPTNSl3oTzqbS-t22tQ7lNScu8Tik2ANvTMqGwZZ8rs/s320/WhatsApp%20Image%202024-11-21%20at%2011.52.04.jpeg',
    dateOfBirth: '2005-05-15',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    medicalHistory: [
      {
        id: 'mr1',
        date: '2025-01-15',
        diagnosis: 'Common Cold',
        treatment: 'Rest and fluids',
        doctorId: 'd1',
        doctorName: 'Dr. Praik More'
      },
      {
        id: 'mr2',
        date: '2024-08-10',
        diagnosis: 'Sprained Ankle',
        treatment: 'RICE protocol, pain medication',
        doctorId: 'd2',
        doctorName: 'Dr. Michael Chen'
      }
    ],
    medications: [
      {
        id: 'med1',
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Twice daily',
        startDate: '2025-05-01',
        endDate: '2025-05-10',
        prescribedBy: 'Dr. Pratik More',
        reminders: [
          {
            id: 'rem1',
            medicationId: 'med1',
            time: '09:00',
            isActive: true
          },
          {
            id: 'rem2',
            medicationId: 'med1',
            time: '21:00',
            isActive: true
          }
        ]
      }
    ]
  },
  {
    id: 'p2',
    name: 'Tithi M',
    email: 'jane.smith@example.com',
    role: 'patient',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
    dateOfBirth: '2004-01-06',
    bloodType: 'A-',
    allergies: ['Sulfa drugs'],
    medicalHistory: [
      {
        id: 'mr3',
        date: '2025-02-20',
        diagnosis: 'Migraine',
        treatment: 'Sumatriptan, rest in dark room',
        doctorId: 'd1',
        doctorName: 'Dr. Sarah Johnson'
      }
    ],
    medications: [
      {
        id: 'med2',
        name: 'Sumatriptan',
        dosage: '50mg',
        frequency: 'As needed for migraine',
        startDate: '2025-02-20',
        endDate: '2025-08-20',
        prescribedBy: 'Dr. Sarah Johnson',
        reminders: [
          {
            id: 'rem3',
            medicationId: 'med2',
            time: '10:00',
            isActive: true
          }
        ]
      }
    ]
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Pratik More',
    email: 'pratikmore868@gmail.com',
    role: 'doctor',
    profileImage: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkJIY0XU91tF9t0XKud6-DcAnrCRqruItwM3YfxshHUbPldI1Z1P0T_wcNv82LevcZO86bMj8ud8CvNx1NHO3HWtjLRCF7R9VrhbXaXVQJ1UTiFudLbNDp4JruIcLAG43x1BqaM33TS1wD9v2QNx8wY17ZAhRv5rv9f_z1Ddly4aLtzqC9QaCUnu8xmCs/w256-h320/All_Video_Downloader_pratik_more_868_420459886_1380871259216852_1491009290245011428_nwebp.png',
    specialty: 'Cardiology',
    department: 'Cardiology',
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Friday', startTime: '09:00', endTime: '13:00' }
    ],
    patients: ['p1', 'p2']
  },
  {
    id: 'd2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@example.com',
    role: 'doctor',
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
    specialty: 'Orthopedics',
    department: 'Orthopedics',
    availability: [
      { day: 'Tuesday', startTime: '08:00', endTime: '16:00' },
      { day: 'Thursday', startTime: '08:00', endTime: '16:00' },
      { day: 'Saturday', startTime: '10:00', endTime: '14:00' }
    ],
    patients: ['p1']
  }
];

export const mockAdmins: Admin[] = [
  {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    profileImage: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEix16cjtmjTbtIi4kcQKfot0QsdrH04Hh3J6zThBoDsLJ8OaDTOxlPyZG_C8qUV-jg64QWeIFcf51dEjwKokNWRcyw2CDs114_V5Cv1ZC5-J89q0-xpIAmYGza8_pZk00lknKwgJqZApji6pQa5mLa-8tl6Yzd0PXlhxwfTtlNhcsXAfCiZ_tlDS5IoWaw/w240-h320/IMG-20250301-WA0010.jpg',
    department: 'Administration',
    accessLevel: 1
  }
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'app1',
    patientId: 'p1',
    patientName: 'Vaibhav Pandarkar',
    doctorId: 'd1',
    doctorName: 'Dr. Pratik More',
    date: '2025-06-15',
    time: '10:00',
    status: 'confirmed',
    reason: 'Annual checkup'
  },
  {
    id: 'app2',
    patientId: 'p2',
    patientName: 'Tithi M',
    doctorId: 'd1',
    doctorName: 'Dr. Pratik More',
    date: '2025-03-16',
    time: '14:30',
    status: 'scheduled',
    reason: 'Migraine follow-up'
  },
  {
    id: 'app3',
    patientId: 'p1',
    patientName: 'Vaibhav Pandarkar',
    doctorId: 'd2',
    doctorName: 'Dr. Michael Chen',
    date: '2025-06-20',
    time: '11:15',
    status: 'scheduled',
    reason: 'Ankle pain follow-up'
  }
];

// Mock Inventory
export const mockInventory: InventoryItem[] = [
  {
    id: 'inv1',
    name: 'Surgical Masks',
    category: 'PPE',
    quantity: 500,
    unit: 'pieces',
    threshold: 100,
    lastRestocked: '2023-05-01'
  },
  {
    id: 'inv2',
    name: 'Disposable Gloves',
    category: 'PPE',
    quantity: 200,
    unit: 'boxes',
    threshold: 50,
    lastRestocked: '2023-05-10'
  },
  {
    id: 'inv3',
    name: 'Paracetamol',
    category: 'Medication',
    quantity: 30,
    unit: 'boxes',
    threshold: 10,
    lastRestocked: '2023-04-15',
    expiryDate: '2024-04-15'
  },
  {
    id: 'inv4',
    name: 'Antibiotics',
    category: 'Medication',
    quantity: 5,
    unit: 'boxes',
    threshold: 10,
    lastRestocked: '2023-03-20',
    expiryDate: '2023-09-20'
  },
  {
    id: 'inv5',
    name: 'Syringes',
    category: 'Equipment',
    quantity: 150,
    unit: 'pieces',
    threshold: 50,
    lastRestocked: '2023-05-05'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'not1',
    userId: 'p1',
    title: 'Appointment Reminder',
    message: 'You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM.',
    type: 'appointment',
    isRead: false,
    createdAt: '2023-06-14T10:00:00Z'
  },
  {
    id: 'not2',
    userId: 'p1',
    title: 'Medication Reminder',
    message: 'Time to take your Amoxicillin (500mg).',
    type: 'medication',
    isRead: true,
    createdAt: '2023-06-14T09:00:00Z'
  },
  {
    id: 'not3',
    userId: 'd1',
    title: 'New Appointment',
    message: 'You have a new appointment with Tithi M on June 16 at 2:30 PM.',
    type: 'appointment',
    isRead: false,
    createdAt: '2025-06-13T15:30:00Z'
  },
  {
    id: 'not4',
    userId: 'a1',
    title: 'Low Inventory Alert',
    message: 'Antibiotics stock is below threshold. Current quantity: 5 boxes.',
    type: 'inventory',
    isRead: false,
    createdAt: '2025-06-12T11:45:00Z'
  }
];

// Mock Medications
export const mockMedications: Medication[] = [
  {
    id: 'med1',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2025-05-01',
    endDate: '2025-05-10',
    prescribedBy: 'Dr. Pratik More',
    reminders: [
      {
        id: 'rem1',
        medicationId: 'med1',
        time: '09:00',
        isActive: true
      },
      {
        id: 'rem2',
        medicationId: 'med1',
        time: '21:00',
        isActive: true
      }
    ]
  },
  {
    id: 'med2',
    name: 'Sumatriptan',
    dosage: '50mg',
    frequency: 'As needed for migraine',
    startDate: '2025-02-20',
    endDate: '2025-08-20',
    prescribedBy: 'Dr. Pratik More',
    reminders: [
      {
        id: 'rem3',
        medicationId: 'med2',
        time: '10:00',
        isActive: true
      }
    ]
  }
];

// Combined mock data
export const mockData = {
  patients: mockPatients,
  doctors: mockDoctors,
  admins: mockAdmins,
  appointments: mockAppointments,
  inventory: mockInventory,
  notifications: mockNotifications,
  medications: mockMedications
};

// Helper function to get user by role
export const getUserByRole = (role: string, userId: string) => {
  switch (role) {
    case 'patient':
      return mockPatients.find(patient => patient.id === userId);
    case 'doctor':
      return mockDoctors.find(doctor => doctor.id === userId);
    case 'admin':
      return mockAdmins.find(admin => admin.id === userId);
    default:
      return null;
  }
};

// Helper function to get all users
export const getAllUsers = () => {
  return [...mockPatients, ...mockDoctors, ...mockAdmins];
};