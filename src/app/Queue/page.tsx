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
    
    // Generate queue data
    const queueId = `Q-${Date.now()}`;
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    // Get existing queue
    const existingQueue = JSON.parse(localStorage.getItem('patientQueue') || '[]');
    const queueNumber = existingQueue.length + 1;
    
    // Create queue patient object
    const queuePatient = {
      id: queueId,
      name: 'Patient ' + queueNumber, // You can modify this to get actual patient name
      appointmentTime: currentTime,
      reason: department,
      status: 'waiting' as const,
      queueNumber: queueNumber
    };
    
    // Add to queue
    existingQueue.push(queuePatient);
    localStorage.setItem('patientQueue', JSON.stringify(existingQueue));
    
    // Set local state
    const position = queueNumber;
    setQueuePosition(position);
    setInQueue(true);
  };

  return (
   <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Join Queue</h1>

        {!inQueue ? (
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
        ) : (
          <div className="card fade-in">
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
