import { Doctor, Application, ManagedDoctor } from '../types/doctor';

// Resolve API base URL in this order:
// 1. Vite env VITE_API_BASE_URL
// 2. Vite env VITE_API_URL (older name compatibility)
// 3. Same host as the frontend on port 3002 (useful when frontend is served from localhost/another host)
// 4. Fallback to http://localhost:3002
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' ? `http://${window.location.hostname}:3002` : 'http://localhost:3002');

const API_ENDPOINT = `${API_BASE_URL.replace(/\/$/, '')}/api`;

export const doctorService = {
  async fetchAllDoctors(): Promise<Application[]> {
    try {
      const response = await fetch(`${API_ENDPOINT}/doctors`);

      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }

      const result = await response.json();

      if (result.success && result.data) {
        return result.data.map((doctor: Doctor) => this.mapDoctorToApplication(doctor));
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  async fetchDoctorById(id: string): Promise<Application> {
    try {
      const response = await fetch(`${API_ENDPOINT}/doctors/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch doctor');
      }

      const result = await response.json();

      if (result.success && result.data) {
        return this.mapDoctorToApplication(result.data);
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error fetching doctor:', error);
      throw error;
    }
  },

  async fetchDoctorsByStatus(status: string): Promise<Application[]> {
    try {
      const response = await fetch(`${API_ENDPOINT}/doctors/status/${status}`);

      if (!response.ok) {
        throw new Error('Failed to fetch doctors by status');
      }

      const result = await response.json();

      if (result.success && result.data) {
        return result.data.map((doctor: Doctor) => this.mapDoctorToApplication(doctor));
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error fetching doctors by status:', error);
      throw error;
    }
  },

  async updateDoctorStatus(
    id: string,
    status: 'new' | 'in-process' | 'pending' | 'approved' | 'rejected'
  ): Promise<Application> {
    try {
      const response = await fetch(`${API_ENDPOINT}/doctors/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update doctor status');
      }

      const result = await response.json();

      if (result.success && result.data) {
        return this.mapDoctorToApplication(result.data);
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error updating doctor status:', error);
      throw error;
    }
  },

  mapDoctorToApplication(doctor: Doctor): Application {
    return {
      id: doctor.id.toString(),
      doctorName: doctor.full_name,
      specialization: doctor.specialization,
      dateOfApplication: doctor.created_at,
      // Application.status doesn't include 'resigned' so map it to 'rejected' for display purposes
      status: (doctor.status === 'resigned' ? 'rejected' : doctor.status) || 'new',
      email: doctor.email,
      experience: `${doctor.years_of_experience} years`,
      countryCode: doctor.country_code,
      mobileNumber: doctor.mobile_number,
      licenseNumber: doctor.license_number,
      clinicAddress: doctor.clinic_address,
    };
  },

  async fetchApprovedDoctors(): Promise<ManagedDoctor[]> {
    try {
      const response = await fetch(`${API_ENDPOINT}/doctors/approved/list`);

      if (!response.ok) {
        throw new Error('Failed to fetch approved doctors');
      }

      const result = await response.json();

      if (result.success && result.data) {
        return result.data.map((doctor: Doctor) => this.mapDoctorToManaged(doctor));
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error fetching approved doctors:', error);
      throw error;
    }
  },

  async resignDoctor(id: string): Promise<ManagedDoctor> {
    try {
      const response = await fetch(`${API_ENDPOINT}/doctors/${id}/resign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to resign doctor');
      }

      const result = await response.json();

      if (result.success && result.data) {
        return this.mapDoctorToManaged(result.data);
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error resigning doctor:', error);
      throw error;
    }
  },

  mapDoctorToManaged(doctor: Doctor): ManagedDoctor {
    return {
      id: doctor.id.toString(),
      name: doctor.full_name,
      specialization: doctor.specialization,
      // ManagedDoctor.status supports 'active' | 'resigned'
      status: doctor.status === 'resigned' ? 'resigned' : 'active',
      dateJoined: doctor.updated_at || doctor.created_at,
      email: doctor.email,
      phone: `${doctor.country_code} ${doctor.mobile_number}`,
      licenseNumber: doctor.license_number,
      experience: `${doctor.years_of_experience} years`,
      clinicAddress: doctor.clinic_address,
    };
  },
};
