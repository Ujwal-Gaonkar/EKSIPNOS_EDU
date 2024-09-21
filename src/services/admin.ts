// src/services/admin.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''; // Use the API URL from .env

// Fetch all users, with token included in the headers
export const fetchUsers = () => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  return axios.get(`${API_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`  // Include token in Authorization header
    }
  });
};

// Update the role of a user by ID, with token included
export const updateUserRole = (id: string, data: { role: string }) => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  return axios.put(`${API_URL}/api/admin/users/${id}/role`, data, {
    headers: {
      Authorization: `Bearer ${token}`  // Include token in Authorization header
    }
  });
};

// Delete a user by ID, with token included
export const deleteUser = (id: string) => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  return axios.delete(`${API_URL}/api/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`  // Include token in Authorization header
    }
  });
};

// Fetch all enquiries, with token included
export const fetchEnquiries = () => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  return axios.get(`${API_URL}/api/enquiries`, {
    headers: {
      Authorization: `Bearer ${token}`  // Include token in Authorization header
    }
  });
};

// Delete an enquiry by ID, with token included
export const deleteEnquiry = (id: string) => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  return axios.delete(`${API_URL}/api/enquiries/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`  // Include token in Authorization header
    }
  });
};

// Fetch user count (Admin dashboard)
export const fetchUserCount = () => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  return axios.get(`${API_URL}/api/admin/user-count`, {
    headers: {
      Authorization: `Bearer ${token}`  // Include token in Authorization header
    }
  });
};

// Fetch recent enquiries for admin dashboard
export const fetchRecentEnquiries = () => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  return axios.get(`${API_URL}/api/admin/recent-enquiries`, {
    headers: {
      Authorization: `Bearer ${token}`  // Include token in Authorization header
    }
  });
};

// Fetch user analytics for admin dashboard
export const fetchUserAnalytics = () => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  return axios.get(`${API_URL}/api/admin/user-analytics`, {
    headers: {
      Authorization: `Bearer ${token}`  // Include token in Authorization header
    }
  });
};
