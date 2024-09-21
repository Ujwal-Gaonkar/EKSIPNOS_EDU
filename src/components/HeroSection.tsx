import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center items-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/heroImage.jpg')" }} // Background image path
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center">
        <h2 className="text-white text-5xl font-bold mb-4">
          Advance Your Career with Top Universities
        </h2>
        <p className="text-white text-lg mb-8">
          Enroll in online higher education courses designed for working
          professionals to boost your skills and increase your pay scale.
        </p>
        
        {/* Corrected Link Usage */}
        <Link href="#courses">
          <span className="cta-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Explore Courses
          </span>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
