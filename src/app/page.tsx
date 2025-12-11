'use client';

import { useState } from 'react';
import type { PageType, Patient } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CreatePrescription from './prescriptions/create/page';
import PatientRecords from './patients/page';
import PrescriptionHistory from './prescriptions/history/page';
import SettingsPage from './settings/page';
import AddPatient from './components/Addpatients';
import ProfilePage from './components/ProfilePage';
import PatientQueue from './components/PatientQueue';
import Doctordashboard from './doctorDashboard/page';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';

export default function MedicalDashboard() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { toasts, removeToast, showSuccess, showError, showInfo } = useToast();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="flex-1 overflow-auto lg:ml-0">
        <Header setCurrentPage={setCurrentPage} />
        <main className="p-4 lg:p-8">
          {currentPage === 'dashboard' && <Doctordashboard setCurrentPage={setCurrentPage} />}
          {currentPage === 'queue' && <PatientQueue setCurrentPage={setCurrentPage} />}
          {currentPage === 'create-prescription' && <CreatePrescription showSuccess={showSuccess} showError={showError} showInfo={showInfo} />}
          {currentPage === 'patient-records' && (
            <PatientRecords 
              selectedPatient={selectedPatient} 
              setSelectedPatient={setSelectedPatient} 
            />
          )}
          {currentPage === 'prescription-history' && <PrescriptionHistory />}
          {currentPage === 'settings' && <SettingsPage showSuccess={showSuccess} showError={showError} showInfo={showInfo} />}
          {currentPage === 'add-patient' && <AddPatient showSuccess={showSuccess} showError={showError} showInfo={showInfo} />}
          {currentPage === 'profile' && <ProfilePage />}
        </main>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

