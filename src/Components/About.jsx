import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const timeline = [
  {
    year: '2015 - 2018',
    title: 'Diploma in Computer Engineering.',
    description: 'Government Polytechnic Pune.',
    type: 'education',
  },
  {
    year: '2018 - 2021',
    title: 'Bachelors of Engineering.',
    description: 'Baba Saheb Naik College of Engineering.',
    type: 'education',
  },
  {
    year: '2021 - 2024',
    title: 'Senior Software Developer.',
    description: 'Capgemini.',
    type: 'experience',
    projects: [
      {
        name: 'FIAT',
        desc: 'Automated data workflows and built dashboards to provide market insights, improve client visibility, and enable real-time alerting for ticket resolution.',
        tech: ' Excel Macros, Power BI, SQL, Tableau.',
      },
      {
        name: 'HMRC',
        desc: 'Developed backend business logic and responsive web interfaces, integrated APIs, and ensured secure, high-performance applications through testing and collaboration.',
        tech: 'Python, Flask, Django, HTML, CSS, JavaScript, SQL, APIs.',
      },
    ],
  },
  {
    year: '2024 - Present',
    title: 'Full Stack Developer (Freelancer)',
    description: 'Built scalable apps using Firebase and MongoDB.',
    type: 'experience',
    projects: [
      {
        name: 'Birth Certificate Management System',
        desc: 'Full-stack app for registering births and generating certificates.',
        tech: 'React (Vite), Node.js, MongoDB, JWT, Tailwind CSS',
      },
      {
        name: 'Hospital Appointment System',
        desc: 'Responsive app for managing hospital appointments.',
        tech: 'JavaScript, HTML, CSS, Bootstrap, jQuery, SQL',
      },
      {
        name: 'Migration Trend Analysis',
        desc: 'Analyzed demographic patterns using Census data.',
        tech: 'PySpark, pandas, SQL, Excel, Seaborn, Jupyter',
      },
    ],
  },
];

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Journey
        </motion.h2>

        <div ref={ref} className="relative">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-700 transform -translate-x-1/2 z-0"></div>

          <div className="flex flex-col gap-24">
            {timeline.map((item, index) => {
              const isExperience = item.type === 'experience';
              const Icon = isExperience ? FaBriefcase : FaGraduationCap;
              const borderColor = isExperience ? 'border-blue-500' : 'border-green-500';
              const dotColor = isExperience ? 'border-blue-500' : 'border-green-500';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isExperience ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex items-start"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-1/2 top-5 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 ${dotColor} bg-white z-10`}
                  ></div>

                  {/* Card Section */}
                  <div
                    className={`group w-1/2 px-4 ${
                      isExperience ? 'text-right pr-10' : 'ml-auto pl-10'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className={`bg-gray-800 p-5 rounded-lg shadow-md border-l-4 ${borderColor} transition-all duration-300 group-hover:bg-gray-700`}
                    >
                      {/* Year + Icon */}
                      <div className={`flex items-center gap-2 ${isExperience ? 'justify-end' : 'justify-start'} mb-1`}>
                        <Icon className="text-xl" />
                        <span className="font-medium">{item.year}</span>
                      </div>

                      {/* Title */}
                      <div className={`text-lg font-semibold ${isExperience ? 'text-right' : 'text-left'} mb-2`}>
                        {item.title}
                      </div>

                      {/* Description and Projects */}
                      <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-[500px]">
                        <p className="text-gray-300 text-sm">{item.description}</p>

                        {item.projects && (
                          <div className="mt-3 space-y-2">
                            {item.projects.map((proj, i) => (
                              <div key={i} className="bg-gray-700/30 p-2 rounded">
                                <p className="text-sm font-semibold text-white">{proj.name}</p>
                                <p className="text-xs text-gray-300">{proj.desc}</p>
                                <p className="text-[11px] italic text-gray-400">Tech: {proj.tech}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
