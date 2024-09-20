import { useState } from 'react';
import Link from 'next/link';

const ProfileDropdown: React.FC<{ handleLogout: () => void; user: any }> = ({ handleLogout, user }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <img src="/profile-icon.png" alt="Profile" className="w-8 h-8 rounded-full" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md py-2 z-20">
          <span className="block px-4 py-2 text-gray-700">Hello, {user?.name}!</span>
          <Link href="/profile">
            <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
