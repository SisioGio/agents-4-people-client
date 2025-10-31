import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaCogs, FaCheckCircle, FaLink } from 'react-icons/fa';

const steps = [
  {
    icon: FaHandshake,
    title: 'Step 1: Understand Your Needs',
    description: 'We begin by listening to your pain points and business needs, so we can craft the perfect solution together.',
  },
  {
    icon: FaCogs,
    title: 'Step 2: Design the Solution',
    description: 'Based on your requirements, we design a fully customized AI agent that adds value to your business and solves your unique challenges.',
  },
  {
    icon: FaCheckCircle,
    title: 'Step 3: Performance Testing',
    description: 'Once the agent is ready, we rigorously test it to ensure optimal performance and flawless functionality.',
  },
  {
    icon: FaLink,
    title: 'Step 4: Seamless Integration',
    description: 'We integrate the AI agent into your desired application—whether it’s a phone number, QR code, link, WhatsApp, or more.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gray-50 text-gray-800" id="how-to">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
         className="text-3xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-metallic-blue text-center py-3 mb-6 sm:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          How It Works
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <step.icon className="text-indigo-500 text-3xl mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2 text-center">{step.title}</h4>
              <p className="text-sm text-center text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
