import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const htmlBody = `
  <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>📬 New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Request Description:</strong></p>
      <p>${formData.message}</p>
      <hr>
      <p style="font-size: 12px; color: #777;">
        Submitted via the contact form at agents4people.coms
      </p>
    </body>
  </html>
  `;


    const payload = {
      subject: `[Agents4People] Contact Form Submitted from ${formData.name}`,
      message: htmlBody,
      from:'contactform@agents4people.com',
      to:'alessiogiovannini23@gmail.com'
    };

    try {
      const res = await fetch('https://jyf0mqxvqj.execute-api.eu-central-1.amazonaws.com/prod/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to send');
      setStatus('Email sent successfully!');
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      setStatus('Failed to send email. Please try again.');
    }
  };

  return (
    <section className="py-24 bg-white w-full" id="contact">
      <div className="container mx-auto text-center px-4">
        <motion.h2
          className="text-2xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-metallic-blue text-center py-3 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Get in Touch
        </motion.h2>

        <motion.div
          className="max-w-2xl mx-auto mb-12 text-lg text-transparent bg-clip-text bg-metallic-blue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Whether you have a clear plan or just an idea, let's bring it to life.
          We're here to collaborate, advise, and help you move forward.
        </motion.div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-xl shadow-xl space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
          />
          <textarea
            name="message"
            placeholder="Describe your request"
            required
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition"
          >
            Send Request
          </button>
          {status && <p className="text-sm text-center text-gray-600 mt-2">{status}</p>}
        </form>

        {/* Calendly CTA (optional below the form) */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-8 rounded-2xl shadow-2xl text-white text-center">
            <h3 className="text-2xl font-semibold mb-4">Do you need more information?</h3>
            <p className="mb-6 text-gray-200">
              Book a 30-minute call directly to discuss your project or idea with us.
            </p>
            <motion.a
              href="https://calendly.com/alessiogiovannini23/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center py-3 px-6 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg font-semibold hover:from-green-500 hover:to-teal-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Call
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
