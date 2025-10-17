import React, { useState } from 'react';
import { 
  Save, 
  User, 
  Globe, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Shield,
  Bell,
  Database,
  Mail,
  Lock
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'users', label: 'Admin Users', icon: User },
    
  ];

  const handleSaveChanges = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Name
                </label>
                <input
                  type="text"
                  defaultValue="Dental Admin Portal"
                  className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-transparent bg-sky-50 text-sky-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Language
                </label>
                <select className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-transparent bg-sky-50 text-sky-700">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Zone
                </label>
                <select className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-transparent bg-sky-50 text-sky-700">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-6 (Central Time)</option>
                  <option>UTC-7 (Mountain Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                </select>
              </div>
             
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System Description
              </label>
              <textarea
                rows={4}
                defaultValue="Professional dental practice management system for clinics and healthcare providers."
                className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-transparent bg-sky-50 text-sky-700"
              />
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-sky-600" />
                Admin Users Management
              </h3>
              <button className="mt-3 sm:mt-0 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-4 py-2.5 rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all duration-200 flex items-center shadow-sm hover:shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Add Admin User
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-sky-25 rounded-xl p-6 border border-sky-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-3 rounded-xl text-white">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">John Admin</p>
                    <p className="text-sm text-sky-600">john.admin@dentalportal.com</p>
                    <p className="text-xs text-gray-500 mt-1">Super Administrator</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-600 transition-all duration-200">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-600 transition-all duration-200">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-sky-25 rounded-xl p-6 border border-sky-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-3 rounded-xl text-white">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Sarah Manager</p>
                    <p className="text-sm text-sky-600">sarah.manager@dentalportal.com</p>
                    <p className="text-xs text-gray-500 mt-1">Content Manager</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-600 transition-all duration-200">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-600 transition-all duration-200">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-sky-25 rounded-xl p-6 border border-sky-100">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-3 rounded-xl text-white">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Mike Operator</p>
                    <p className="text-sm text-sky-600">mike.operator@dentalportal.com</p>
                    <p className="text-xs text-gray-500 mt-1">Support Operator</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-600 transition-all duration-200">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-600 transition-all duration-200">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

     
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-25">
      <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
       

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
          {/* Tabs Navigation */}
          <div className="border-b border-sky-100">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-sky-500 text-sky-600 bg-sky-25'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-sky-100">
              <button
                onClick={handleSaveChanges}
                disabled={saving}
                className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-3 rounded-xl hover:from-sky-600 hover:to-sky-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center shadow-sm hover:shadow-md"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Settings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-sky-100 p-3 rounded-xl">
                <Settings className="h-6 w-6 text-sky-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">System Status</p>
                <p className="text-lg font-semibold text-gray-900">Operational</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Security Level</p>
                <p className="text-lg font-semibold text-gray-900">High</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-100 p-3 rounded-xl">
                <Database className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Last Backup</p>
                <p className="text-lg font-semibold text-gray-900">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;