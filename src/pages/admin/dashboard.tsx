import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { fetchUserCount, fetchRecentEnquiries } from '@/services/admin'; // Services to fetch data
import { FaUser, FaEnvelope, FaChartLine } from 'react-icons/fa'; // Icons for analytics
import Link from 'next/link';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  course: string;
  message: string;
}

const Dashboard: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    // Fetch user count
    fetchUserCount()
      .then((response) => {
        setUserCount(response.data.count);
      })
      .catch((err) => {
        console.error('Error fetching user count:', err);
      });

    // Fetch recent enquiries (limit to 3)
    fetchRecentEnquiries()
      .then((response) => {
        setRecentEnquiries(response.data.enquiries.slice(0, 3)); // Limit to 3 enquiries
      })
      .catch((err) => {
        console.error('Error fetching recent enquiries:', err);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar activePage="dashboard" />
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6 text-black">Admin Dashboard</h1>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* User Count Card */}
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaUser className="text-4xl" />
            <div>
              <h2 className="text-2xl font-bold">{userCount}</h2>
              <p>Total Users</p>
            </div>
          </div>

          {/* Recent Enquiries Card */}
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <FaEnvelope className="text-4xl" />
            <div>
              <h2 className="text-2xl font-bold">{recentEnquiries.length}</h2>
              <p>Recent Enquiries</p>
            </div>
          </div>

          {/* Link to User Analytics */}
          <Link href="/admin/user-analytics">
            <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer hover:bg-purple-700 transition duration-300">
              <FaChartLine className="text-4xl" />
              <div>
                <h2 className="text-2xl font-bold">Analytics</h2>
                <p>View User Analytics</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Enquiries Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-black">Recent Enquiries</h2>
          <table className="min-w-full bg-gray-100 text-black shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-left text-white">
                <th className="p-3">#</th> {/* New count column */}
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Course</th>
                <th className="p-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map((enquiry, index) => (
                <tr key={enquiry._id} className="border-b border-gray-300 hover:bg-gray-200 transition duration-300">
                  <td className="p-3">{index + 1}</td> {/* Display the enquiry index */}
                  <td className="p-3">{enquiry.name}</td>
                  <td className="p-3">{enquiry.email}</td>
                  <td className="p-3">{enquiry.course}</td>
                  <td className="p-3">{enquiry.message}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* View All Enquiries Button */}
          <div className="mt-4">
            <Link href="/admin/Enquiries">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                View All Enquiries
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
