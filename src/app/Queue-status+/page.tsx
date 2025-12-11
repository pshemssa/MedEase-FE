'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QueueForm() {
  const [doctor, setDoctor] = useState('');
  const [department, setDepartment] = useState('');
  const [clinic, setClinic] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('queueData', JSON.stringify({
      doctor,
      department,
      clinic,
      joinedAt: new Date().toISOString(),
      position: Math.floor(Math.random() * 5) + 1
    }));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Join Queue</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Clinic
            </label>
            <select
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Choose clinic</option>
              <option value="City Medical Center">City Medical Center</option>
              <option value="Downtown Clinic">Downtown Clinic</option>
              <option value="Westside Health">Westside Health</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Choose department</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Doctor
            </label>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Choose doctor</option>
              <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
              <option value="Dr. Michael Chen">Dr. Michael Chen</option>
              <option value="Dr. Emily Davis">Dr. Emily Davis</option>
              <option value="Dr. Robert Wilson">Dr. Robert Wilson</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md"
          >
            Join Queue
          </button>
        </form>
      </div>
    </div>
  );
}