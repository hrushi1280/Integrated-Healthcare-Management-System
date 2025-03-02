export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  profileImage?: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  bloodType: string;
  allergies: string[];
  medicalHistory: MedicalRecord[];
  medications: Medication[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialty: string;
  department: string;
  availability: Availability[];
  patients: string[]; // Patient IDs
}

export interface Admin extends User {
  role: 'admin';
  department: string;
  accessLevel: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'canceled';
  reason: string;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  doctorId: string;
  doctorName: string;
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  prescribedBy: string;
  reminders: Reminder[];
}

export interface Reminder {
  id: string;
  medicationId: string;
  time: string;
  isActive: boolean;
  lastTaken?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  threshold: number;
  lastRestocked: string;
  expiryDate?: string;
}

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'medication' | 'system' | 'inventory';
  isRead: boolean;
  createdAt: string;
}