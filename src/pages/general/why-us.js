import React from 'react';
import { motion } from 'framer-motion';
import { FaServer, FaPhoneAlt, FaQrcode, FaLink, FaCogs, FaRobot, FaHandshake, FaMoneyBillWave, FaRocket } from 'react-icons/fa';

const valueGroups = {
  'All-In-One Platform': [
    {
      icon: FaServer,
      title: 'Fully Hosted Solution',
      description: 'We handle infrastructure, uptime, updates, and scaling—so you focus on results.',
    },
    {
      icon: FaCogs,
      title: 'Tailored Agent Setup',
      description: 'We customize each agent’s behavior and actions for your use case—no technical work needed on your end.',
    },
    {
      icon: FaRocket,
      title: 'Rapid Deployment',
      description: 'Go live in hours, not weeks. Start generating value almost instantly.',
    },
  ],
  'Seamless Integrations': [
    {
      icon: FaPhoneAlt,
      title: 'Phone Number Routing',
      description: 'Let users call your AI agent directly with a dedicated business number.',
    },
    {
      icon: FaQrcode,
      title: 'Printable QR Codes',
      description: 'Distribute your agent in the real world—menus, posters, receipts, anywhere.',
    },
    {
      icon: FaLink,
      title: '1-Click Sharing',
      description: 'Use simple links or WhatsApp deep-links to embed agents into your user flows.',
    },
  ],
  'Built for Business': [
    {
      icon: FaHandshake,
      title: 'Maintenance & Support Included',
      description: 'Every subscription includes dedicated support and ongoing optimization.',
    },
    {
      icon: FaMoneyBillWave,
      title: 'Transparent, Fair Pricing',
      description: 'Flexible monthly pricing to match your use case—no hidden fees.',
    },
    {
      icon: FaRobot,
      title: 'Custom AI Actions',
      description: 'Agents can book appointments, send emails, file tickets, and much more.',
    },
  ],
};

const WhyUs = () => {
  return (
    <section className="py-24 bg-white text-gray-800 z-20" id="why-us">
      <div className="max-w-7xl mx-auto px-4">

  
        <motion.h2
          className="text-3xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-metallic-blue text-center py-3 mb-6 sm:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Why Choose Our AI Agents?
        </motion.h2>

        {Object.entries(valueGroups).map(([group, features], groupIdx) => (
          <div key={group} className="mb-20">
            <h3 className="text-xl font-semibold mb-8 text-center text-indigo-600 uppercase tracking-wider">{group}</h3>
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-indigo-50 rounded-xl p-6 shadow hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIdx * 0.2 + i * 0.1 }}
                >
                  <feature.icon className="text-indigo-500 text-3xl mb-4 mx-auto" />
                  <h4 className="text-lg font-semibold text-center mb-2">{feature.title}</h4>
                  <p className="text-sm text-center text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}


        <h3 className="text-center text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-700 to-purple-600 bg-clip-text text-transparent py-4">
  All our agents can also be converted into AI chat applications, retaining full functionality across <span className="underline decoration-indigo-400">WhatsApp</span>, <span className="underline decoration-indigo-400">text messaging</span>, <span className="underline decoration-indigo-400">Facebook</span>, <span className="underline decoration-indigo-400">custom web chat apps</span>, and many more platforms.
</h3>

      
      </div>


    </section>
  );
};

export default WhyUs;
