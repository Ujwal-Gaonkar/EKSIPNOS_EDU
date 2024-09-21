import { useState } from 'react';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });

  const validateForm = (): boolean => {
    const newErrors: FormData = { name: '', email: '', phone: '', course: '', message: '' };
    let isValid = true;

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
      isValid = false;
    }

    // Phone validation
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
      isValid = false;
    }

    // Course validation
    if (!formData.course) {
      newErrors.course = 'Course selection is required';
      isValid = false;
    }

    // Message validation
    if (!formData.message) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      alert('Form submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: '',
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 py-16">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Image Section */}
        <div className="w-full md:w-1/2 p-6 flex justify-center md:justify-start">
          <Image
            src="/images/Counselling.png" // Image path
            alt="Counseling"
            width={600}
            height={500}
            className="rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-white shadow-2xl rounded-2xl p-10 transition-transform duration-500 transform hover:scale-105">
          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">
            Get Free Counseling
          </h2>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Fill out the form below to get personalized counseling for our courses.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="group">
              <label htmlFor="name" className="block text-lg font-semibold text-gray-800 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform transform group-hover:scale-105 text-black"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="group">
              <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform transform group-hover:scale-105 text-black"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="group">
              <label htmlFor="phone" className="block text-lg font-semibold text-gray-800 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform transform group-hover:scale-105 text-black"
                required
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Course of Interest */}
            <div className="group">
              <label htmlFor="course" className="block text-lg font-semibold text-gray-800 mb-1">
                Course of Interest
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform transform group-hover:scale-105 text-black"
                required
              >
                <option value="" disabled>
                  Select a course
                </option>
                <option value="BCOM">BCOM</option>
                <option value="BBA">BBA</option>
                <option value="BCA">BCA</option>
                <option value="BA">BA</option>
                <option value="MBA">MBA</option>
                <option value="MCA">MCA</option>
                <option value="MCOM">MCOM</option>
                <option value="MAJMC">MAJMC</option>
              </select>
              {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
            </div>

            {/* Additional Message */}
            <div className="group">
              <label htmlFor="message" className="block text-lg font-semibold text-gray-800 mb-1">
                Additional Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Anything else you'd like us to know?"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform transform group-hover:scale-105 text-black"
                rows={4}
                required
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
