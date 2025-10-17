import React from 'react';
import { 
  Download, 
  TrendingUp, 
  Users, 
  FileText, 
  UserCheck, 
  Building,
  BarChart3,
  Calendar,
  Eye,
  Filter,
  ChevronDown
} from 'lucide-react';
import Chart from './Chart';

const Analytics: React.FC = () => {
  const applicationStatusData = {
    labels: ['Approved', 'Pending', 'Rejected', 'In Process'],
    datasets: [{
      data: [89, 23, 12, 32],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#0ea5e9']
    }]
  };

  const clinicGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'New Clinics',
      data: [45, 52, 48, 61, 58, 67],
      borderColor: '#0ea5e9',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const doctorStatusData = {
    labels: ['Active', 'Resigned'],
    datasets: [{
      data: [89, 12],
      backgroundColor: ['#10B981', '#EF4444']
    }]
  };

  const monthlyApplicationsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Applications',
      data: [12, 18, 15, 22, 19, 25],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [120, 150, 180, 200, 240, 280],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Active Users',
        data: [80, 110, 130, 160, 190, 220],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-25">
      <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
       
       <button className="bg-white  text-sky-600 hover:bg-sky-50 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-sm hover:shadow-md">
                <Download className="h-4 w-4 mr-2" />
                Export Reports
              </button>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sky-600 text-sm font-semibold uppercase tracking-wide">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">156</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-sm text-emerald-600 font-medium">+12% this month</span>
                </div>
              </div>
              <div className="bg-sky-100 p-3 rounded-xl">
                <FileText className="h-6 w-6 text-sky-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Active Doctors</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">89</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-sm text-emerald-600 font-medium">+8% this month</span>
                </div>
              </div>
              <div className="bg-emerald-100 p-3 rounded-xl">
                <UserCheck className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Total Clinics</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">2,341</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-sm text-emerald-600 font-medium">+15% this month</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-semibold uppercase tracking-wide">Approval Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">78%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
                  <span className="text-sm text-emerald-600 font-medium">+5% this month</span>
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl">
                <BarChart3 className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Status Breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-sky-600" />
                Application Status Breakdown
              </h3>
              <button className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </button>
            </div>
            <div className="h-80">
              <Chart type="pie" data={applicationStatusData} />
            </div>
          </div>

          {/* Clinic Growth Over Time */}
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Building className="h-5 w-5 mr-2 text-sky-600" />
                Clinic Growth Over Time
              </h3>
              <button className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </button>
            </div>
            <div className="h-80">
              <Chart type="line" data={clinicGrowthData} />
            </div>
          </div>

          {/* Doctor Status Distribution */}
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-sky-600" />
                Doctor Status Distribution
              </h3>
              <button className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </button>
            </div>
            <div className="h-80">
              <Chart type="pie" data={doctorStatusData} />
            </div>
          </div>

          {/* Monthly Applications Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-sky-600" />
                Monthly Applications Trend
              </h3>
              <button className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </button>
            </div>
            <div className="h-80">
              <Chart type="line" data={monthlyApplicationsData} />
            </div>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-sky-600" />
                User Growth Analytics
              </h3>
              <button className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </button>
            </div>
            <div className="h-80">
              <Chart type="line" data={userGrowthData} />
            </div>
          </div>
        </div>

        {/* Quick Stats & Export Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-sky-600" />
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-sky-25 rounded-xl border border-sky-100">
                <span className="text-sm font-medium text-gray-700">Avg. Processing Time</span>
                <span className="text-sm font-semibold text-sky-600">2.3 days</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-25 rounded-xl border border-emerald-100">
                <span className="text-sm font-medium text-gray-700">Success Rate</span>
                <span className="text-sm font-semibold text-emerald-600">94.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-25 rounded-xl border border-amber-100">
                <span className="text-sm font-medium text-gray-700">User Satisfaction</span>
                <span className="text-sm font-semibold text-amber-600">4.8/5.0</span>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Download className="h-5 w-5 mr-2 text-sky-600" />
              Export Reports
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="border-2 border-dashed border-sky-200 rounded-xl p-4 hover:border-sky-500 hover:bg-sky-25 transition-all duration-200 group">
                <div className="text-center">
                  <FileText className="h-8 w-8 text-sky-400 group-hover:text-sky-600 mx-auto mb-2 transition-colors" />
                  <p className="font-medium text-gray-900 group-hover:text-sky-700 transition-colors">Doctor Applications Report</p>
                  <p className="text-sm text-gray-500 group-hover:text-sky-600 transition-colors">Export as CSV or PDF</p>
                </div>
              </button>

              <button className="border-2 border-dashed border-sky-200 rounded-xl p-4 hover:border-emerald-500 hover:bg-emerald-25 transition-all duration-200 group">
                <div className="text-center">
                  <Building className="h-8 w-8 text-sky-400 group-hover:text-emerald-600 mx-auto mb-2 transition-colors" />
                  <p className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">Clinic Analytics Report</p>
                  <p className="text-sm text-gray-500 group-hover:text-emerald-600 transition-colors">Export as CSV or PDF</p>
                </div>
              </button>

              <button className="border-2 border-dashed border-sky-200 rounded-xl p-4 hover:border-purple-500 hover:bg-purple-25 transition-all duration-200 group">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-sky-400 group-hover:text-purple-600 mx-auto mb-2 transition-colors" />
                  <p className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">System Performance Report</p>
                  <p className="text-sm text-gray-500 group-hover:text-purple-600 transition-colors">Export as CSV or PDF</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-sky-600" />
            Recent Analytics Activity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-sky-25 rounded-xl p-4 border border-sky-100">
              <div className="text-2xl font-bold text-sky-600">12</div>
              <div className="text-sm text-gray-600">Reports Generated Today</div>
            </div>
            <div className="bg-emerald-25 rounded-xl p-4 border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-600">89%</div>
              <div className="text-sm text-gray-600">Data Accuracy</div>
            </div>
            <div className="bg-amber-25 rounded-xl p-4 border border-amber-100">
              <div className="text-2xl font-bold text-amber-600">24/7</div>
              <div className="text-sm text-gray-600">Real-time Monitoring</div>
            </div>
            <div className="bg-purple-25 rounded-xl p-4 border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">15min</div>
              <div className="text-sm text-gray-600">Avg. Update Interval</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;