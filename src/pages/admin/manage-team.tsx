import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { fetchUsers, deleteUser } from '@/services/admin';
import { toast } from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa'; // Icon for delete action
import Loader from '@/components/common/Loader'; // Assuming you have a loader component

// Define the User interface, including the role
interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;  // Add role to the Admin type definition
}

const ManageTeam: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers()
      .then((response: { data: { users: Admin[] } }) => {
        const adminsOnly = response.data.users.filter((user: Admin) => user.role === 'admin');
        setAdmins(adminsOnly);
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this admin?')) {
      try {
        await deleteUser(id);
        setAdmins(admins.filter((admin) => admin._id !== id));
        toast.success('Admin deleted successfully!');
      } catch {
        toast.error('Failed to delete admin.');
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex">
      <Sidebar activePage="manageTeam" />
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6 text-white">Manage Team</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-left text-white">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr
                  key={admin._id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition duration-300"
                >
                  <td className="p-3">{admin.name}</td>
                  <td className="p-3">{admin.email}</td>
                  <td className="p-3 flex space-x-4">
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      <FaTrash />
                    </button>
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

export default ManageTeam;
