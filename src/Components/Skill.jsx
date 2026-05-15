// src/components/SkillsSection.jsx
import { motion } from 'framer-motion';
import {
  FaPython, FaJava, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs,
  FaDatabase, FaRProject, FaChartBar, FaCloud, FaCode, FaChartPie,
  FaDocker, FaGitAlt, FaGithub, FaAws, FaServer
} from 'react-icons/fa';
import {
  SiDjango, SiExpress, SiMongodb, SiMysql, SiOracle, SiTableau,
  SiNumpy, SiPandas, SiScikitlearn, SiScipy, SiJupyter,
  SiPycharm, SiApachespark,
  SiTensorflow, SiPytorch, SiKeras, SiHuggingface,
  SiGooglecloud, SiGithubactions,
  SiTypescript, SiNextdotjs, SiPostgresql, SiRedis,
  SiFastapi, SiStreamlit
} from 'react-icons/si';

const skills = [
  // ── LANGUAGES ───────────────────────────────────────────────────
  {
    category: 'Languages',
    items: [
      { name: 'Python', icon: <FaPython className="text-yellow-400" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-400" /> },
      { name: 'JavaScript', icon: <FaJsSquare className="text-yellow-300" /> },
      { name: 'R', icon: <FaRProject className="text-blue-300" /> },
      { name: 'C / C++', icon: <FaCode className="text-gray-400" /> },
      { name: 'Core Java', icon: <FaJava className="text-orange-600" /> },
      { name: 'Excel / VBA', icon: <FaChartBar className="text-green-300" /> },
    ],
  },

  // ── FULL STACK — FRONTEND ────────────────────────────────────────
  {
    category: 'Frontend',
    items: [
      { name: 'React (Vite)', icon: <FaReact className="text-cyan-300" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
      { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
      { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" /> },
    ],
  },

  // ── FULL STACK — BACKEND ─────────────────────────────────────────
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
      { name: 'Express.js', icon: <SiExpress className="text-gray-300" /> },
      { name: 'Django', icon: <SiDjango className="text-green-600" /> },
      { name: 'FastAPI', icon: <SiFastapi className="text-teal-400" /> },
      { name: 'REST APIs', icon: <FaServer className="text-green-400" /> },
      { name: 'JWT Authentication', icon: <FaCode className="text-pink-300" /> },
    ],
  },

  // ── DATABASES ────────────────────────────────────────────────────
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-400" /> },
      { name: 'MySQL', icon: <SiMysql className="text-blue-500" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
      { name: 'Redis', icon: <SiRedis className="text-red-500" /> },
      { name: 'Oracle', icon: <SiOracle className="text-red-600" /> },
      { name: 'SQLite', icon: <FaDatabase className="text-gray-400" /> },
      { name: 'BigQuery / DWH', icon: <FaCloud className="text-blue-300" /> },
    ],
  },

  // ── AI + FULL STACK ──────────────────────────────────────────────
  {
    category: 'Machine Learning / AI',
    items: [
      { name: 'TensorFlow', icon: <SiTensorflow className="text-orange-400" /> },
      { name: 'PyTorch', icon: <SiPytorch className="text-red-400" /> },
      { name: 'Keras', icon: <SiKeras className="text-red-300" /> },
      { name: 'Hugging Face', icon: <SiHuggingface className="text-yellow-300" /> },
      { name: 'Scikit-learn', icon: <SiScikitlearn className="text-blue-300" /> },
      { name: 'LLMs / Prompt Engineering', icon: <FaCode className="text-purple-300" /> },
      { name: 'OpenCV', icon: <FaPython className="text-green-300" /> },
    ],
  },
  {
    category: 'AI App Development',
    items: [
      { name: 'OpenAI API', icon: <FaCode className="text-green-400" /> },
      { name: 'LangChain', icon: <FaCode className="text-yellow-400" /> },
      { name: 'Vector DBs (Pinecone / ChromaDB)', icon: <FaDatabase className="text-purple-400" /> },
      { name: 'RAG Pipelines', icon: <FaCloud className="text-pink-400" /> },
      { name: 'Streamlit', icon: <SiStreamlit className="text-red-400" /> },
    ],
  },

  // ── PYTHON LIBRARIES ─────────────────────────────────────────────
  {
    category: 'Python Libraries',
    items: [
      { name: 'NumPy', icon: <SiNumpy className="text-purple-300" /> },
      { name: 'pandas', icon: <SiPandas className="text-white" /> },
      { name: 'Matplotlib / Seaborn', icon: <FaChartBar className="text-orange-400" /> },
      { name: 'SciPy', icon: <SiScipy className="text-indigo-300" /> },
      { name: 'Beautiful Soup / Scrapy', icon: <FaPython className="text-yellow-300" /> },
    ],
  },

  // ── DATA & VISUALIZATION ─────────────────────────────────────────
  {
    category: 'Data & Visualization',
    items: [
      { name: 'Tableau', icon: <SiTableau className="text-indigo-400" /> },
      { name: 'Power BI', icon: <FaChartPie className="text-yellow-500" /> },
      { name: 'Plotly', icon: <FaChartBar className="text-pink-300" /> },
      { name: 'Data Analysis / ETL', icon: <FaChartBar className="text-yellow-300" /> },
      { name: 'Market Data Monitoring', icon: <FaDatabase className="text-gray-300" /> },
    ],
  },

  // ── PLATFORMS & TOOLS ────────────────────────────────────────────
  {
    category: 'Platforms & Tools',
    items: [
      { name: 'Databricks', icon: <SiApachespark className="text-orange-500" /> },
      { name: 'Apache PySpark', icon: <SiApachespark className="text-red-500" /> },
      { name: 'Jupyter Notebook', icon: <SiJupyter className="text-orange-300" /> },
      { name: 'VS Code', icon: <FaCode className="text-blue-400" /> },
      { name: 'PyCharm', icon: <SiPycharm className="text-green-300" /> },
    ],
  },

  // ── CLOUD ────────────────────────────────────────────────────────
  {
    category: 'Cloud Platforms',
    items: [
      { name: 'AWS', icon: <FaAws className="text-yellow-400" /> },
      { name: 'Google Cloud (GCP)', icon: <SiGooglecloud className="text-blue-400" /> },
      { name: 'Microsoft Azure', icon: <FaCloud className="text-blue-500" /> },
    ],
  },

  // ── DEVOPS ───────────────────────────────────────────────────────
  {
    category: 'DevOps & CI/CD',
    items: [
      { name: 'Docker', icon: <FaDocker className="text-blue-400" /> },
      { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> },
      { name: 'GitHub', icon: <FaGithub className="text-gray-300" /> },
      { name: 'GitHub Actions', icon: <SiGithubactions className="text-cyan-400" /> },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {skills.map((group, index) => (
            <motion.div
              key={index}
              initial="initial"
              whileHover="hover"
              variants={{ hover: { scale: 1.02 } }}
              className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-cyan-300">
                {group.category}
              </h3>

              <ul className="space-y-3">
                {group.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-3 text-sm relative"
                  >
                    {/* ICON */}
                    <motion.span
                      className="text-xl"
                      variants={{ hover: { scale: [1, 1.2, 1] } }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: idx * 0.1 }}
                    >
                      {item.icon}
                    </motion.span>

                    {/* TEXT */}
                    <motion.span
                      variants={{ hover: { color: '#67e8f9' } }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      {item.name}
                    </motion.span>

                    {/* GLOW */}
                    <motion.span
                      className="absolute w-6 h-6 bg-cyan-400 blur-xl opacity-0"
                      variants={{ hover: { opacity: 0.3 } }}
                    />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}