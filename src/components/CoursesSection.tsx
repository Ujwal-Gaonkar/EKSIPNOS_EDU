import Image from 'next/image';

interface Course {
  title: string;
  university: string;
  duration: string;
  degreeType: string;
  image: string;
}

const coursesData: Course[] = [
  {
    title: "Bachelor of Commerce (BCOM)",
    university: "Commerce University",
    duration: "36 Months",
    degreeType: "Bachelor's Degree",
    image: "/images/courses/bcom.png",
  },
  {
    title: "Bachelor of Business Administration (BBA)",
    university: "Business Academy",
    duration: "36 Months",
    degreeType: "Bachelor's Degree",
    image: "/images/courses/bba.png",
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    university: "Tech University",
    duration: "36 Months",
    degreeType: "Bachelor's Degree",
    image: "/images/courses/bca.png",
  },
  {
    title: "Bachelor of Arts (BA)",
    university: "Liberal Arts University",
    duration: "36 Months",
    degreeType: "Bachelor's Degree",
    image: "/images/courses/ba.png",
  },
  {
    title: "Master of Business Administration (MBA)",
    university: "Global Business School",
    duration: "24 Months",
    degreeType: "Master's Degree",
    image: "/images/courses/mba.png",
  },
  {
    title: "Master of Computer Applications (MCA)",
    university: "Tech Academy",
    duration: "24 Months",
    degreeType: "Master's Degree",
    image: "/images/courses/mca.png",
  },
  {
    title: "Master of Commerce (MCOM)",
    university: "Commerce Institute",
    duration: "24 Months",
    degreeType: "Master's Degree",
    image: "/images/courses/mcom.png",
  },
  {
    title: "Master of Journalism & Mass Communication (MAJMC)",
    university: "Media Academy",
    duration: "24 Months",
    degreeType: "Master's Degree",
    image: "/images/courses/jmc.png",
  },
];

const CoursesSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Discover Our Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {coursesData.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-64 transition duration-300 ease-in-out transform hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-2">{course.university}</p>
                <p className="text-gray-600 mb-2">{course.duration}</p>
                <p className="text-gray-600 mb-4">{course.degreeType}</p>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    View Program
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300">
                    Syllabus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
