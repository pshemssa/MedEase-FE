import { Prescription } from "@/app/types";
import { Download, Search } from "lucide-react";

function PrescriptionHistory() {
  const prescriptions: Prescription[] = [
    { id: 'PRX-001', patient: 'John Doe', date: '1/15/2024', diagnosis: 'Hypertension management', medicines: 2 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prescription History</h1>
          <p className="text-gray-600">View and manage all prescriptions</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
        <p className="text-sm text-gray-600 mb-4">Filter prescriptions by search, status, and date</p>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name, prescription ID..."
              className="w-full bg-purple-50 text-black pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-3 bg-purple-50 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <select className="px-4 py-3 bg-purple-50 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Dates</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">All Prescriptions</h3>
        <p className="text-sm text-gray-600 mb-6">Showing 5 of 10 prescriptions</p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Prescription ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Diagnosis</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Medicines</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription) => (
                <tr key={prescription.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-blue-500">{prescription.id}</td>
                  <td className="py-4 px-4 text-gray-700">{prescription.patient}</td>
                  <td className="py-4 px-4 text-gray-700">{prescription.date}</td>
                  <td className="py-4 px-4 text-gray-700">{prescription.diagnosis}</td>
                  <td className="py-4 px-4 text-gray-700">{prescription.medicines} medicines</td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-600">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default PrescriptionHistory;