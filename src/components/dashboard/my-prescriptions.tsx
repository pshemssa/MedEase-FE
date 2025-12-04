import { QrCode, Pill } from "lucide-react"

export default function MyPrescriptions() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="flex-shrink-0">
          <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
        </div>
        <h2 className="text-base sm:text-lg font-semibold text-blue-500 truncate">
          My Prescriptions
        </h2>
      </div>
      
      {/* QR Code Area */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 bg-gray-50/50 transition-colors hover:bg-gray-50">
        <div className="flex flex-col items-start space-y-2 sm:space-y-3">
          <QrCode className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">
              Prescription QR Code
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed max-w-xs">
              QR code will appear here when doctor sends a prescription.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}