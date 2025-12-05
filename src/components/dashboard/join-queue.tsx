"use client"
import { Clock } from "lucide-react"

export default function JoinQueue() {
  const handleJoinQueue = () => {
  
    console.log('Joining queue...')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg  text-blue-500">Join Queue</h2>
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed text-sm">
        Join the virtual queue to see a doctor. You'll receive updates on your position and can track your estimated appointment time.
      </p>
      <button 
        type="button"
        onClick={handleJoinQueue}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white  py-3 px-4 rounded-md flex items-center justify-center gap-2"
      >
        <Clock className="w-4 h-4" />
        Join Queue Now
      </button>
    </div>
  )
}