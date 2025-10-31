'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';

const particleVariants = {
  float: {
    y: [30, 30, 0],
    x: [30, 30, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const colors = ['text-sky-300', 'text-pink-300', 'text-purple-300', 'text-emerald-300'];

const Header = () => {
  return (
    <header className="relative min-h-[70vh] bg-gradient-to-br from-white via-sky-100 to-white flex items-center justify-center text-gray-800 px-4 py-16 overflow-hidden">
      {/* Floating Icons */}
      <div className=" inset-0 z-0 overflow-hidden pointer-events-none absolute -z-1">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute opacity-20 ${colors[i % colors.length]}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${16 + Math.random() * 14}px`,
              filter: 'drop-shadow(0 0 8px currentColor)',
            }}
            // variants={particleVariants}
            // animate="float"
          >
            <FaRobot />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-metallic-blue"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Conversational AI Agents
        </motion.h1>

        <motion.p
          className="mt-6 text-gray-700 text-lg sm:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Explore our suite of intelligent agents built to automate conversations across industries — from hospitality to customer service, sales, and more.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <a
            href="#agents"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Try It Free
          </a>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none bg-gradient-to-b from-transparent to-white" />
    </header>
  );
};

export default Header;
