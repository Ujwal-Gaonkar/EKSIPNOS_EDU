import { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../pages/context/AuthContext'; // Assuming you have AuthContext
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast'; // Importing toast and Toaster

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Call logout from AuthContext
    logout();

    // Trigger toast notification for successful logout
    toast.success('Logout Successfully!');

    // Add a small timeout to allow state updates before redirection
    setTimeout(() => {
      router.replace('/'); // Redirect to home page after logout
      
    }, 500); // Add slight delay to allow logout changes to reflect
  };

  return (
    <>
      {/* Toast notification container */}
      <Toaster position="top-right" reverseOrder={false} />

      <header className="bg-white shadow-md fixed w-full z-20 top-0 left-0">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 transition duration-300 transform hover:scale-105">
            <Link href="/">Eksipnos</Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="#home">
              <span className="relative text-gray-800 font-semibold transition duration-300 ease-in-out transform hover:scale-110">
                Home
              </span>
            </Link>
            <Link href="#about">
              <span className="relative text-gray-800 font-semibold transition duration-300 ease-in-out transform hover:scale-110">
                About
              </span>
            </Link>
            <Link href="#services">
              <span className="relative text-gray-800 font-semibold transition duration-300 ease-in-out transform hover:scale-110">
                Services
              </span>
            </Link>
            <Link href="#contact">
              <span className="relative text-gray-800 font-semibold transition duration-300 ease-in-out transform hover:scale-110">
                Contact
              </span>
            </Link>

            {/* Profile/Join Now Button */}
            {isAuthenticated ? (
              <div className="relative flex items-center space-x-4">
                {/* User Profile Icon */}
                <div
                  className="cursor-pointer flex items-center space-x-2"
                  onClick={() => router.push('/dashboard')}
                  title="Go to Dashboard"
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-3xl text-black p-2 rounded-full hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
                  />
                  <span className="text-gray-800 font-semibold">Dashboard</span>
                </div>

                {/* Logout Icon */}
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="cursor-pointer text-xl text-red-500 hover:text-red-600 transition duration-300 ease-in-out transform hover:scale-110"
                  onClick={handleLogout}
                  title="Logout"
                />
              </div>
            ) : (
              <Link href="/register">
                {/* Show Register button when user is logged out */}
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                  Register
                </button>
              </Link>
            )}
          </nav>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
              <svg
                className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'transform rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md w-full">
            <nav className="flex flex-col space-y-2 py-2 px-6">
              <Link href="#home">
                <span className="text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out transform hover:translate-x-1">
                  Home
                </span>
              </Link>
              <Link href="#about">
                <span className="text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out transform hover:translate-x-1">
                  About
                </span>
              </Link>
              <Link href="#services">
                <span className="text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out transform hover:translate-x-1">
                  Services
                </span>
              </Link>
              <Link href="#contact">
                <span className="text-gray-800 hover:text-blue-500 transition duration-300 ease-in-out transform hover:translate-x-1">
                  Contact
                </span>
              </Link>

              {/* Profile Icon for Mobile */}
              <div className="relative">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    {/* Logged-in user mobile icon */}
                    <div
                      onClick={() => router.push('/dashboard')}
                      className="cursor-pointer flex items-center space-x-2"
                      title="Go to Dashboard"
                    >
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="text-3xl text-black p-2 rounded-full hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
                      />
                      <span className="text-gray-800 font-semibold">Dashboard</span>
                    </div>

                    {/* Logout Icon */}
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="cursor-pointer text-xl text-red-500 hover:text-red-600 transition duration-300 ease-in-out transform hover:scale-110"
                      onClick={handleLogout}
                      title="Logout"
                    />
                  </div>
                ) : (
                  <Link href="/register">
                    {/* "Register" button for mobile */}
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                      Register
                    </button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;

