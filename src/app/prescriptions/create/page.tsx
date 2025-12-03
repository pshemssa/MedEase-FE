import { FileText, Key, Plus, Search, Send } from "lucide-react";
import { useState } from "react";

function CreatePrescription() {
  const [patientId, setPatientId] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<string>('');

  return (
    <div>
      <h1 className="text-3xl text-gray-900 mb-2">Create New Prescription</h1>
      <p className="text-gray-600 text-sm mb-8">Create and send prescriptions to patients</p>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl text-gray-900 mb-2">Patient Information</h2>
          <p className="text-gray-600 text-sm mb-6">Search for patient by ID</p>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter Patient ID (e.g., PAT-001)"
              className="flex-1 px-4 py-3 text-black bg-purple-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-500">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className=" bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl text-gray-900 mb-6">Diagnosis & Notes</h2>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis, symptoms, and additional notes..."
            className="w-full h-32 px-4 py-3 text-black bg-purple-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      </div>

      <div className="max-w-2xl ml-100  mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl text-gray-900 mb-2">Prescription Medicines</h2>
        <p className="text-gray-600 text-sm mb-6">Add multiple medicines to the prescription with dosage and instructions</p>
        
        <div className="mb-4 ">
                    <h3 className=" text-md py-3  text-gray-900 rounded-lg  flex items-center gap-3">
                      Add First Medicine
            <Plus className=" text-blue-500 w-5 h-5" />
            
          </h3>
          
          </div>

          <div className="space-y-4 border-gray-300 border-2 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
                <input
                  type="text"
                  placeholder="e.g Amoxicillin"
                  className="w-full bg-purple-50 text-sm text-gray-300 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                <input
                  type="email"
                  placeholder="e.g 500g"
                  className="w-full px-4 text-sm py-2 text-gray-300 bg-purple-50 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>
            </div>


<div className="grid grid-cols-2 gap-4">
  {/* Frequency */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Frequency</label>
    <select
      className="mt-2 w-full px-4 py-2 text-sm font-medium bg-purple-50 text-gray-700 border border-gray-300 rounded-lg"
    >
      <option value="" >Select frequency</option>
      <option>Once Daily</option>
      <option>Twice Daily</option>
      <option>Three Times Daily</option>
      <option>As Needed</option>
    </select>
  </div>

  {/* Duration */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Duration</label>
    <select
      className="mt-2 w-full px-4 py-2 text-sm font-medium bg-purple-50 text-gray-700 border border-gray-300 rounded-lg"
    >
      <option value="" >Select duration</option>
      <option>3 days</option>
      <option>5 days</option>
      <option>7 days</option>
      <option>14 days</option>
    </select>
  </div>
</div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special instructions</label>
              <input
                type="text"
                placeholder="eg: take with food"
                className="w-full px-4 py-2 text-sm bg-purple-50 text-gray-400 border border-gray-300 rounded-lg"
              />
            </div>

          <button className="px-6 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-500 flex items-center gap-3">
            <Plus className=" ml-25 w-5 h-5" />
            Add First Medicine
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end text-sm gap-4">
                  <button className="px-4 py-2 bg-purple-50  shadow-sm text-gray-400 rounded-lg hover:bg-white-500 flex items-center gap-3">
            <FileText className=" ml-10 w-5 h-5" />
            Save as Draft (0 medicines)
          </button>
         <button className="px-4 py-2 bg-blue-500 border border-gray-300 text-white rounded-lg hover:bg-white-500 flex items-center gap-3">
            <Send className=" ml-10 w-5 h-5" />
            Save and Send (0 medicines)
          </button>
      </div>
    </div>
  );
}
export default CreatePrescription;