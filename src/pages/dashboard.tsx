import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/pages/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft, faKey, faEnvelope, faUserCog, faUser } from '@fortawesome/free-solid-svg-icons'; // New icons
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { userRole, isAuthenticated } = useContext(AuthContext); // Use AuthContext
  const [selectedMenu, setSelectedMenu] = useState('profile'); // State for selected menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle for desktop and mobile
  const router = useRouter();

  const isAdmin = userRole === 'admin'; // Check if the user is an admin

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return null; // Don't render anything if the user is not authenticated
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'w-64' : 'w-20'
          } bg-gray-800 text-white flex flex-col py-6 transition-all duration-300 ease-in-out`}
          style={{ marginTop: '4rem' }} // Margin added to avoid navbar overlap
        >
          {/* Sidebar Toggle */}
          <button
            className="text-white mb-4 p-2 focus:outline-none transform transition-transform duration-300 ease-in-out"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon
              icon={isSidebarOpen ? faAngleDoubleLeft : faAngleDoubleRight} // Animate with new icons
              className="text-xl"
            />
          </button>

          {/* Menu Items */}
          <ul className="space-y-4">
            <li
              onClick={() => setSelectedMenu('profile')}
              className={`flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 ${
                selectedMenu === 'profile' ? 'bg-gray-700' : ''
              }`}
            >
              <FontAwesomeIcon icon={faUser} className="mr-4" />
              {isSidebarOpen && <span>My Account</span>}
            </li>

            <li
              onClick={() => setSelectedMenu('changePassword')}
              className={`flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 ${
                selectedMenu === 'changePassword' ? 'bg-gray-700' : ''
              }`}
            >
              <FontAwesomeIcon icon={faKey} className="mr-4" />
              {isSidebarOpen && <span>Change Password</span>}
            </li>

            <li
              onClick={() => setSelectedMenu('enquiries')}
              className={`flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 ${
                selectedMenu === 'enquiries' ? 'bg-gray-700' : ''
              }`}
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-4" />
              {isSidebarOpen && <span>Enquiries</span>}
            </li>

            {/* Admin Dashboard (Visible only for admin users) */}
            {isAdmin && (
              <li
                onClick={() => router.push('/admin/dashboard')}
                className={`flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 ${
                  selectedMenu === 'admin' ? 'bg-gray-700' : ''
                }`}
              >
                <FontAwesomeIcon icon={faUserCog} className="mr-4" />
                {isSidebarOpen && <span>Admin Dashboard</span>}
              </li>
            )}
          </ul>
        </aside>

        {/* Main content */}
        <div className="flex-1 p-10 overflow-y-auto bg-gray-100" style={{ marginTop: '4rem' }}>
          {/* Render selected section */}
          {selectedMenu === 'profile' && <ProfileSection />}
          {selectedMenu === 'changePassword' && <ChangePasswordSection />}
          {selectedMenu === 'enquiries' && <EnquiriesSection />}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Dummy Components for each section
const ProfileSection = () => (
  <div className="p-6 bg-white shadow rounded-lg">
    <h3 className="text-2xl font-semibold mb-4">Your Profile Info</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <p className="font-semibold">Name:</p>
        <p>John Doe</p>
      </div>
      <div>
        <p className="font-semibold">Email:</p>
        <p>john@example.com</p>
      </div>
      <div>
        <p className="font-semibold">Role:</p>
        <p>User</p>
      </div>
    </div>
  </div>
);

const ChangePasswordSection = () => (
  <div className="p-6 bg-white shadow rounded-lg">
    <h3 className="text-2xl font-semibold mb-4">Change Your Password</h3>
    <p>Form to change your password...</p>
  </div>
);

const EnquiriesSection = () => (
  <div className="p-6 bg-white shadow rounded-lg">
    <h3 className="text-2xl font-semibold mb-4">Your Enquiries</h3>
    <p>List of enquiries...</p>
  </div>
);

export default Dashboard;
