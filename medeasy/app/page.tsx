'use client';

import React, { useState } from 'react';
import { Users, FileText, Clock, AlertCircle, Search, Plus, Download, Settings, LayoutDashboard } from 'lucide-react';
import type { PageType, Patient, Prescription, Stat } from '../app/types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CreatePrescription from './prescriptions/create/page';
import Dashboard from './dashboard/page';
import PatientRecords from './patients/page';
import PrescriptionHistory from './prescriptions/history/page';
import SettingsPage from './settings/page';

export default function MedicalDashboard() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="flex h-screen bg-purple-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-8">
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
        </main>
      </div>
    </div>
  );
}

