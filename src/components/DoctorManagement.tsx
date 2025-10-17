import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Eye, 
  UserX, 
  UserCheck, 
  Loader, 
  AlertCircle, 
  XCircle,
  Filter,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Shield,
  Download,
  Edit,
  MoreVertical
} from 'lucide-react';
import { ManagedDoctor } from '../types/doctor';
import { doctorService } from '../services/doctorService';

const DoctorManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<ManagedDoctor | null>(null);
  const [doctors, setDoctors] = useState<ManagedDoctor[]>([
    {
      id: 'DENT-001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@dentalclinic.com',
      phone: '+1 (555) 123-4567',
      licenseNumber: 'DENT12345',
      specialization: 'Orthodontics',
      experience: '8 years',
      clinicAddress: '123 Dental Street, New York, NY',
      dateJoined: '2023-05-15',
      status: 'active'
    },
    {
      id: 'DENT-002',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@dentalcare.com',
      phone: '+1 (555) 123-4568',
      licenseNumber: 'DENT12346',
      specialization: 'Periodontics',
      experience: '12 years',
      clinicAddress: '456 Smile Avenue, Los Angeles, CA',
      dateJoined: '2022-11-20',
      status: 'active'
    },
    {
      id: 'DENT-003',
      name: 'Dr. Emily Davis',
      email: 'emily.davis@smileclinic.com',
      phone: '+1 (555) 123-4569',
      licenseNumber: 'DENT12347',
      specialization: 'Pediatric Dentistry',
      experience: '6 years',
      clinicAddress: '789 Tooth Lane, Chicago, IL',
      dateJoined: '2024-01-10',
      status: 'active'
    },
    {
      id: 'DENT-004',
      name: 'Dr. Robert Wilson',
      email: 'robert.wilson@dentalpro.com',
      phone: '+1 (555) 123-4570',
      licenseNumber: 'DENT12348',
      specialization: 'Oral Surgery',
      experience: '15 years',
      clinicAddress: '321 Gum Road, Houston, TX',
      dateJoined: '2021-08-30',
      status: 'resigned'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resigning, setResigning] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadApprovedDoctors();
  }, []);

  const loadApprovedDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Use mock data for now
    } catch (err) {
      setError('Failed to load approved doctors. Please ensure the backend server is running.');
      console.error('Error loading approved doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <UserCheck className="w-3 h-3 mr-1.5" />
        ACTIVE
      </span>
    ) : (
      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
        <UserX className="w-3 h-3 mr-1.5" />
        RESIGNED
      </span>
    );
  };

  const handleResignDoctor = async (doctorId: string) => {
    try {
      setResigning(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setDoctors(prevDoctors =>
        prevDoctors.map(doc =>
          doc.id === doctorId ? { ...doc, status: 'resigned' as const } : doc
        )
      );
    } catch (err) {
      setError('Failed to update doctor status. Please try again.');
      console.error('Error resigning doctor:', err);
    } finally {
      setResigning(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doctor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeDoctors = doctors.filter(d => d.status === 'active').length;
  const resignedDoctors = doctors.filter(d => d.status === 'resigned').length;
  const totalDoctors = doctors.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-25">
      <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
    

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sky-600 text-sm font-semibold uppercase tracking-wide">Total Doctors</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalDoctors}</p>
              </div>
              <div className="bg-sky-100 p-3 rounded-xl">
                <User className="h-6 w-6 text-sky-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Active Doctors</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeDoctors}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-xl">
                <UserCheck className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-600 text-sm font-semibold uppercase tracking-wide">Resigned Doctors</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{resignedDoctors}</p>
              </div>
              <div className="bg-rose-100 p-3 rounded-xl">
                <UserX className="h-6 w-6 text-rose-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
          {/* Header with Search and Filters */}
          <div className="border-b border-sky-100">
            <div className="px-6 py-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <h3 className="text-xl font-semibold text-gray-900">Doctor Directory</h3>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center px-4 py-2.5 border border-sky-200 rounded-xl text-sky-600 hover:bg-sky-50 transition-all duration-200 shadow-sm"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {showFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                  </button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className={`mt-4 space-y-4 transition-all duration-300 ${showFilters ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-transparent bg-sky-50 text-sky-700"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="resigned">Resigned</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Doctors Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sky-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    Date Joined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-sky-100">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-sky-25 transition-colors duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-2 rounded-xl text-white">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                            {doctor.name}
                          </div>
                          <div className="text-sm text-sky-600 font-medium">{doctor.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{doctor.specialization}</div>
                      {doctor.experience && (
                        <div className="text-sm text-sky-600">{doctor.experience}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.email}</div>
                      <div className="text-sm text-sky-600">{doctor.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(doctor.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {new Date(doctor.dateJoined).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedDoctor(doctor)}
                          className="bg-sky-500 text-white p-2 rounded-xl hover:bg-sky-600 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {doctor.status === 'active' && (
                          <button
                            onClick={() => handleResignDoctor(doctor.id)}
                            disabled={resigning}
                            className="bg-rose-500 text-white p-2 rounded-xl hover:bg-rose-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            <UserX className="h-4 w-4" />
                          </button>
                        )}
                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <User className="h-16 w-16 text-sky-200 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No doctors found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Doctors Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-emerald-600" />
              Active Doctors Summary
            </h3>
            <div className="space-y-3">
              {doctors.filter(d => d.status === 'active').slice(0, 3).map((doctor) => (
                <div key={doctor.id} className="flex items-center justify-between p-3 border border-sky-100 rounded-xl bg-sky-25">
                  <div>
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-sky-600">{doctor.specialization}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    Joined {new Date(doctor.dateJoined).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {activeDoctors > 3 && (
                <button className="w-full text-center text-sky-600 hover:text-sky-700 font-medium text-sm py-2">
                  View all {activeDoctors} active doctors
                </button>
              )}
            </div>
          </div>

          {/* Recent Resignations */}
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <UserX className="h-5 w-5 mr-2 text-rose-600" />
              Recent Resignations
              <span className="ml-2 bg-rose-100 text-rose-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {resignedDoctors}
              </span>
            </h3>
            {resignedDoctors === 0 ? (
              <div className="text-center py-8">
                <UserCheck className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No recent resignations</p>
                <p className="text-gray-400 text-sm mt-2">All doctors are currently active</p>
              </div>
            ) : (
              <div className="space-y-3">
                {doctors.filter(d => d.status === 'resigned').slice(0, 3).map((doctor) => (
                  <div key={doctor.id} className="flex items-center justify-between p-3 border border-rose-100 rounded-xl bg-rose-25">
                    <div>
                      <p className="font-medium text-gray-900">{doctor.name}</p>
                      <p className="text-sm text-rose-600">{doctor.specialization}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(doctor.dateJoined).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Doctor Profile</h3>
                <button
                  onClick={() => setSelectedDoctor(null)}
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
                        <p className="text-gray-900 font-semibold">{selectedDoctor.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{selectedDoctor.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-gray-900">{selectedDoctor.phone}</p>
                      </div>
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
                        <p className="text-gray-900">{selectedDoctor.specialization}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Experience</label>
                        <p className="text-gray-900">{selectedDoctor.experience}</p>
                      </div>
                      {selectedDoctor.licenseNumber && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">License Number</label>
                          <p className="text-gray-900 font-mono">{selectedDoctor.licenseNumber}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedDoctor.clinicAddress && (
                    <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-sky-600" />
                        Clinic Address
                      </h4>
                      <p className="text-gray-900">{selectedDoctor.clinicAddress}</p>
                    </div>
                  )}

                  <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-sky-600" />
                      Employment Info
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Doctor ID</label>
                        <p className="text-gray-900 font-mono">{selectedDoctor.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Date Joined</label>
                        <p className="text-gray-900">{new Date(selectedDoctor.dateJoined).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Current Status</label>
                        <div className="mt-1">{getStatusBadge(selectedDoctor.status)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-sky-500 text-white py-2 px-3 rounded-xl hover:bg-sky-600 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md flex items-center justify-center">
                        <Mail className="h-4 w-4 mr-1" />
                        Send Email
                      </button>
                      <button className="bg-emerald-500 text-white py-2 px-3 rounded-xl hover:bg-emerald-600 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md flex items-center justify-center">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Profile
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

export default DoctorManagement;