import { User } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://65.2.172.252:3002';
const API_ENDPOINT = `${API_BASE_URL}/api`;

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/users`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to fetch users');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || 'Failed to fetch user');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
