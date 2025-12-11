import { FileText, LayoutDashboard, Plus, Settings, Users, Menu, X, Clock, Stethoscope } from "lucide-react";
import { PageType } from "../types";
import { useState } from "react";

interface SidebarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

export default function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const menuItems: Array<{ id: PageType; icon: React.ElementType; label: string }> = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'queue', icon: Clock, label: 'Patient Queue' },
    { id: 'create-prescription', icon: Plus, label: 'Create Prescription' },
    { id: 'patient-records', icon: Users, label: 'Patient Records' },
    { id: 'prescription-history', icon: FileText, label: 'Prescription History' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white p-6 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">MedEase</h1>
            
          </div>
          <p className="text-sm mx-10 text-gray-400">Doctor Portal</p>
          <hr className="border-gray-700 mt-4" />
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-sm flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}