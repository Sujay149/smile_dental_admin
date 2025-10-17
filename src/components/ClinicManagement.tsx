import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Eye,
  Building2,
  AlertCircle,
  Loader2,
  Filter,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react";
import { Clinic } from "../types/clinic";
import { clinicService } from "../services/clinicService";
import {
  formatBusinessHours,
  formatBusinessHoursDetailed,
} from "../utils/formatBusinessHours";

const ClinicManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "name" | "phone">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const loadClinics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await clinicService.fetchAllClinics();
        setClinics(data);
      } catch (err) {
        setError("Failed to load clinics. Please ensure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };
    loadClinics();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const recentCount = clinics.filter((c) => {
    const created = new Date(c.created_at).getTime();
    return Date.now() - created <= 7 * 24 * 60 * 60 * 1000;
  }).length;

  const filteredClinics = clinics
    .filter((clinic) =>
      [clinic.name, clinic.address, clinic.phone]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aVal: any = "",
        bVal: any = "";
      switch (sortBy) {
        case "date":
          aVal = new Date(a.created_at).getTime();
          bVal = new Date(b.created_at).getTime();
          break;
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "phone":
          aVal = a.phone || "";
          bVal = b.phone || "";
          break;
      }
      return sortOrder === "asc" ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

  const totalClinics = clinics.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-25">
      <div className="space-y-8 p-4 md:p-6 max-w-7xl mx-auto">

        {/* ===== Stats Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Clinics",
              value: totalClinics,
              icon: FileText,
              color: "sky",
            },
            {
              label: "Recently Added",
              value: recentCount,
              icon: Building2,
              color: "amber",
            },
            {
              label: "With Website",
              value: clinics.filter((c) => !!c.website).length,
              icon: Building2,
              color: "sky",
            },
            {
              label: "No Phone",
              value: clinics.filter((c) => !c.phone).length,
              icon: AlertCircle,
              color: "amber",
            },
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-${card.color}-600 text-sm font-semibold uppercase tracking-wide`}
                    >
                      {card.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {card.value}
                    </p>
                  </div>
                  <div className={`bg-${card.color}-100 p-3 rounded-xl`}>
                    <Icon className={`h-6 w-6 text-${card.color}-600`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== Search + Filters Section ===== */}
        <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
          <div className="border-b border-sky-100 px-6 py-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name, address, or phone..."
                  className="pl-10 pr-4 py-3 w-full border border-sky-200 rounded-xl bg-sky-50 text-sky-700 placeholder-sky-400 focus:ring-2 focus:ring-sky-300 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 border border-sky-200 rounded-xl bg-sky-50 text-sky-700 focus:ring-2 focus:ring-sky-300 focus:border-transparent"
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="phone">Sort by Phone</option>
                </select>

                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="px-4 py-3 border border-sky-200 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 flex items-center gap-2 shadow-sm"
                >
                  {sortOrder === "asc" ? "Ascending" : "Descending"}
                  {sortOrder === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-3 border border-sky-200 rounded-xl text-sky-700 bg-sky-50 hover:bg-sky-100 transition-all duration-200 shadow-sm"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 text-sky-600 text-sm bg-sky-50 border border-sky-100 rounded-xl p-3">
                Filter options coming soon...
              </div>
            )}
          </div>

          {/* ===== Table ===== */}
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
              <span className="ml-3 text-gray-600">Loading clinics...</span>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-600">
              <AlertCircle className="mx-auto h-10 w-10 mb-3" />
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                Retry
              </button>
            </div>
          ) : filteredClinics.length === 0 ? (
            <div className="p-12 text-center text-gray-600">
              <Building2 className="mx-auto h-10 w-10 mb-3 text-gray-400" />
              <p>No clinics found</p>
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full min-w-max">
                <thead className="bg-sky-50 text-sky-700 text-sm">
                  <tr>
                    {[
                      "ID",
                      "Doctor ID",
                      "Name",
                      "Address",
                      "Phone",
                      "Website",
                      "Business Hours",
                      "Created At",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left font-semibold tracking-wide"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredClinics.map((clinic) => (
                    <tr key={clinic.id} className="hover:bg-sky-50">
                      <td className="px-6 py-3">{clinic.id}</td>
                      <td className="px-6 py-3">{clinic.doctor_id}</td>
                      <td className="px-6 py-3 font-medium text-gray-900">{clinic.name}</td>
                      <td className="px-6 py-3 text-gray-700 truncate max-w-xs">{clinic.address}</td>
                      <td className="px-6 py-3">{clinic.phone || "N/A"}</td>
                      <td className="px-6 py-3">
                        {clinic.website ? (
                          <a
                            href={clinic.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 hover:underline"
                          >
                            Visit
                          </a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-3">{formatBusinessHours(clinic.business_hours)}</td>
                      <td className="px-6 py-3">{formatDate(clinic.created_at)}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => setSelectedClinic(clinic)}
                          className="text-sky-600 hover:text-sky-800 flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ===== Modal ===== */}
        {selectedClinic && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
              <div className="p-6 border-b border-sky-100 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-sky-700">Clinic Details</h3>
                <button
                  onClick={() => setSelectedClinic(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                <div>
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="font-medium">{selectedClinic.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doctor ID</p>
                  <p className="font-medium">{selectedClinic.doctor_id}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Clinic Name</p>
                  <p className="font-semibold text-lg">{selectedClinic.name}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p>{selectedClinic.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{selectedClinic.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  {selectedClinic.website ? (
                    <a
                      href={selectedClinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:underline"
                    >
                      {selectedClinic.website}
                    </a>
                  ) : (
                    <p className="text-gray-400">Not provided</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Description</p>
                  <p>{selectedClinic.description || "No description available"}</p>
                </div>

               <div className="md:col-span-2">
  <p className="text-sm text-gray-500 mb-2">Business Hours</p>

  <div className="bg-sky-50 rounded-lg p-4 space-y-2 overflow-hidden">
    {formatBusinessHoursDetailed(selectedClinic.business_hours).map((item, i) => (
      <div
        key={i}
        className="flex flex-wrap justify-between text-sky-700 text-sm leading-relaxed break-words"
      >
        <span className="font-medium mr-2">{item.day}</span>
        <span className="flex-1 text-right break-words whitespace-normal">
          {item.schedule}
        </span>
      </div>
    ))}
  </div>
</div>

                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p>{formatDate(selectedClinic.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Updated At</p>
                  <p>{formatDate(selectedClinic.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicManagement;
