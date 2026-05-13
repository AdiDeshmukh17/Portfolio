// src/components/HeroSection.jsx
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiReact,SiPandas,SiApachespark,SiExpress, SiMysql, SiJavascript,SiJupyter, SiNodedotjs, SiMongodb, SiPython } from "react-icons/si";

const roles = [
  "Full Stack Developer",
  "Data Analyst",
  "Backend Engineer",
  "Problem Solver"
];

export default function HeroSection() {
  return (
    <section className="relative h-screen bg-gray-950 text-white overflow-hidden flex items-center">

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-[120px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 blur-[120px] bottom-[-100px] right-[-100px]" />

      {/* ⚙️ FLOATING ICONS */}
      <FloatingIcons />

      <div className="max-w-6xl mx-auto px-6 w-full z-10">

        {/* 👋 INTRO */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-cyan-400 text-sm mb-3"
        >
          Hello, I'm
        </motion.p>

        {/* 🧑 NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Aditya Deshmukh
        </motion.h1>

        {/* 🔥 ROLE */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl text-gray-300 mb-6"
        >
          Building scalable apps & data-driven solutions
        </motion.h2>

        {/* ⚡ DYNAMIC ROLES */}
        <TypingRoles />

        {/* 🎯 BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 mt-8"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg font-semibold transition"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="px-6 py-3 border border-gray-600 hover:border-cyan-400 rounded-lg transition"
          >
            Contact Me
          </a>
        </motion.div>

        {/* 🔗 SOCIALS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-5 mt-8 text-xl text-gray-400"
        >
          <a href="#" className="hover:text-white">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-white">
            <FaLinkedin />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

//////////////////////////////////////////////////////////////////////////
// 🔤 Typing Effect (simple, no extra library)
//////////////////////////////////////////////////////////////////////////

import { useEffect, useState } from "react";

function TypingRoles() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let current = roles[index];
    let i = 0;

    const interval = setInterval(() => {
      setText(current.slice(0, i));
      i++;
      if (i > current.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % roles.length);
        }, 1000);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <p className="text-cyan-400 text-lg h-6">
      {text}
      <span className="animate-pulse">|</span>
    </p>
  );
}

//////////////////////////////////////////////////////////////////////////
// ⚙️ Floating Icons
//////////////////////////////////////////////////////////////////////////

function FloatingIcons() {
  const icons = [
    // 🔵 LEFT SIDE (light now)
    { Icon: SiReact, top: "20%", left: "5%", size: "text-3xl" },
    { Icon: SiPython, top: "70%", left: "8%", size: "text-3xl" },

    // 🟣 CENTER (depth layer)
    { Icon: SiPandas, top: "40%", left: "30%", size: "text-2xl" },

    // 🔥 RIGHT SIDE (DENSE & ALIVE)
    { Icon: SiNodedotjs, top: "15%", right: "6%", size: "text-4xl" },
    { Icon: SiMongodb, top: "30%", right: "10%", size: "text-4xl" },
    { Icon: SiApachespark, top: "50%", right: "5%", size: "text-3xl" },
    { Icon: SiJupyter, top: "65%", right: "12%", size: "text-3xl" },
    { Icon: SiJavascript, top: "80%", right: "8%", size: "text-4xl" },

    // ✨ EXTRA DEPTH (slightly inside right)
    { Icon: SiExpress, top: "35%", right: "20%", size: "text-2xl" },
    { Icon: SiMysql, top: "60%", right: "22%", size: "text-2xl" },
  ];

  return (
    <>
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} text-gray-700`}
          style={item}
          animate={{
            y: [0, -20, 0],
            x: [0, 12, 0], // more movement on right
          }}
          transition={{
            duration: 4 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.Icon />
        </motion.div>
      ))}
    </>
  );
}