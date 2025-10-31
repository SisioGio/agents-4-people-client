import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../utils/AuthContext";
import Menu from "./Menu";
import TableManager from "./Table";
import ReservationsManager from "./Reservations";
import RestaurantSettings from "./RestaurantSettings";
import OrderManager from "./Orders";

const TABS = ["Tables","Orders", "Menu", "Reservations",'Settings'];

const RestaurantHub = () => {
  const { auth } = useAuth();
  const [activeTab, setActiveTab] = useState("Orders");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Menu":
        return <Menu />;
      case "Tables":
        return <TableManager />;
      case "Reservations":
        return <ReservationsManager />;
      case "Settings":
        return <RestaurantSettings />;
      case "Orders":
        return <OrderManager/>
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 p-6 absolute top-0 left-0 z-50 w-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.h1
          className="text-4xl font-extrabold text-center text-indigo-700 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome, {auth?.user?.name || "Manager"}
        </motion.h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 space-x-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-md font-semibold rounded-full transition-all shadow-sm ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-xl border border-indigo-200"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantHub;
