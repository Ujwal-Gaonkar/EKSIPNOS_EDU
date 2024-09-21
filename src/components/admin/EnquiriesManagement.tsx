import React, { useEffect, useState } from 'react';
import { FaTrash, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { fetchEnquiries, deleteEnquiry } from '@/services/admin'; // Import your API service functions
import Loader from '../common/Loader'; // Assuming there's a Loader component

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

const EnquiriesManagement: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch enquiries on component mount
  useEffect(() => {
    const getEnquiries = async () => {
      try {
        const response = await fetchEnquiries();
        setEnquiries(response.data.enquiries);
        setLoading(false);
      } catch  {
        toast.error('Error fetching enquiries');
        setLoading(false);
      }
    };
    getEnquiries();
  }, []);

  // Handle enquiry deletion with confirmation
  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this enquiry?');
    if (!confirmed) return;

    try {
      await deleteEnquiry(id);
      toast.success('Enquiry deleted successfully');
      setEnquiries(enquiries.filter(enquiry => enquiry._id !== id)); // Remove the deleted enquiry from state
    } catch {
      toast.error('Error deleting enquiry');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader /> {/* Display loader while data is being fetched */}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Enquiries Management</h1>

      {enquiries.length === 0 ? (
        <p className="text-center text-gray-500">No enquiries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm uppercase tracking-wider">
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Phone</th>
                <th className="px-4 py-3 border">Course</th>
                <th className="px-4 py-3 border">Message</th>
                <th className="px-4 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="border-t text-sm hover:bg-gray-50">
                  <td className="px-4 py-3 border">{enquiry.name}</td>
                  <td className="px-4 py-3 border">{enquiry.email}</td>
                  <td className="px-4 py-3 border">{enquiry.phone}</td>
                  <td className="px-4 py-3 border">{enquiry.course}</td>
                  <td className="px-4 py-3 border">{enquiry.message}</td>
                  <td className="px-4 py-3 border flex gap-3">
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                      aria-label="Send Email"
                    >
                      <FaEnvelope />
                    </a>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      onClick={() => handleDelete(enquiry._id)}
                      aria-label="Delete Enquiry"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnquiriesManagement;
