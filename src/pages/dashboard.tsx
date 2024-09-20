import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope, faSignOutAlt, faUserCog, faUser } from '@fortawesome/free-solid-svg-icons'; // Icons
import { AuthContext } from '@/pages/context/AuthContext'; // Assuming you have AuthContext
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext); // User data and authentication
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState('profile'); // State for selected menu

  // Mock admin role (replace this with your actual user role)
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    router.push('/'); // Redirect to home after logout
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4">
            {/* User profile */}
            <div className="mb-8 flex items-center">
              <img
                src="/images/profile.jpg" // Replace with user's profile image
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-bold text-lg">{user?.name || 'My Account'}</h4>
              </div>
            </div>

            {/* Menu Items */}
            <ul className="space-y-4">
              <li
                onClick={() => setSelectedMenu('profile')}
                className={`flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-700 ${
                  selectedMenu === 'profile' ? 'bg-gray-800' : ''
                }`}
              >
                <FontAwesomeIcon icon={faUser} className="mr-4" />
                <span>My Account</span>
              </li>

              <li
                onClick={() => setSelectedMenu('changePassword')}
                className={`flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-700 ${
                  selectedMenu === 'changePassword' ? 'bg-gray-800' : ''
                }`}
              >
                <FontAwesomeIcon icon={faKey} className="mr-4" />
                <span>Change Password</span>
              </li>

              <li
                onClick={() => setSelectedMenu('enquiries')}
                className={`flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-700 ${
                  selectedMenu === 'enquiries' ? 'bg-gray-800' : ''
                }`}
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-4" />
                <span>Enquiries</span>
              </li>

              {/* Admin Dashboard (Visible only for admin users) */}
              {isAdmin && (
                <li
                  onClick={() => setSelectedMenu('admin')}
                  className={`flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-700 ${
                    selectedMenu === 'admin' ? 'bg-gray-800' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faUserCog} className="mr-4" />
                  <span>Admin Dashboard</span>
                </li>
              )}

              <li
                onClick={handleLogout}
                className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-red-600 mt-6"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-4" />
                <span>Log Out</span>
              </li>
            </ul>
          </aside>

          {/* Main content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {selectedMenu === 'profile' && <ProfileSection />}
            {selectedMenu === 'changePassword' && <ChangePasswordSection />}
            {selectedMenu === 'enquiries' && <EnquiriesSection />}
            {selectedMenu === 'admin' && isAdmin && <AdminDashboard />}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

// Dummy Components for each section
const ProfileSection = () => <div>Your Profile Info</div>;
const ChangePasswordSection = () => <div>Change your password here</div>;
const EnquiriesSection = () => <div>Your enquiries will be listed here</div>;
const AdminDashboard = () => <div>Admin dashboard (visible to admin users)</div>;

export default Dashboard;
