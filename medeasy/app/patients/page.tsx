import { Search, Users } from "lucide-react";
import { Patient } from "../types";

interface PatientRecordsProps {
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
}

export default function PatientRecords({ selectedPatient, setSelectedPatient }: PatientRecordsProps) {
  const patients: Patient[] = [
    { id: 'PAT-001', name: 'John Doe', gender: 'Male', phone: '+1 (555) 123-4567', lastVisit: '1/15/2024', prescriptions: 12 },
    { id: 'PAT-002', name: 'Sarah Wilson', gender: 'Female', phone: '+1 (555) 234-5678', lastVisit: '1/18/2024', prescriptions: 5 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Records</h1>
      <p className="text-gray-600 mb-8">Search and manage patient medical records</p>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Patient Directory</h2>
        <p className="text-gray-600 mb-6">Search and select patients to view their records</p>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or patient ID..."
              className="w-full bg-purple-50 pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Last Visit</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Prescriptions</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-600">{patient.id} • {patient.gender}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{patient.phone}</td>
                  <td className="py-4 px-4 text-gray-700">{patient.lastVisit}</td>
                  <td className="py-4 px-4 text-gray-700">{patient.prescriptions}</td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-700">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!selectedPatient && (
        <div className="mt-8 text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Select a patient to view their details</p>
        </div>
      )}
    </div>
  );
}