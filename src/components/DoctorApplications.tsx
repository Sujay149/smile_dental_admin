import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  AlertCircle, 
  Loader, 
  Filter,
  ChevronDown,
  ChevronUp,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Shield,
  Star,
  Edit,
  Send,
  Calendar as CalendarIcon
} from 'lucide-react';

interface Application {
  id: string;
  doctorName: string;
  email: string;
  mobileNumber?: string;
  countryCode?: string;
  licenseNumber?: string;
  specialization: string;
  experience: string;
  clinicAddress?: string;
  dateOfApplication: string;
  status: 'new' | 'in-process' | 'pending' | 'approved' | 'rejected';
}

const DoctorApplications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedAppIdForStatusChange, setSelectedAppIdForStatusChange] = useState('');
  const [newStatusToApply, setNewStatusToApply] = useState<'new' | 'in-process' | 'pending'>('new');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'DENT-001',
      doctorName: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@dentalclinic.com',
      mobileNumber: '9876543210',
      countryCode: '+1',
      licenseNumber: 'DENT12345',
      specialization: 'Orthodontics',
      experience: '8 years',
      clinicAddress: '123 Dental Street, New York, NY',
      dateOfApplication: '2024-01-15',
      status: 'pending'
    },
    {
      id: 'DENT-002',
      doctorName: 'Dr. Michael Chen',
      email: 'michael.chen@dentalcare.com',
      mobileNumber: '9876543211',
      countryCode: '+1',
      licenseNumber: 'DENT12346',
      specialization: 'Periodontics',
      experience: '12 years',
      clinicAddress: '456 Smile Avenue, Los Angeles, CA',
      dateOfApplication: '2024-01-14',
      status: 'new'
    },
    {
      id: 'DENT-003',
      doctorName: 'Dr. Emily Davis',
      email: 'emily.davis@smileclinic.com',
      mobileNumber: '9876543212',
      countryCode: '+1',
      licenseNumber: 'DENT12347',
      specialization: 'Pediatric Dentistry',
      experience: '6 years',
      clinicAddress: '789 Tooth Lane, Chicago, IL',
      dateOfApplication: '2024-01-13',
      status: 'in-process'
    },
    {
      id: 'DENT-004',
      doctorName: 'Dr. Robert Wilson',
      email: 'robert.wilson@dentalpro.com',
      mobileNumber: '9876543213',
      countryCode: '+1',
      licenseNumber: 'DENT12348',
      specialization: 'Oral Surgery',
      experience: '15 years',
      clinicAddress: '321 Gum Road, Houston, TX',
      dateOfApplication: '2024-01-12',
      status: 'approved'
    },
    {
      id: 'DENT-005',
      doctorName: 'Dr. Maria Garcia',
      email: 'maria.garcia@brightsmile.com',
      mobileNumber: '9876543214',
      countryCode: '+1',
      licenseNumber: 'DENT12349',
      specialization: 'Cosmetic Dentistry',
      experience: '10 years',
      clinicAddress: '654 Bright Avenue, Miami, FL',
      dateOfApplication: '2024-01-11',
      status: 'rejected'
    },
    {
      id: 'DENT-006',
      doctorName: 'Dr. James Brown',
      email: 'james.brown@dentalcare.com',
      mobileNumber: '9876543215',
      countryCode: '+1',
      licenseNumber: 'DENT12350',
      specialization: 'Endodontics',
      experience: '9 years',
      clinicAddress: '987 Root Canal Street, Seattle, WA',
      dateOfApplication: '2024-01-10',
      status: 'pending'
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Applications', count: applications.length, icon: FileText },
    { id: 'new', label: 'New', count: applications.filter(app => app.status === 'new').length, icon: Star },
    { id: 'in-process', label: 'In Process', count: applications.filter(app => app.status === 'in-process').length, icon: Clock },
    { id: 'pending', label: 'Pending Review', count: applications.filter(app => app.status === 'pending').length, icon: AlertCircle },
    { id: 'approved', label: 'Approved', count: applications.filter(app => app.status === 'approved').length, icon: CheckCircle },
    { id: 'rejected', label: 'Rejected', count: applications.filter(app => app.status === 'rejected').length, icon: XCircle }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { 
        color: 'bg-sky-100 text-sky-800 border-sky-200', 
        icon: Star,
        label: 'NEW'
      },
      'in-process': { 
        color: 'bg-amber-100 text-amber-800 border-amber-200', 
        icon: Clock,
        label: 'IN PROCESS'
      },
      pending: { 
        color: 'bg-orange-100 text-orange-800 border-orange-200', 
        icon: AlertCircle,
        label: 'PENDING REVIEW'
      },
      approved: { 
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
        icon: CheckCircle,
        label: 'APPROVED'
      },
      rejected: { 
        color: 'bg-rose-100 text-rose-800 border-rose-200', 
        icon: XCircle,
        label: 'REJECTED'
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${config.color}`}>
        <Icon className="w-3 h-3 mr-1.5" />
        {config.label}
      </span>
    );
  };

  const handleStatusUpdate = async (applicationId: string, newStatus: 'new' | 'in-process' | 'pending' | 'approved' | 'rejected') => {
    try {
      setUpdatingStatus(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setApplications(prevApplications =>
        prevApplications.map(app =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      setError('Failed to update status. Please try again.');
      console.error('Error updating status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleFormStatusUpdate = async () => {
    if (selectedAppIdForStatusChange) {
      await handleStatusUpdate(selectedAppIdForStatusChange, newStatusToApply);
      setSelectedAppIdForStatusChange('');
      setNewStatusToApply('new');
    }
  };

  const filteredApplications = applications
    .filter(app => {
      const matchesSearch = app.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = activeTab === 'all' || app.status === activeTab;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.dateOfApplication).getTime();
          bValue = new Date(b.dateOfApplication).getTime();
          break;
        case 'name':
          aValue = a.doctorName.toLowerCase();
          bValue = b.doctorName.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const pendingApplications = applications.filter(app => app.status === 'pending');

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    new: applications.filter(app => app.status === 'new').length,
    inProcess: applications.filter(app => app.status === 'in-process').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-25">
      <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sky-600 text-sm font-semibold uppercase tracking-wide">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="bg-sky-100 p-3 rounded-xl">
                <FileText className="h-6 w-6 text-sky-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-500 text-sm font-semibold uppercase tracking-wide">Pending Review</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pending}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <AlertCircle className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sky-500 text-sm font-semibold uppercase tracking-wide">New Applications</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.new}</p>
              </div>
              <div className="bg-sky-50 p-3 rounded-xl">
                <Star className="h-6 w-6 text-sky-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-500 text-sm font-semibold uppercase tracking-wide">In Process</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.inProcess}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl">
                <Loader className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
          {/* Tabs Section */}
         <div className="border-b border-sky-100">
  <div className="px-6 py-4">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
      {/* Tabs section with hidden scrollbar */}
      <div className="flex overflow-x-auto pb-2 lg:pb-0 space-x-1 bg-sky-50 rounded-xl p-1 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-sky-600 hover:text-sky-700 hover:bg-white/60'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
              <span
                className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-sky-100 text-sky-700'
                    : 'bg-sky-200/50 text-sky-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2.5 border border-sky-200 rounded-xl text-sky-600 hover:bg-sky-50 transition-all duration-200 shadow-sm"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {showFilters ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </button>
      </div>
    </div>

    {/* Search and Filters */}
    <div
      className={`mt-4 space-y-4 transition-all duration-300 ${
        showFilters ? 'block' : 'hidden'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search doctors, specialization, email..."
            className="pl-10 pr-4 py-3 w-full border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-transparent bg-sky-50 placeholder-sky-400 text-sky-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as 'date' | 'name' | 'status')
          }
          className="px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-transparent bg-sky-50 text-sky-700"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="px-4 py-3 border border-sky-200 rounded-xl hover:bg-sky-50 transition-all duration-200 flex items-center justify-center text-sky-600 font-medium shadow-sm"
        >
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          {sortOrder === 'asc' ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </button>
      </div>
    </div>
  </div>
</div>


          {/* Applications Grid */}
          <div className="p-6">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-sky-200 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No applications found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredApplications.map((application) => (
                  <div 
                    key={application.id} 
                    className="border border-sky-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-white group hover:border-sky-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-2 rounded-xl text-white">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                            {application.doctorName}
                          </h4>
                          <p className="text-sm text-sky-600 font-medium">{application.specialization}</p>
                        </div>
                      </div>
                      <div className="ml-4">
                        {getStatusBadge(application.status)}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-sky-400" />
                        <span className="truncate">{application.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-sky-400" />
                        <span>Applied: {new Date(application.dateOfApplication).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Shield className="h-4 w-4 mr-2 text-sky-400" />
                        <span>{application.experience} experience</span>
                      </div>
                      {application.mobileNumber && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-sky-400" />
                          <span>{application.countryCode} {application.mobileNumber}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="flex-1 bg-gradient-to-r from-sky-500 to-sky-600 text-white py-2.5 px-3 rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all duration-200 flex items-center justify-center text-sm font-medium shadow-sm hover:shadow-md"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                      {application.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'approved')}
                          disabled={updatingStatus}
                          className="px-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Update Status Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Edit className="h-5 w-5 mr-2 text-sky-600" />
              Update Application Status
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Application
                </label>
                <select
                  value={selectedAppIdForStatusChange}
                  onChange={(e) => setSelectedAppIdForStatusChange(e.target.value)}
                  className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-transparent bg-sky-50 text-sky-700"
                >
                  <option value="">Choose an application...</option>
                  {applications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.doctorName} - {app.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Status
                </label>
                <select
                  value={newStatusToApply}
                  onChange={(e) => setNewStatusToApply(e.target.value as 'new' | 'in-process' | 'pending')}
                  className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-transparent bg-sky-50 text-sky-700"
                >
                  <option value="new">New</option>
                  <option value="in-process">In Process</option>
                  <option value="pending">Pending Review</option>
                </select>
              </div>

              <button
                onClick={handleFormStatusUpdate}
                disabled={!selectedAppIdForStatusChange || updatingStatus}
                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white py-3 px-4 rounded-xl hover:from-sky-600 hover:to-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center font-medium shadow-sm hover:shadow-md"
              >
                {updatingStatus ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Updating Status...
                  </>
                ) : (
                  'Update Application Status'
                )}
              </button>
            </div>
          </div>

          {/* Pending Applications Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
              Pending Review
              <span className="ml-2 bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {pendingApplications.length}
              </span>
            </h3>

            {pendingApplications.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">All applications have been reviewed!</p>
                <p className="text-gray-400 text-sm mt-2">No pending applications at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApplications.slice(0, 3).map((application) => (
                  <div key={application.id} className="border border-orange-200 rounded-xl p-4 bg-orange-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{application.doctorName}</h4>
                        <p className="text-sm text-orange-600">{application.specialization}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(application.dateOfApplication).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusUpdate(application.id, 'approved')}
                        disabled={updatingStatus}
                        className="flex-1 bg-emerald-500 text-white py-2 px-3 rounded-lg hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-sm font-medium shadow-sm"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(application.id, 'rejected')}
                        disabled={updatingStatus}
                        className="flex-1 bg-rose-500 text-white py-2 px-3 rounded-lg hover:bg-rose-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-sm font-medium shadow-sm"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
                {pendingApplications.length > 3 && (
                  <button className="w-full text-center text-sky-600 hover:text-sky-700 font-medium text-sm py-2">
                    View all {pendingApplications.length} pending applications
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Application Details</h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <User className="h-4 w-4 mr-2 text-sky-600" />
                      Personal Information
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <p className="text-gray-900 font-semibold">{selectedApplication.doctorName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{selectedApplication.email}</p>
                      </div>
                      {selectedApplication.mobileNumber && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Phone</label>
                          <p className="text-gray-900">{selectedApplication.countryCode} {selectedApplication.mobileNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-sky-600" />
                      Professional Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Specialization</label>
                        <p className="text-gray-900">{selectedApplication.specialization}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Experience</label>
                        <p className="text-gray-900">{selectedApplication.experience}</p>
                      </div>
                      {selectedApplication.licenseNumber && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">License Number</label>
                          <p className="text-gray-900 font-mono">{selectedApplication.licenseNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedApplication.clinicAddress && (
                    <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-sky-600" />
                        Clinic Address
                      </h4>
                      <p className="text-gray-900">{selectedApplication.clinicAddress}</p>
                    </div>
                  )}

                  <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-sky-600" />
                      Application Info
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Application ID</label>
                        <p className="text-gray-900 font-mono">{selectedApplication.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Date Applied</label>
                        <p className="text-gray-900">{new Date(selectedApplication.dateOfApplication).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Current Status</label>
                        <div className="mt-1">{getStatusBadge(selectedApplication.status)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-sky-500 text-white py-2 px-3 rounded-xl hover:bg-sky-600 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md flex items-center justify-center">
                        <Send className="h-4 w-4 mr-1" />
                        Send Email
                      </button>
                      <button className="bg-emerald-500 text-white py-2 px-3 rounded-xl hover:bg-emerald-600 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md flex items-center justify-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorApplications;