'use client';

import React from 'react';
import { Link } from 'react-router-dom';

import agents from '../../data/agents';
const gradients = [
  'from-indigo-600 via-purple-600 to-pink-600',
  'from-blue-600 via-teal-500 to-green-500',
  'from-rose-600 via-pink-500 to-yellow-500',
 
  'from-amber-600 via-orange-500 to-red-500',
];

// Helper to pick a random gradient
const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

export default function AgentsHub() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="agents">
      <h1 className="text-3xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-metallic-blue text-center py-3 mb-6 sm:mb-10">
        Use cases & Demo
      </h1>

      {/* Scrollable container */}
      <div className="flex flex-nowrap gap-6 justify-start items-stretch overflow-x-auto scrollbar-hide py-4">
        {agents.map(agent => {
         
          const CardContent = (
            <div
              className={`flex-none relative rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 w-64 h-80 flex flex-col justify-end overflow-hidden text-white bg-gradient-to-tr ${getRandomGradient()}`}
            //   style={backgroundStyle}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">{agent.name}</h2>
                <p className="text-sm mb-3">{agent.description}</p>
                
                {!agent.id ? (
                  <div className="mt-4 text-yellow-200 text-sm italic">
                    Demo not available. Contact us to request access.
                  </div>
                ):(
                    <Link to={`/sonic?id=${agent.id}`} className="mt-2 inline-block px-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white  shadow hover:scale-105 hover:shadow-xl transition-transform duration-300">Try me!</Link>
                )}
              </div>
            </div>
          );

          return (
            <div key={agent.id} className="block cursor-default opacity-90 flex-none">
            {CardContent}
          </div>

          )
 
          
        
        })}
      </div>
    </div>
  );
}
