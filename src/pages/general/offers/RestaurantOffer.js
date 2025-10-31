import React, { useState } from "react";
import { Phone, QrCode, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    id: "ai-agents",
    icon: <Phone className="w-6 h-6 text-blue-600" />,
    title: "AI Reservation Agents",
    description:
      "Handle reservations via phone, WhatsApp, or other platforms with smart scheduling and real-time availability checks.",
    highlight: "Ad-hoc notifications keep owners informed and in control.",

  },
  {
    id: "digital-orders",
    icon: <QrCode className="w-6 h-6 text-indigo-600" />,
    title: "Digital Table Orders",
    description:
      "Customers scan a QR code at their table to place orders directly from the menu.",
    highlight: "Staff can review, confirm, and dispatch orders efficiently.",
  
  },
  {
    id: "restaurant-crm",
    icon: <LayoutDashboard className="w-6 h-6 text-sky-600" />,
    title: "Restaurant CRM",
    description:
      "Monitor and manage all restaurant operations: orders, reservations, tables, and menu items.",
    highlight: "A futuristic control center for modern dining.",
   
  }
];

const RestaurantLandingPage = () => {
  const [activeTab, setActiveTab] = useState("ai-agents");

  return (
    <div className="bg-white  w-full ">
    <div className="bg-white text-black w-full md:w-3/4 lg:w-1/2 mx-auto">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-metallic-blue text-center py-3 mb-6 sm:mb-10"
        >
          Revolutionize Your Restaurant Experience
        </motion.h1>
        <p className="max-w-xl mx-auto text-gray-700 text-lg">
          Explore our AI-powered tools, contactless ordering, and advanced CRM designed to elevate your hospitality operations.
        </p>
      </section>

      {/* Features Section - Stacked */}
      <section className="w-full flex flex-col lg:flex-row">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="w-full flex  items-start justify-start lg:justify-center gap-8 px-4 py-12 border-t border-gray-200"
          >
         
            <div className="">
              <div className="flex items-center gap-2 mb-3">{feature.icon}</div>
              <h3 className="text-3xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700 mb-2 text-lg">{feature.description}</p>
              <p className="text-blue-600 italic text-sm">{feature.highlight}</p>
            </div>
          </motion.div>
        ))}
      </section>

   {/* Call to Action */}
      <section className="text-center py-4 ">
        <h2 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-metallic-blue text-center py-3 mb-6 sm:mb-10">Try out Demo</h2>
        <p className="text-gray-700 mb-6">
          Try the different components for Digital Orders, Restaurant CRM, Conversational AI Agent.
        </p>

        <div className='flex flex-wrap gap-4 justify-center'>
  {/* Digital Orders */}
  <a
    className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 via-emerald-500 to-lime-500 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
    href="/restaurant/do/lab_3/3"
    target="_blank"
    rel="noopener noreferrer"
  >
    Digital Orders
  </a>

  {/* Restaurant CRM */}
  <a
    className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
    href="/restaurant/dashboard"
    target="_blank"
    rel="noopener noreferrer"
  >
    Restaurant CRM
  </a>

  {/* AI Agents */}
  <a
    className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
    href="/sonic?id=restaurant-demo"
    target="_blank"
    rel="noopener noreferrer"
  >
    AI Agents
  </a>
</div>

      
      </section>


      {/* Call to Action */}
      <section className="text-center py-8 ">
        <h2 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-metallic-blue text-center py-3 mb-6 sm:mb-10">Ready to Elevate Your Restaurant?</h2>
        <p className="text-gray-700 mb-6">
          Let us help you streamline operations, delight customers, and grow your business with the latest in hospitality tech.
        </p>
        <a className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300" href="/#contact">
          Contact Us
        </a>
      </section>
    </div>

    </div>
  );
};

export default RestaurantLandingPage;