import { FC, useState } from 'react';
import Link from 'next/link';
import { FaTachometerAlt, FaUsers, FaEnvelope, FaUserShield, FaChartLine, FaCog } from 'react-icons/fa'; // Importing icons

interface SidebarProps {
  activePage: string;
}

const Sidebar: FC<SidebarProps> = ({ activePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`flex flex-col h-screen bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-4 focus:outline-none bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isCollapsed ? '☰' : '✕'}
      </button>

      {/* Sidebar Links */}
      <div className={`flex flex-col space-y-4 p-4 transition-all duration-300 ${isCollapsed ? 'items-center' : 'items-start'}`}>
        {/* Dashboard Link */}
        <Link href="/admin/dashboard" passHref>
          <div className={`flex items-center p-2 rounded-lg cursor-pointer w-full ${activePage === 'dashboard' ? 'bg-blue-500' : 'hover:bg-blue-600'}`}>
            <FaTachometerAlt className={`text-xl ${isCollapsed ? 'mx-auto' : 'mr-4'}`} />
            {!isCollapsed && <span>Dashboard</span>}
          </div>
        </Link>

        {/* Users Link */}
        <Link href="/admin/Users" passHref>
          <div className={`flex items-center p-2 rounded-lg cursor-pointer w-full ${activePage === 'users' ? 'bg-blue-500' : 'hover:bg-blue-600'}`}>
            <FaUsers className={`text-xl ${isCollapsed ? 'mx-auto' : 'mr-4'}`} />
            {!isCollapsed && <span>Users</span>}
          </div>
        </Link>

        {/* Enquiries Link */}
        <Link href="/admin/Enquiries" passHref>
          <div className={`flex items-center p-2 rounded-lg cursor-pointer w-full ${activePage === 'enquiries' ? 'bg-blue-500' : 'hover:bg-blue-600'}`}>
            <FaEnvelope className={`text-xl ${isCollapsed ? 'mx-auto' : 'mr-4'}`} />
            {!isCollapsed && <span>Enquiries</span>}
          </div>
        </Link>

        {/* Manage Team Link */}
        <Link href="/admin/manage-team" passHref>
          <div className={`flex items-center p-2 rounded-lg cursor-pointer w-full ${activePage === 'manageTeam' ? 'bg-blue-500' : 'hover:bg-blue-600'}`}>
            <FaUserShield className={`text-xl ${isCollapsed ? 'mx-auto' : 'mr-4'}`} />
            {!isCollapsed && <span>Manage Team</span>}
          </div>
        </Link>

        {/* User Analytics Link */}
        <Link href="/admin/user-analytics" passHref>
          <div className={`flex items-center p-2 rounded-lg cursor-pointer w-full ${activePage === 'userAnalytics' ? 'bg-blue-500' : 'hover:bg-blue-600'}`}>
            <FaChartLine className={`text-xl ${isCollapsed ? 'mx-auto' : 'mr-4'}`} />
            {!isCollapsed && <span>User Analytics</span>}
          </div>
        </Link>

        {/* Settings Link */}
        <Link href="/admin/settings" passHref>
          <div className={`flex items-center p-2 rounded-lg cursor-pointer w-full ${activePage === 'settings' ? 'bg-blue-500' : 'hover:bg-blue-600'}`}>
            <FaCog className={`text-xl ${isCollapsed ? 'mx-auto' : 'mr-4'}`} />
            {!isCollapsed && <span>Settings</span>}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
