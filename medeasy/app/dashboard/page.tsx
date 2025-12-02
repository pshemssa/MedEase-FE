import { AlertCircle, Clock, FileText, Plus, Users, TrendingUp } from "lucide-react";
import { PageType, Stat } from "../types";

interface DashboardProps {
  setCurrentPage: (page: PageType) => void;
}

export default function Dashboard({ setCurrentPage }: DashboardProps) {
  const stats: Stat[] = [
    { title: "Today's Prescriptions", value: '24', subtitle: '+3 from yesterday', icon: FileText },
    { title: 'Pending Prescriptions', value: '8', subtitle: 'Awaiting dispensing', icon: Clock },
    { title: 'Total Patients', value: '1,247', subtitle: '+12 this week', icon: Users },
    { title: 'Alerts', value: '3', subtitle: 'Require attention', icon: AlertCircle },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back, Dr. Smith. Here's your practice summary.</p>
        </div>
        <button 
          onClick={() => setCurrentPage('create-prescription')}
          className="px-4 py-2 bg-blue-500 text-sm text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus className="w-3 h-3 border border-white rounded-full" />
          Add New Patient
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isGrowth = stat.subtitle.includes('+');

          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
                <Icon className="w-5 h-5 text-gray-400" />
              </div>

              <div className="text-lg text-gray-700 mb-2">{stat.value}</div>

              <p className="text-sm flex items-center gap-1 text-green-600">
                 {isGrowth && <TrendingUp className="w-4 h-4 text-green-500" />}
                 <span className="text-gray-400">{stat.subtitle}</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className=" max-w-md mx-2 text-md bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-gray-600 mb-6">Frequently used features</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => setCurrentPage('create-prescription')}
            className="w-full p-2 bg-purple-50 hover:bg-white rounded-lg flex items-center gap-4 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className=" text-gray-900">Create New Prescription</h3>
              <p className="text-sm text-gray-400">Write a new prescription</p>
            </div>
          </button>
          
          <button 
            onClick={() => setCurrentPage('patient-records')}
            className="w-full p-2 bg-purple-50 hover:bg-white rounded-lg flex items-center gap-4 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className=" text-gray-900">Patient Records</h3>
              <p className="text-sm text-gray-400">View patient history</p>
            </div>
          </button>

           <button 
            onClick={() => setCurrentPage('patient-records')}
            className="w-full p-2 bg-purple-50 hover:bg-white rounded-lg flex items-center gap-4 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className=" text-gray-900">Prescriptions History</h3>
              <p className="text-sm text-gray-400">Review past prescriptions</p>
            </div>
          </button>
          <br/>
        </div>
      </div>
    </div>
  );
}
