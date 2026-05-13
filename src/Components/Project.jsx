// src/components/ProjectsSection.jsx
import { motion } from 'framer-motion';
import { FaGithub, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import {
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiJavascript,
  SiTailwindcss,
  SiPandas,
  SiApachespark,
  SiJupyter
} from 'react-icons/si';
import { BiLinkExternal } from 'react-icons/bi';
import { FaChartBar } from 'react-icons/fa';

const projects = [
  {
    title: 'Maharashtra Migration Analysis',
    points: [
      "Processed large-scale census data using PySpark",
      "Performed EDA to uncover migration trends",
      "Built dashboards for demographic insights",
      "Applied statistical modeling for forecasting",
      "Enabled data-driven policy insights"
    ],
    github: '#',
    live: '#',
    tech: [
      { name: 'PySpark', icon: <SiApachespark className="text-orange-500" /> },
      { name: 'Pandas', icon: <SiPandas className="text-white" /> },
      { name: 'SQL', icon: <FaDatabase className="text-blue-400" /> },
      { name: 'Matplotlib', icon: <FaChartBar className="text-yellow-400" /> },
      { name: 'Jupyter', icon: <SiJupyter className="text-orange-300" /> },
    ],
  },

  {
    title: 'Hospital Appointment System',
    points: [
      "Developed full-stack appointment system (CRUD)",
      "Designed relational database schema",
      "Implemented scheduling conflict validation",
      "Built responsive UI using Bootstrap",
      "Improved efficiency for staff & patients"
    ],
    github: '#',
    live: '#',
    tech: [
      { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
      { name: 'HTML/CSS', icon: <FaReact className="text-orange-400" /> },
      { name: 'MySQL', icon: <SiMysql className="text-blue-500" /> },
      { name: 'jQuery', icon: <SiJavascript className="text-yellow-300" /> },
    ],
  },

  {
    title: 'Birth Certificate System',
    points: [
      "Built secure full-stack system with JWT auth",
      "Developed REST APIs for record management",
      "Designed dynamic forms for registration",
      "Integrated MongoDB for efficient storage",
      "Structured backend for fraud detection use cases"
    ],
    github: '#',
    live: '#',
    tech: [
      { name: 'React', icon: <FaReact className="text-cyan-300" /> },
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
      { name: 'Express', icon: <SiExpress className="text-gray-300" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
      { name: 'JWT', icon: <FaDatabase className="text-pink-400" /> },
    ],
  },

  {
    title: 'Grocery App (In Progress)',
    points: [
      "Built cross-platform mobile app using React Native",
      "Designed modular and reusable UI components",
      "Implemented JWT-based secure authentication",
      "Developed real-time cart & product system",
      "Planning ML-based recommendation engine"
    ],
    github: '#',
    live: '#',
    tech: [
      { name: 'React Native', icon: <FaReact className="text-cyan-300" /> },
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
      { name: 'Express', icon: <SiExpress className="text-gray-300" /> },
      { name: 'JWT', icon: <FaDatabase className="text-pink-400" /> },
    ],
  },
];

export default function Project() {
  return (
    <section id="projects" className="bg-gray-900 text-white py-20">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-4xl font-bold mb-12 text-center">
          Hands on Projects 
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {projects.map((project, index) => (

            <motion.div
              key={index}
              initial="initial"
              whileHover="hover"
              variants={{ hover: { scale: 1.03 } }}
              className="relative bg-gray-800 rounded-xl p-5 overflow-hidden cursor-pointer h-[380px]"
            >

              {/* 🟢 FRONT (ALL BULLETS) */}
              <motion.div
                variants={{
                  initial: { opacity: 1 },
                  hover: { opacity: 0.15 },
                }}
                className="h-full flex flex-col"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>

                <ul className="text-gray-400 text-sm space-y-1 overflow-y-auto pr-1">
                  {project.points.map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              </motion.div>

              {/* 🔵 HOVER (TECH ONLY) */}
              <motion.div
                variants={{
                  initial: { opacity: 0 },
                  hover: { opacity: 1 },
                }}
                className="absolute inset-0 flex flex-col justify-center items-center p-4"
              >

                {/* 💻 SCREEN */}
                <div className="relative h-[60%] w-full border border-gray-600 rounded-md bg-black/80 flex flex-wrap items-center justify-center gap-4 p-3">

                  {project.tech.map((tech, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center text-xs relative"

                      variants={{
                        initial: { opacity: 0 },
                        hover: { opacity: 1 },
                      }}
                    >
                      {/* ICON */}
                      <motion.div
                        className="text-lg relative z-10"
                        variants={{
                          hover: {
                            scale: [1, 1.2, 1],
                          },
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      >
                        {tech.icon}
                      </motion.div>

                      {/* TEXT */}
                      <motion.span
                        variants={{
                          hover: { color: '#67e8f9' },
                        }}
                        transition={{
                          duration: 0.3,
                          delay: i * 0.1,
                        }}
                      >
                        {tech.name}
                      </motion.span>

                      {/* GLOW */}
                      <motion.div
                        className="absolute w-6 h-6 bg-cyan-400 blur-xl opacity-0"
                        variants={{
                          hover: { opacity: 0.4 },
                        }}
                      />
                    </motion.div>
                  ))}

                </div>

                {/* 🔗 LINKS */}
                <div className="flex justify-end gap-3 mt-4 w-full">
                  <a href={project.github} onClick={(e) => e.stopPropagation()}>
                    <FaGithub />
                  </a>
                  <a href={project.live} onClick={(e) => e.stopPropagation()}>
                    <BiLinkExternal />
                  </a>
                </div>

              </motion.div>

            </motion.div>

          ))}

        </div>
      </div>
    </section>
  );
}