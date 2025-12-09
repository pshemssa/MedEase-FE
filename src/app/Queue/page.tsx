'use client';

import { useState, useEffect } from 'react';
import { Clock, Users, CheckCircle } from 'lucide-react';

const clinics = ['Kigali Hospital', 'Butare Medical Center', 'Gisenyi Clinic'];
const departments = ['General Medicine', 'Pediatrics', 'Cardiology', 'Orthopedics', 'Dermatology'];
const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis'];

export default function QueuePage() {
  const [clinic, setClinic] = useState('');
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState('');
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [inQueue, setInQueue] = useState(false);

  useEffect(() => {
    if (!inQueue) return;
    const interval = setInterval(() => {
      setQueuePosition(prev => prev && prev > 1 ? prev - 1 : prev);
    }, 5000);
    return () => clearInterval(interval);
  }, [inQueue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinic || !department) return;
    const position = Math.floor(Math.random() * 10) + 1;
    setQueuePosition(position);
    setInQueue(true);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Join Clinic Queue</h1>

        {!inQueue ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic *
              </label>
              <input
                type="text"
                value={clinic}
                onChange={(e) => setClinic(e.target.value)}
                placeholder="Enter clinic name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                list="clinics-list"
              />
              <datalist id="clinics-list">
                {clinics.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department of Treatment *
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Enter department"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                list="departments-list"
              />
              <datalist id="departments-list">
                {departments.map(d => <option key={d} value={d} />)}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor (Optional)
              </label>
              <input
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                placeholder="Enter doctor name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                list="doctors-list"
              />
              <datalist id="doctors-list">
                {doctors.map(d => <option key={d} value={d} />)}
              </datalist>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Join Queue
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center space-y-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-800">You're in the Queue!</h2>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Your Position</span>
                </div>
                <div className="text-5xl font-bold text-blue-600">{queuePosition}</div>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>Estimated wait: {queuePosition ? queuePosition * 5 : 0} minutes</span>
              </div>

              <div className="text-sm text-gray-500 pt-4 border-t">
                <p><strong>Clinic:</strong> {clinic}</p>
                <p><strong>Department:</strong> {department}</p>
                {doctor && <p><strong>Doctor:</strong> {doctor}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
