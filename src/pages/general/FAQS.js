import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaPlug, FaDollarSign, FaInfoCircle } from 'react-icons/fa';

const faqs = [
  {
    icon: FaShieldAlt,
    question: 'How is my data handled and protected?',
    answer: 'We prioritize your privacy and security. All data is encrypted both in transit and at rest, ensuring it remains protected from unauthorized access. We adhere to GDPR and other relevant data protection regulations, including ensuring that data is never shared with third parties without explicit consent. You have full control over your data and can request it to be deleted at any time.',
  },
  {
    icon: FaPlug,
    question: 'What integration options are available?',
    answer: 'Our agents can seamlessly integrate with a variety of platforms. Whether you want to use phone numbers, QR codes, links, WhatsApp, or other applications, we’ll collaborate with you to find the best fit for your business needs. We ensure that the integration is smooth, reliable, and fully aligned with your goals.',
  },
  {
    icon: FaDollarSign,
    question: 'What is the pricing model?',
    answer: 'Our pricing is subscription-based, with an initial setup fee starting from €999.99 and a monthly fee starting from €49.00. The exact pricing depends on the complexity of the agent, the required customizations, and the integrations or actions needed. We offer personalized quotes based on your unique requirements to ensure that you only pay for what you need.',
  },
  {
    icon: FaInfoCircle,
    question: 'What support is included?',
    answer: 'We provide comprehensive support as part of the monthly subscription. This includes ongoing maintenance, software updates, troubleshooting, and access to our support team via email or live chat. We are committed to ensuring that your AI agents operate smoothly and effectively, and we’ll assist you with any issues or queries you have at any time.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-white text-gray-800" id="faq">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
         className="text-3xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-metallic-blue text-center py-3 mb-6 sm:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-8">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="bg-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="flex items-center mb-4">
                <faq.icon className="text-indigo-600 text-3xl mr-4" />
                <h4 className="text-xl font-semibold text-gray-900">{faq.question}</h4>
              </div>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
