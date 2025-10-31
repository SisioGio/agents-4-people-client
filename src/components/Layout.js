import React from "react";
import { motion } from 'framer-motion';
import MainNav from './Nav';

import CookieBanner from "./CookieBanner";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-800 via-purple-800 to-fuchsia-700 ">
    <div id='header' >
    <MainNav/>
    </div>
  
  
    <div id='main-container'className='flex-grow bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center' style={{'padding-top':"5rem"}} >
 
   {children}

    </div>

    <footer className="bg-metallic-blue text-white text-center py-6">
  <div className="container mx-auto px-6">

    <p className="text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-800 font-semibold text-white">
      &copy; 2025 <span className="font-semibold">Agents4People</span> developed by Alessio Giovannini. All rights reserved.
    </p>
 
  </div>
  



  
 
    <CookieBanner />
  
</footer>



  </div>
  );
};

export default Layout;
