import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Joi from 'joi';
import { useContext } from 'react';
import { AuthContext } from '../pages/context/AuthContext'; // Make sure to import the AuthContext
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated, login } = useContext(AuthContext); // Fetch login from context
  const { redirect } = router.query || {}; // Get the 'redirect' param from URL

  // Joi validation schema for login
  const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters',
      'string.empty': 'Password is required',
    }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Frontend validation with Joi
    const { error } = loginSchema.validate(formData);
    if (error) {
      setError(error.details[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Save the JWT token
        localStorage.setItem('role', data.user.role); // Save the user role

        login(data.token, data.user.role); // Use login from AuthContext to update the state

        const redirectTo = redirect ? String(redirect) : '/dashboard';
        router.replace(redirectTo); // Redirect to the desired route
      } else {
        setError(data.message || 'Failed to login. Please check your credentials.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // If the user is already authenticated, redirect them to the dashboard
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = redirect ? String(redirect) : '/dashboard';
      router.replace(redirectTo); // If authenticated, go to dashboard
    }
  }, [isAuthenticated, redirect, router]); // Add redirect and router to dependency array

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden">
      {/* Curved Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 z-0">
        <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#fff" fillOpacity="1" d="M0,320L1440,160L1440,320L0,320Z"></path>
        </svg>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-lg p-10 bg-white rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl">
        {/* Cancel button (X) */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition ease-in-out"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>

        <h2 className="text-4xl font-bold mb-6 text-gray-900 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 ease-in-out hover:border-blue-500"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-all duration-300 ease-in-out hover:border-blue-500"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-full transition duration-300 transform hover:bg-blue-700 hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:text-blue-600">
            Register here
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
