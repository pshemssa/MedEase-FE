import { FileText, LayoutDashboard, Plus, Settings, Users } from "lucide-react";
import { PageType } from "../types";

// components/Sidebar.tsx
interface SidebarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

export default function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const menuItems: Array<{ id: PageType; icon: any; label: string }> = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'create-prescription', icon: Plus, label: 'Create Prescription' },
    { id: 'patient-records', icon: Users, label: 'Patient Records' },
    { id: 'prescription-history', icon: FileText, label: 'Prescription History' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-6">
      <div className="mb-8">
        <h2 className="text-sm text-gray-400 mb-4">Doctor Portal</h2>
        <hr className="text-gray-600 w-full"/>
        <br/>
        
      </div>
      <h1 className="text-sm text-gray-600">Medical Dashboard</h1>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full text-sm flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-500 text-white'
                  : 'text-blue-400 hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}