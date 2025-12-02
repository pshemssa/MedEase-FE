import { FileText, Key, Lock, Save, Shield, Users } from "lucide-react";
import { useState } from "react";

function SettingsPage() {
    const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">Manage your profile, clinic information and security settings</p>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-gray-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
              <p className="text-sm text-gray-600">Update your personal and professional information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Dr. John Smith"
                  className="w-full bg-purple-50 text-gray-300 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="john.smith@hospital.com"
                  className="w-full px-4 py-2 text-gray-300 bg-purple-50 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-2 bg-purple-50 text-gray-300 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical License</label>
                <input
                  type="text"
                  defaultValue="MD-12345678"
                  className="w-full px-4 py-2 bg-purple-50 text-gray-300 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <input
                type="text"
                defaultValue="Internal Medicine"
                className="w-full px-4 py-2 bg-purple-50 text-gray-300 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
              <textarea
                className="w-full px-4 py-2 bg-purple-50 text-gray-300 border border-gray-300 rounded-lg resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-gray-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Clinic Information</h2>
              <p className="text-sm text-gray-600">Manage your clinic or hospital details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Clinic/Hospital Name</label>
              <input
                type="text"
                defaultValue="City Medical Center"
                className="w-full px-4 py-2 bg-purple-50 text-gray-300 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                defaultValue="123 Healthcare Ave, Medical District, NY 10001"
                className="w-full px-4 py-2 bg-purple-50  text-gray-300 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 987-6543"
                  className="w-full px-4 py-2 bg-purple-50  text-gray-300 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="info@citymedical.com"
                  className="w-full px-4 py-2 bg-purple-50 text-gray-300 border border-gray-300 rounded-lg"
                />
              </div>
             
            </div>
             <div>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">Faculty Licence</label>
              <input
                type="text"
                defaultValue="Licence"
                className="w-full px-4 py-2 bg-purple-50 text-gray-300 border border-gray-300 rounded-lg"
              />
            </div>
          </div> 
          <button className="px-6 py-1 bg-blue-300 text-white rounded-lg hover:bg-blue-600">
          Save Changes
        </button>
        </div>
        
      </div>
<br/>
<div>
   
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
        <Shield className="w-8 h-8 text-black" />
       <span className="text-gray-600">Security & Privacy</span> 
      </h2>
      <p className="text-gray-600 mb-8">Manage your account security</p>

      {/* 2FA */}
      <div className="flex items-center justify-between py-6 border-b">
        <div>
          <p className="font-medium flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-500" /> <span className="text-gray-600 text-sm">Two-Factor Authentication</span> 
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Add an extra layer of security to your account
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={is2FAEnabled}
            onChange={(e) => setIs2FAEnabled(e.target.checked)}
          />
          <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
      </div>

      {/* Password Change */}
      <div className="py-8">
        <h3 className=" text-sm text-gray-500 mb-6 flex items-center gap-2">
           Change Password
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            type="password"
            placeholder="Current Password"
            className="px-4 py-3 text-gray-600 rounded-lg bg-purple-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="New Password"
            className="px-4 py-3 text-gray-600 rounded-lg bg-purple-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="px-6 py-2 border text-sm flex flex-row gap-4 text-gray-800 border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Key className="w-5 h-5 text-black " /> Update Password
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-300 w-full h-12 text-white px-70 py-4 rounded-xl flex items-center gap-3 hover:bg-blue-400 transition text-lg font-medium">
          <Save className="w-5 h-5" />
          Save Security Settings
        </button>
      </div>
    </div></div>
    </div>
  );
}
export default SettingsPage;