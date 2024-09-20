import type { NextPage } from 'next';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EnquiryForm from '@/components/EnquiryForm';
import CoursesSection from '@/components/CoursesSection';
import Footer from '@/components/Footer';

const Home: NextPage = () => {
  return (
    <div>
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

       {/* Enquiry Form Section */}
       <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6">Get Free Counseling</h2>
          <p className="text-center text-lg mb-8">Fill in the form below to get personalized counseling for our courses.</p>
          <EnquiryForm />
        </div>
      </section>

      {/* Courses Section */}
      <CoursesSection />

     

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
