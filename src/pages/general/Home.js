import React from 'react';

import { motion } from 'framer-motion';

import ContactForm from './ContactForm';
import Header from './Intro';
import WhyUs from './why-us'
import HowTo from './how-to'
import FAQSection from './FAQS';
import AgentsHub from './AgentsHub';
import YouNeedAnAgent from './YouNeedAgent';
import OurOffers from './OurOffers';


const Home = () => {
  return (
    <div className="bg-white min-h-screen text-white font-sans w-full" id='home'>
      {/* Hero Section */}
    <Header/>
    <div className="relative -mt-1">
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
    {/* Wave Layer 1 */}
    <svg
      className="relative block w-[calc(100%+1.3px)] h-[100px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39 56.19C228.15 68.75 114.41 79.4 0 60V120h1200V0c-99.28 38.57-208.64 49.84-314.81 48.41-109.03-1.46-219.09-18.14-327.73-35.33C451.81 0.94 386.2 45.17 321.39 56.19z"
        fill="#ffffff"
        opacity="0.6"
      >
        <animate
          attributeName="d"
          dur="10s"
          repeatCount="indefinite"
          values="
            M321.39 56.19C228.15 68.75 114.41 79.4 0 60V120h1200V0c-99.28 38.57-208.64 49.84-314.81 48.41-109.03-1.46-219.09-18.14-327.73-35.33C451.81 0.94 386.2 45.17 321.39 56.19z;
            M300 70C200 90 100 100 0 80V120h1200V0c-100 40 -200 50 -300 48 -100 -2 -200 -20 -300 -40C500 10 400 60 300 70z;
            M321.39 56.19C228.15 68.75 114.41 79.4 0 60V120h1200V0c-99.28 38.57-208.64 49.84-314.81 48.41-109.03-1.46-219.09-18.14-327.73-35.33C451.81 0.94 386.2 45.17 321.39 56.19z"
        />
      </path>
    </svg>

    {/* Wave Layer 2 - slightly offset */}
    <svg
      className="absolute top-2 left-0 block w-[calc(100%+1.3px)] h-[100px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39 56.19C228.15 68.75 114.41 79.4 0 60V120h1200V0c-99.28 38.57-208.64 49.84-314.81 48.41-109.03-1.46-219.09-18.14-327.73-35.33C451.81 0.94 386.2 45.17 321.39 56.19z"
        fill="#ffffff"
        opacity="0.4"
      >
        <animate
          attributeName="d"
          dur="12s"
          repeatCount="indefinite"
          values="
            M321.39 56.19C228.15 68.75 114.41 79.4 0 60V120h1200V0c-99.28 38.57-208.64 49.84-314.81 48.41-109.03-1.46-219.09-18.14-327.73-35.33C451.81 0.94 386.2 45.17 321.39 56.19z;
            M290 66C190 88 90 90 0 72V120h1200V0c-98 36 -188 48 -288 47 -108 -1 -208 -20 -308 -38C440 8 360 54 290 66z;
            M321.39 56.19C228.15 68.75 114.41 79.4 0 60V120h1200V0c-99.28 38.57-208.64 49.84-314.81 48.41-109.03-1.46-219.09-18.14-327.73-35.33C451.81 0.94 386.2 45.17 321.39 56.19z"
        />
      </path>
    </svg>

    {/* Wave Layer 3 - very subtle and further offset */}
    <svg
      className="absolute top-4 left-0 block w-[calc(100%+1.3px)] h-[100px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39 56.19C228.15 68.75 114.41 79.4 0 60V120h1200V0c-99.28 38.57-208.64 49.84-314.81 48.41-109.03-1.46-219.09-18.14-327.73-35.33C451.81 0.94 386.2 45.17 321.39 56.19z"
        fill="#ffffff"
        opacity="0."
      >
        <animate
          attributeName="d"
          dur="14s"
          repeatCount="indefinite"
          values="
            M321.39 56.19C228.15 68.75 114.41 79.4 0 60V120h1200V0c-99.28 38.57-208.64 49.84-314.81 48.41-109.03-1.46-219.09-18.14-327.73-35.33C451.81 0.94 386.2 45.17 321.39 56.19z;
            M310 68C210 86 110 92 0 70V120h1200V0c-97 38 -190 52 -290 50 -102 -2 -202 -18 -302 -36C470 12 390 58 310 68z;
            M321.39 56.19C228.15 68.75 114.41 79.4 0 60V120h1200V0c-99.28 38.57-208.64 49.84-314.81 48.41-109.03-1.46-219.09-18.14-327.73-35.33C451.81 0.94 386.2 45.17 321.39 56.19z"
        />
      </path>
    </svg>
  </div>
</div>

<div className='h-24'>

</div>
    <AgentsHub/>
    <OurOffers/>
    <WhyUs/> 
   <YouNeedAnAgent/> 
     <HowTo />


    <FAQSection/> 

   <ContactForm/>
    </div>
  );
};

export default Home;