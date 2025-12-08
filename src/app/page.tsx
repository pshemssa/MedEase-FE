'use client';

import { useState } from 'react';
import type { PageType, Patient } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CreatePrescription from './prescriptions/create/page';
import Dashboard from './doctorDashboard/page';
import PatientRecords from './patients/page';
import PrescriptionHistory from './prescriptions/history/page';
import SettingsPage from './settings/page';
import AddPatient from './components/Addpatients';
import ProfilePage from './components/ProfilePage';

export default function MedicalDashboard() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="flex-1 overflow-auto lg:ml-0">
        <Header setCurrentPage={setCurrentPage} />
        <main className="p-4 lg:p-8">
          {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
          {currentPage === 'create-prescription' && <CreatePrescription />}
          {currentPage === 'patient-records' && (
            <PatientRecords 
              selectedPatient={selectedPatient} 
              setSelectedPatient={setSelectedPatient} 
            />
          )}
          {currentPage === 'prescription-history' && <PrescriptionHistory />}
          {currentPage === 'settings' && <SettingsPage />}
          {currentPage === 'add-patient' && <AddPatient />}
          {currentPage === 'profile' && <ProfilePage />}
        </main>
      </div>
    </div>
  );
}

