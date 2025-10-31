'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import RestaurantLandingPage from './offers/RestaurantOffer';





export default function OurOffers() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="agents">
      {/* <h1 className="text-3xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-metallic-blue text-center py-3 mb-6 sm:mb-10">
        Our Restaurant Offer
      </h1> */}
      <h1 className="text-3xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-metallic-blue text-center py-6 mb-8 sm:mb-12">
          Are you an Airbnb host?
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto text-center mb-8 text-xl">
        Discover our tailored solution designed to streamline and enhance your Airbnb hosting experience.
      </p>
      <a
        href="/offer/airbnb"
        target="_blank"
        rel="noopener noreferrer"
        className="block max-w-md mx-auto w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-center transition text-2xl"
      >
        Explore our Solution
      </a>



      <h1 className="text-3xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-metallic-blue text-center py-6 mb-8 sm:mb-12">
          Are you an Restaurant/Bar owner?
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto text-center mb-8 text-xl">
        Discover our tailored solution designed to streamline and enhance your customers experience and decrease your workload with AI.
      </p>
      <a
        href="/offer/restaurant"
        target="_blank"
        rel="noopener noreferrer"
        className="block max-w-md mx-auto w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-center transition text-2xl"
      >
        Explore our Solution
      </a>



     
   
    </div>
  );
}
