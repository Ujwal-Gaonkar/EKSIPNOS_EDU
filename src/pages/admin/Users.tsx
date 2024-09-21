import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { fetchUsers, updateUserRole, deleteUser } from '@/services/admin';
import Loader from '@/components/common/Loader';
import { toast } from 'react-hot-toast';
import { FaTrash, FaEnvelope } from 'react-icons/fa';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface FetchUsersResponse {
  data: {
    users: User[];
  };
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers()
      .then((response: FetchUsersResponse) => {
        setUsers(response.data.users);
        setLoading(false);
      })
     .catch((err: unknown) => {
  console.error('Error fetching users:', err);
  toast.error('Failed to fetch users.');
  setLoading(false);
});
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));
        toast.success('User deleted successfully!');
      } catch {
        toast.error('Failed to delete user.');
      }
    }
  };

  const handleRoleUpdate = async (id: string, role: string) => {
    try {
      await updateUserRole(id, { role });
      setUsers(users.map((user) => (user._id === id ? { ...user, role } : user)));
      toast.success('User role updated successfully!');
    } catch {
      toast.error('Failed to update user role.');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex">
      <Sidebar activePage="users" />
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6 text-white">Users Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-left text-white">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td className="p-3">{user._id.substring(0, 10)}...</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                      className="border p-2 rounded bg-gray-800 text-white"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td className="p-3 flex space-x-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                    <a
                      href={`mailto:${user.email}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEnvelope />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
