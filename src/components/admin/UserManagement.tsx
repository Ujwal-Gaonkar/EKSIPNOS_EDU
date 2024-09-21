import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { fetchUsers, updateUserRole, deleteUser } from '@/services/admin'; // Import your API service functions
import Loader from '../common/Loader'; // Assuming there's a Loader component

// Define the interface for User
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Specify the User type for users state
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [role, setRole] = useState('');
  const router = useRouter();

  // Fetch users on component mount
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data.users); // Assign the fetched users to the state
        setLoading(false);
      } catch {
        toast.error('Error fetching users');
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  // Handle role update
  const handleRoleUpdate = async (id: string) => {
    try {
      await updateUserRole(id, { role });
      toast.success('User role updated successfully');
      router.reload(); // Reload the page to fetch updated users
    } catch  {
      toast.error('Error updating user role');
    }
  };

  // Handle user deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success('User deleted successfully');
      setUsers(users.filter(user => user._id !== id)); // Remove the deleted user from state
    } catch  {
      toast.error('Error deleting user');
    }
  };

  if (loading) {
    return <Loader />; // Show loader while data is being fetched
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-t">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                <select
                  value={selectedUser === user._id ? role : user.role} // Show updated role only for selected user
                  onChange={e => {
                    setRole(e.target.value);
                    setSelectedUser(user._id); // Set the selected user to track changes
                  }}
                  className="bg-gray-100 p-2 rounded-lg"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="px-4 py-2 flex gap-4">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleRoleUpdate(user._id)}
                  disabled={selectedUser !== user._id} // Disable button if user is not selected
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(user._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
