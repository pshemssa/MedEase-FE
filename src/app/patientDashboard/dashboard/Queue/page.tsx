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
    
    // Fetch position from backend
    const fetchPosition = async () => {
      try {
        const queueData = localStorage.getItem('queueData');
        if (queueData) {
          const parsed = JSON.parse(queueData);
          const queueId = parsed.queueId;
          
          const response = await fetch(`/api/queue/position${queueId ? `?queueId=${queueId}` : ''}`);
          if (response.ok) {
            const data = await response.json();
            if (data.position !== undefined) {
              setQueuePosition(data.position);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch queue position:', error);
      }
    };

    fetchPosition(); // Initial fetch
    const interval = setInterval(fetchPosition, 5000);
    return () => clearInterval(interval);
  }, [inQueue]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinic || !department) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Call backend API to join queue
      const response = await fetch('/api/queue/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinic,
          department,
          doctor: doctor || undefined,
          reason: department,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join queue');
      }

      // Store queue data locally for reference
      const queueData = {
        clinic,
        department,
        doctor,
        position: data.data?.position || data.data?.queueNumber || 1,
        queueId: data.data?.id || data.data?.queueId,
        joinedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('queueData', JSON.stringify(queueData));
      
      // Set local state
      setQueuePosition(queueData.position);
      setInQueue(true);
    } catch (err: any) {
      setError(err.message || 'Failed to join queue. Please try again.');
      console.error('Join queue error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto mt-12 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Join Queue</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

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
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Joining Queue...
              </>
            ) : (
              'Join Queue'
            )}
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
