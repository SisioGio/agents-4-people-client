import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const accordionVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, type: 'spring', stiffness: 80 },
  }),
};

const AccordionItem = ({ title, description, isActive, onClick, index }) => {
  const getFirstSentence = (text) => {
    const firstSentence = text.split('. ')[0];
    return `${firstSentence}.`;
  };

  return (
    <motion.div
      custom={index}
      variants={accordionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full cursor-pointer rounded-xl border-2 border-transparent bg-gradient-to-r from-indigo-900 via-purple-900 to-fuchsia-900 shadow-lg backdrop-blur-md bg-opacity-30 hover:border-pink-400 hover:shadow-2xl transform hover:scale-[1.03] transition-transform duration-300"
      onClick={onClick}
    >
      <div className="p-6 flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-white">
          {title}
        </h3>
        <motion.span
          animate={{ rotate: isActive ? 45 : 0 }}
          className="text-pink-400 text-3xl select-none"
          aria-hidden="true"
        >
          +
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6 text-lg text-gray-200 select-text"
          >
            {description}
          </motion.div>
        )}
        {!isActive && (
          <motion.div
            key="preview"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 pb-6 text-gray-400 italic select-text"
          >
            {getFirstSentence(description)}{' '}
            <span className="text-pink-400 underline">Read more...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const YouNeedAnAgent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const reasons = [
    {
      title: 'Multilingual Customer Support',
      description:
        'Running a restaurant, hotel, or Airbnb means dealing with guests from all over the world. Language barriers can lead to misunderstandings and lost opportunities. An AI agent can handle multiple languages, instantly translating inquiries and ensuring a seamless communication experience for every guest.',
    },
    {
      title: '24/7 Availability',
      description:
        'Customers need assistance at any time of day or night. With an AI agent, your business can be available 24/7 without the need for extra staff, ensuring guests never have to wait for answers.',
    },
    {
      title: 'Save Time and Increase Efficiency',
      description:
        'From managing reservations to answering FAQs, businesses in hospitality can become overwhelmed by the amount of daily customer interactions. The AI agent streamlines tasks, allowing staff to focus on critical in-person duties while the agent handles routine queries and tasks efficiently.',
    },
    {
      title: 'Increase Customer Satisfaction',
      description:
        'Customers expect fast, personalized, and helpful service at all times. The AI agent ensures that every guest receives consistent and timely assistance, improving satisfaction. Whether it\'s confirming a reservation, answering inquiries, or providing recommendations, guests will always feel valued.',
    },
    {
      title: 'Handle Multiple Requests Simultaneously',
      description:
        'During peak times, customer requests can pile up quickly, leading to delays and frustration. The AI agent can handle multiple queries simultaneously, ensuring that all guests are attended to quickly, from making reservations to answering room service requests.',
    },
    {
      title: 'Seamless Handoff to Human Support When Needed',
      description:
        'While the AI agent handles most requests, there are times when human intervention is needed. The agent seamlessly transitions the conversation to a human representative, ensuring that the guest always gets the support they need.',
    },
    {
      title: 'Consistent, Professional Communication',
      description:
        'Human agents may have different communication styles, leading to inconsistent service. The AI agent ensures consistent, professional responses at all times, creating a seamless experience for your guests.',
    },
  ];

  return (
    <section
      id="you-need-an-agent"
      className="py-16 bg-gradient-to-tr from-indigo-950 via-purple-900 to-blue-950 text-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-5xl sm:text-7xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          You Need an Agent If...
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {reasons.map((item, i) => (
            <AccordionItem
              key={i}
              index={i}
              title={item.title}
              description={item.description}
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouNeedAnAgent;
