import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Joi from 'joi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Importing the 'X' icon for the cancel button

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Frontend validation schema using Joi
  const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Frontend validation
    const { error } = registerSchema.validate(formData);
    if (error) {
      setError(error.details[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        router.push('/login'); // Redirect to login page after successful registration
      } else {
        setError(data.message || 'Failed to register. Please try again.');
      }
    } catch  {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden">
      {/* Curved Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 z-0">
        <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#fff" fillOpacity="1" d="M0,320L1440,160L1440,320L0,320Z"></path>
        </svg>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-lg p-10 bg-white rounded-3xl shadow-xl transform transition-all duration-500 hover:shadow-2xl">
        {/* Cancel button (X) */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition ease-in-out"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>

        {/* Darker heading for better visibility */}
        <h2 className="text-4xl font-bold mb-6 text-gray-900 text-center">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" // Ensure black input text
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" // Ensure black input text
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" // Ensure black input text
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:text-blue-600">
            Login here
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;
