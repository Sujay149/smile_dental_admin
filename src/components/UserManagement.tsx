import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  MapPin, 
  Clock, 
  Users, 
  UserCheck, 
  Calendar,
  Download,
  Filter,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Eye,
  MoreVertical,
  Loader,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { User } from '../types/user';
import { fetchUsers } from '../services/userService';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 'USR-001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      mobile: '+1 (555) 123-4567',
      location: 'New York, NY',
      last_login: '2024-01-15T14:30:00Z',
      created_at: '2023-05-10T09:15:00Z',
      updated_at: '2024-01-15T14:30:00Z'
    },
    {
      id: 'USR-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      mobile: '+1 (555) 123-4568',
      location: 'Los Angeles, CA',
      last_login: '2024-01-14T16:45:00Z',
      created_at: '2023-08-22T11:20:00Z',
      updated_at: '2024-01-14T16:45:00Z'
    },
    {
      id: 'USR-003',
      name: 'Mike Chen',
      email: 'mike.chen@example.com',
      mobile: '+1 (555) 123-4569',
      location: 'Chicago, IL',
      last_login: '2024-01-10T10:15:00Z',
      created_at: '2024-01-05T08:30:00Z',
      updated_at: '2024-01-10T10:15:00Z'
    },
    {
      id: 'USR-004',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      mobile: '+1 (555) 123-4570',
      location: 'Houston, TX',
      last_login: '2024-01-08T13:20:00Z',
      created_at: '2023-12-15T14:45:00Z',
      updated_at: '2024-01-08T13:20:00Z'
    },
    {
      id: 'USR-005',
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      mobile: '+1 (555) 123-4571',
      location: 'Miami, FL',
      last_login: '2024-01-12T11:30:00Z',
      created_at: '2023-11-20T10:00:00Z',
      updated_at: '2024-01-12T11:30:00Z'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Use mock data for now
    } catch (err) {
      setError('Failed to load users. Please try again later.');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.mobile.toLowerCase().includes(searchLower) ||
      user.location.toLowerCase().includes(searchLower)
    );
  });

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRecentLoginsCount = () => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return users.filter(user => {
      if (!user.last_login) return false;
      return new Date(user.last_login) >= sevenDaysAgo;
    }).length;
  };

  const getNewUsersThisMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return users.filter(user => {
      return new Date(user.created_at) >= startOfMonth;
    }).length;
  };

  const getActiveUsersPercentage = () => {
    const recentLogins = getRecentLoginsCount();
    return Math.round((recentLogins / users.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-25">
      <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sky-600 text-sm font-semibold uppercase tracking-wide">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
              </div>
              <div className="bg-sky-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-sky-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Active Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{getRecentLoginsCount()}</p>
                <p className="text-xs text-emerald-600 mt-1">{getActiveUsersPercentage()}% of total</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-xl">
                <UserCheck className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-semibold uppercase tracking-wide">New This Month</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{getNewUsersThisMonth()}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Avg. Activity</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">78%</p>
                <p className="text-xs text-gray-600 mt-1">Last 30 days</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-gray-600" />
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
                <h3 className="text-xl font-semibold text-gray-900">User Directory</h3>
                
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
                      placeholder="Search users by name, email, mobile, or location..."
                      className="pl-10 pr-4 py-3 w-full border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-transparent bg-sky-50 placeholder-sky-400 text-sky-700"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <select className="px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-transparent bg-sky-50 text-sky-700">
                    <option value="">All Users</option>
                    <option value="active">Active (Last 7 days)</option>
                    <option value="new">New This Month</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sky-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    Member Since
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-sky-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-sky-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-sky-25 transition-colors duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-2 rounded-xl text-white">
                          <Users className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                            {user.name}
                          </div>
                          <div className="text-sm text-sky-600 font-medium">{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-sky-600 flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {user.mobile}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 mr-2 text-sky-400" />
                        {user.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Clock className="h-4 w-4 mr-2 text-sky-400" />
                        {formatDateTime(user.last_login)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-sky-600">
                        {Math.floor((new Date().getTime() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24))} days ago
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="bg-sky-500 text-white p-2 rounded-xl hover:bg-sky-600 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="bg-emerald-500 text-white p-2 rounded-xl hover:bg-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md">
                          <Mail className="h-4 w-4" />
                        </button>
                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && !loading && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-sky-200 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No users found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-8 w-8 text-sky-600 animate-spin mr-3" />
              <p className="text-gray-600">Loading users...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="m-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                <div>
                  <p className="text-red-800 font-medium">Error Loading Users</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
              <button
                onClick={loadUsers}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center"
              >
                <Loader className="h-4 w-4 mr-2" />
                Retry
              </button>
            </div>
          )}

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-sky-100 bg-sky-25">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-sky-700 mb-4 sm:mb-0">
                Showing <span className="font-semibold">{filteredUsers.length}</span> of{' '}
                <span className="font-semibold">{users.length}</span> users
              </p>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-sky-200 rounded-xl text-sm font-medium text-sky-700 hover:bg-white transition-all duration-200">
                  Previous
                </button>
                <button className="px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition-all duration-200 shadow-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-sky-600" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {users.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border border-sky-100 rounded-xl bg-sky-25">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-2 rounded-lg text-white">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-sky-600">Last login: {formatDateTime(user.last_login)}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg border border-sky-100">
                    Active
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Users */}
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
              New This Month
              <span className="ml-2 bg-emerald-100 text-emerald-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {getNewUsersThisMonth()}
              </span>
            </h3>
            {getNewUsersThisMonth() === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No new users this month</p>
              </div>
            ) : (
              <div className="space-y-3">
                {users.filter(user => {
                  const now = new Date();
                  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                  return new Date(user.created_at) >= startOfMonth;
                }).slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border border-emerald-100 rounded-xl bg-emerald-25">
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-emerald-600">Joined {new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.floor((new Date().getTime() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">User Profile</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-4 rounded-2xl text-white">
                    <Users className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                    <p className="text-sky-600 font-medium">{selectedUser.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{selectedUser.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-gray-900">{selectedUser.mobile}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Location</label>
                        <p className="text-gray-900">{selectedUser.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Account Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Member Since</label>
                        <p className="text-gray-900">{formatDateTime(selectedUser.created_at)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Last Login</label>
                        <p className="text-gray-900">{formatDateTime(selectedUser.last_login)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Last Updated</label>
                        <p className="text-gray-900">{formatDateTime(selectedUser.updated_at)}</p>
                      </div>
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
                      <Eye className="h-4 w-4 mr-1" />
                      View Activity
                    </button>
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

export default UserManagement;