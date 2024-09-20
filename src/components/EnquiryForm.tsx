import { useState } from 'react';
import Image from 'next/image';
import debounce from 'lodash/debounce';


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

  const debouncedHandleChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }, 
    300 // delay in milliseconds
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    debouncedHandleChange(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    alert('Form submitted successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      message: '',
    });
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 py-16">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between">
        {/* Image Section */}
        <div className="w-full md:w-1/2 p-6">
        <Image
  src="/images/Counselling.png" // Image path
  alt="Counseling"
  width={600}
  height={500}
  className="rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
  priority  // Use this if you want it to load with priority
/>

        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-8 transition duration-500 transform hover:scale-105">
          {/* Updated Text Color */}
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Get Free Counseling
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Fill in the form below to get personalized counseling for our courses.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-gray-800 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
            </div>

            {/* Course of Interest */}
            <div>
              <label htmlFor="course" className="block text-gray-800 font-semibold mb-2">
                Course of Interest
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              >
                <option value="" disabled>
                  Select a course
                </option>
                <option value="BCOM" className="text-black">BCOM</option>
                <option value="BBA" className="text-black">BBA</option>
                <option value="BCA" className="text-black">BCA</option>
                <option value="BA" className="text-black">BA</option>
                <option value="MBA" className="text-black">MBA</option>
                <option value="MCA" className="text-black">MCA</option>
                <option value="MCOM" className="text-black">MCOM</option>
                <option value="MAJMC" className="text-black">MAJMC</option>
              </select>
            </div>

            {/* Additional Message */}
            <div>
              <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">
                Additional Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Anything else you'd like us to know?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
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
