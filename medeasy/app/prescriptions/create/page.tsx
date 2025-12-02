import { Key, Plus, Search } from "lucide-react";
import { useState } from "react";

function CreatePrescription() {
  const [patientId, setPatientId] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<string>('');

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Prescription</h1>
      <p className="text-gray-600 mb-8">Create and send prescriptions to patients</p>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Patient Information</h2>
          <p className="text-gray-600 mb-6">Search for patient by ID</p>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter Patient ID (e.g., PAT-001)"
              className="flex-1 px-4 py-3 text-black bg-purple-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Diagnosis & Notes</h2>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis, symptoms, and additional notes..."
            className="w-full h-32 px-4 py-3 text-black bg-purple-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>

      <div className="max-w-xl ml-120  mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Prescription Medicines</h2>
        <p className="text-gray-600 mb-6">Add multiple medicines to the prescription with dosage and instructions</p>
        
        <div className="mb-4">
          <h3 className="text-gray-600 mb-4">Add First Medicine </h3>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Medicine
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Create Prescription
        </button>
      </div>
    </div>
  );
}
export default CreatePrescription;