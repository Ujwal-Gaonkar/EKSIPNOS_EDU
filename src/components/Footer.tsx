import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Icons for social media
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: About */}
        <div>
          <h4 className="font-bold text-lg mb-4">About Us</h4>
          <p className="text-gray-400 leading-relaxed">
            Eksipnos provides expert guidance to help students choose the best courses and universities for their career advancement. We partner with top-tier universities to offer a variety of academic programs.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link href="#home" className="text-gray-400 hover:text-blue-400 transition duration-300">Home</Link>
            </li>
            <li>
              <Link href="#about" className="text-gray-400 hover:text-blue-400 transition duration-300">About Us</Link>
            </li>
            <li>
              <Link href="#services" className="text-gray-400 hover:text-blue-400 transition duration-300">Services</Link>
            </li>
            <li>
              <Link href="#courses" className="text-gray-400 hover:text-blue-400 transition duration-300">Courses</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="font-bold text-lg mb-4">Contact Us</h4>
          <ul className="text-gray-400 space-y-3">
            <li>Email: <a href="mailto:info@eksipnos.in" className="hover:text-blue-400">info@eksipnos.in</a></li>
            <li>Phone: <a href="tel:+919901215660" className="hover:text-blue-400">+91 9901215660</a></li>
            <li>Address: 123 Street, City, Country</li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h4 className="font-bold text-lg mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-blue-400 p-3 rounded-full hover:bg-blue-500 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-pink-500 p-3 rounded-full hover:bg-pink-600 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-blue-700 p-3 rounded-full hover:bg-blue-800 transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 text-center pt-6 text-gray-400">
        &copy; 2024 Eksipnos. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
