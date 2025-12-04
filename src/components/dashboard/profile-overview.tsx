import { User, Calendar, Shield, Mail, Phone } from "lucide-react"

export default function ProfileOverview() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6 ">
        <User className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-blue-500">Profile Overview</h2>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-25 h-25 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-2xl text-blue-600">
          RM
        </div>
        <div className="flex-1">
          <h3 className="text-2xl text-gray-800">Raissa Micheline IMPUHWE MANZI</h3>
          <span className="inline-block bg-blue-50 border border-blue-300 text-blue-500 text-xs px-3 py-1 rounded-full mt-2">
            REF: RW-PAT 2024-001567
          </span>
        </div>
      </div>
      <div className="flex gap-8">
    
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-4">
            <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500">Date of Birth</p>
              <p className="text-sm text-gray-800">1985-03-15</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Shield className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Insurance</p>
              <p className="text-sm  text-gray-800">RSSB - Community Based Health Insurance</p>
            </div>
          </div>
        </div>
        
        
        <div className="flex-1 space-y-4">
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Email</p>
              <p className="text-sm font-medium text-gray-800">raissamich12@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Phone</p>
              <p className="text-sm font-medium text-gray-800">+250 788 123 456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}