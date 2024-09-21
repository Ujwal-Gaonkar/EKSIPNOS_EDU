import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Loader from '@/components/common/Loader'; // Assuming there's a loader component
import { FaTrash, FaEnvelope, FaDownload } from 'react-icons/fa'; // Icons for delete, email, and download
import { fetchEnquiries, deleteEnquiry } from '@/services/admin';
import { toast } from 'react-hot-toast'; // Notification library for feedback

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

const Enquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchEnquiries()
      .then((response) => {
        setEnquiries(response.data.enquiries);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching enquiries:', err);
        toast.error('Failed to fetch enquiries.');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await deleteEnquiry(id);
        setEnquiries(enquiries.filter((enquiry) => enquiry._id !== id));
        toast.success('Enquiry deleted successfully!');
      } catch  {
        toast.error('Failed to delete enquiry.');
      }
    }
  };

  // Function to convert enquiries to CSV and trigger download
  const handleExportCSV = () => {
    const csvData = enquiries.map((enquiry, index) => ({
      Number: index + 1,
      Name: enquiry.name,
      Email: enquiry.email,
      Phone: enquiry.phone,
      Course: enquiry.course,
      Message: enquiry.message,
    }));

    // Convert to CSV string
    const csvString = [
      ['Number', 'Name', 'Email', 'Phone', 'Course', 'Message'],
      ...csvData.map((row) => Object.values(row)),
    ]
      .map((row) => row.join(','))
      .join('\n');

    // Create a Blob from the CSV string and trigger the download
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enquiries.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) return <Loader />;

  return (
    <div className="flex">
      <Sidebar activePage="enquiries" />
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Enquiries Management</h1>
          <button
            onClick={handleExportCSV}
            className="bg-blue-600 text-white p-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition duration-300"
          >
            <FaDownload />
            <span>Export as CSV</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-left text-white">
                <th className="p-3">#</th> {/* Column for count */}
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Course</th>
                <th className="p-3">Message</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry, index) => (
                <tr key={enquiry._id} className="border-b border-gray-700 hover:bg-gray-800 transition duration-300">
                  <td className="p-3">{index + 1}</td> {/* Display the count */}
                  <td className="p-3">{enquiry.name}</td>
                  <td className="p-3">{enquiry.email}</td>
                  <td className="p-3">{enquiry.phone}</td>
                  <td className="p-3">{enquiry.course}</td>
                  <td className="p-3">{enquiry.message}</td>
                  <td className="p-3 flex space-x-4">
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="text-blue-500 hover:text-blue-700 transition duration-300"
                    >
                      <FaEnvelope />
                    </a>
                    <button
                      onClick={() => handleDelete(enquiry._id)}
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

export default Enquiries;
