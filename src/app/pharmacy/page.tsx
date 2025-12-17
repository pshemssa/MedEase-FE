'use client';

import { useState } from 'react';
import { Pill, QrCode, Search, History, Package } from 'lucide-react';

export default function PharmacyDashboard() {
  const [activeTab, setActiveTab] = useState('retrieve');
  const [prescriptionRef, setPrescriptionRef] = useState('');
  const [currentPrescription, setCurrentPrescription] = useState<any>(null);

  const mockPrescriptions = {
    'RX001': {
      id: 'RX001',
      patientName: 'John Doe',
      condition: 'Hypertension',
      medicines: [
        { name: 'Amlodipine 5mg', quantity: 30, available: true, dispensed: 0 },
        { name: 'Lisinopril 10mg', quantity: 30, available: false, dispensed: 0 }
      ],
      status: 'pending',
      prescribedDate: '2024-01-15'
    }
  };

  const handleRetrievePrescription = () => {
    const prescription = mockPrescriptions[prescriptionRef as keyof typeof mockPrescriptions];
    if (prescription) {
      setCurrentPrescription(prescription);
    } else {
      alert('Prescription not found or expired');
    }
  };

  const handleDispense = (medicineIndex: number, quantity: number) => {
    if (currentPrescription) {
      const updated = { ...currentPrescription };
      updated.medicines[medicineIndex].dispensed = quantity;
      setCurrentPrescription(updated);
    }
  };

  const handleConfirmDispensing = () => {
    if (currentPrescription) {
      const dispensedItems = JSON.parse(localStorage.getItem('dispensedHistory') || '[]');
      dispensedItems.push({
        ...currentPrescription,
        dispensedDate: new Date().toISOString(),
        status: 'dispensed'
      });
      localStorage.setItem('dispensedHistory', JSON.stringify(dispensedItems));
      setCurrentPrescription(null);
      setPrescriptionRef('');
      alert('Prescription dispensed successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Pharmacy Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Pending Prescriptions</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <Pill className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Dispensed Today</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <History className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Total Dispensed</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('retrieve')}
              className={`px-6 py-3 font-medium ${activeTab === 'retrieve' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              Retrieve Prescription
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 font-medium ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              Dispensing History
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'retrieve' && (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prescription Reference Number
                    </label>
                    <input
                      type="text"
                      value={prescriptionRef}
                      onChange={(e) => setPrescriptionRef(e.target.value)}
                      placeholder="Enter reference number (e.g., RX001)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <button
                      onClick={handleRetrievePrescription}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Retrieve
                    </button>
                    <button 
                      onClick={() => {
                        // Simulate QR scan - in real app would open camera
                        const mockQRData = 'RX001';
                        setPrescriptionRef(mockQRData);
                        alert('QR Code scanned: ' + mockQRData);
                      }}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
                    >
                      <QrCode className="w-4 h-4" />
                      Scan QR
                    </button>
                  </div>
                </div>

                {currentPrescription && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Prescription Details</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-600">Patient Name</p>
                        <p className="font-medium">{currentPrescription.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Medical Condition</p>
                        <p className="font-medium">{currentPrescription.condition}</p>
                      </div>
                    </div>

                    <h4 className="font-semibold mb-3">Prescribed Medicines</h4>
                    <div className="space-y-3">
                      {currentPrescription.medicines.map((medicine: any, index: number) => (
                        <div key={index} className="bg-white rounded-lg p-4 border">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{medicine.name}</p>
                              <p className="text-sm text-gray-600">Prescribed: {medicine.quantity}</p>
                              <p className={`text-sm ${medicine.available ? 'text-green-600' : 'text-red-600'}`}>
                                {medicine.available ? 'Available' : 'Out of Stock'}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                max={medicine.quantity}
                                min="0"
                                value={medicine.dispensed}
                                onChange={(e) => handleDispense(index, parseInt(e.target.value) || 0)}
                                className="w-20 px-2 py-1 border rounded"
                                disabled={!medicine.available}
                              />
                              <span className="text-sm text-gray-600">dispensed</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <textarea
                        placeholder="Add notes for unavailable medicines..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={3}
                      />
                    </div>

                    <button
                      onClick={handleConfirmDispensing}
                      className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                    >
                      Confirm Dispensing
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Dispensing History</h3>
                <div className="space-y-3">
                  {JSON.parse(localStorage.getItem('dispensedHistory') || '[]').map((item: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{item.patientName}</p>
                          <p className="text-sm text-gray-600">Ref: {item.id}</p>
                          <p className="text-sm text-gray-600">Dispensed: {new Date(item.dispensedDate).toLocaleDateString()}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          Dispensed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}