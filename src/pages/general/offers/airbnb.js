import React from "react";
import { Bot, BrainCircuit, FastForwardIcon, KeyRound, LockIcon, PhoneCall, UploadCloud} from 'lucide-react';
import AirbnbSolutionFlow from "./AirbnbSolution";
const Feature = ({ icon, title, description }) => (
  <li className="flex space-x-5 py-6 border-b border-cyan-700/30 last:border-0">
    <div className="text-cyan-400 text-4xl flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-cyan-300 text-2xl font-semibold tracking-wide mb-1">
        {title}
      </h3>
      <p className="text-gray-300 max-w-xl leading-relaxed text-base">
        {description}
      </p>
    </div>
  </li>
);

const AirbnbOfferSEO = () => {
  return (
    <section
      className="max-w-7xl mx-2 md:mx-4 xl:mx-auto p-2 md:p-8 lg:p-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl my-20 ring-2 ring-cyan-600/50"
      aria-labelledby="airbnb-offer-heading"
    >
      <header className="mb-12 text-center">
        <h1
          id="airbnb-offer-heading"
          className="text-5xl font-extrabold text-cyan-400 tracking-wide uppercase drop-shadow-lg"
        >
          Advanced AI-Powered Airbnb Hosting Solutions
        </h1>
        <p className="mt-4 text-cyan-300 max-w-3xl mx-auto text-lg font-light italic leading-relaxed">
          Transform your Airbnb hosting experience with our cutting-edge AI automation and compliance tools tailored specifically for Italian hospitality providers.
        </p>
      </header>

      <ul className="divide-y divide-cyan-700/40">
        <Feature
          icon={<PhoneCall className="w-6 h-6 text-blue-600" />}
          title="AI Agent Handling Incoming Guest Calls"
          description="Experience seamless guest communication 24/7 with our AI-powered virtual assistant. It understands and responds naturally to guest inquiries, booking requests, and support calls, reducing your operational overhead."
        />
        <Feature
          icon={<Bot className="w-6 h-6 text-blue-600" />}
          title="Intelligent Guest Assistance Throughout Their Stay"
          description="Our AI assistant provides real-time support during guests’ stays, answering questions, offering local recommendations, and troubleshooting issues instantly, enhancing guest satisfaction and boosting positive reviews."
        />
        <Feature
          icon={<KeyRound className="w-6 h-6 text-blue-600" />}
          title="Automated Booking Integration with Smart Lockers"
          description="Simplify access management with automated booking workflows integrated directly with smart locker systems. Whether fully automated or manually managed, streamline guest check-ins and security effortlessly."
        />
        <Feature
  icon={<KeyRound className="w-6 h-6 text-blue-600" />}
  title="No Smart Lockers? No Problem."
  description="Our intelligent automation seamlessly manages guest access — whether digital or manual — reducing your operational workload by over 90% and ensuring a smooth experience for every arrival."
/>
        <Feature
          icon={<UploadCloud className="w-6 h-6 text-blue-600" />}
          title="Digital Submission of Guest Documents to Italian Authorities"
          description="Ensure legal compliance by securely submitting guest identification data electronically to the Italian police website (Alloggiati Web), reducing manual paperwork and avoiding penalties."
        />

        <Feature
  icon={<BrainCircuit className="w-6 h-6 text-blue-600" />}
  title="AI-Powered Document Parsing & Compliance"
  description="Automatically extract and verify guest identity data from documents using advanced AI — instantly prepare and transmit required information to the Italian Police portal (Alloggiati Web), ensuring legal compliance with zero manual input."
/>
        <Feature
          icon={<FastForwardIcon className="w-6 h-6 text-blue-600" />}
          title="Automatic Guest Data Generation & Secure Upload"
          description="Our platform automatically compiles guest data in the required format for Italian police reporting, then securely uploads it, guaranteeing fast, error-free compliance with local regulations."
        />
        
<Feature
  icon={<LockIcon className="w-6 h-6 text-blue-600" />} // Modern, secure icon
  title="Advanced Security"
  description="Our platform follows industry-leading security standards to safeguard guest data, ensure GDPR compliance, and maintain full confidentiality across all digital touchpoints."
/>
      </ul>
      
    <AirbnbSolutionFlow/>
      




        <div className="w-full mx-auto mt-8 p-2 md:p-6 bg-green-700 text-white rounded-xl shadow-lg cursor-pointer hover:bg-green-600 transition"
          role="button"
          tabIndex={0}
          onClick={() => window.open('/airbnb/guest?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0X2lkIjoiTWFyaW8gQWlyYm5iIiwiYXBhcnRtZW50X2lkIjoiQVBULUdIRDM4MENHIiwiYm9va2luZ19pZCI6ImFpcmJuYi00MjM0MjMiLCJjaGVja2luIjoiMjAyNS0wNy0wMSIsImV4cCI6MTc1MTM2NzYwMCwiY2hlY2tvdXQiOiIyMDI1LTA3LTA3IiwibnVtYmVyX29mX2d1ZXN0cyI6NCwibW9kZSI6ImRvY3VtZW50c191cGxvYWQifQ.H7xrkmjirkTItMF80syHWcOKVj9t5DoBxV_U9ZIM42I', '_blank')}

        
          aria-label="Open the digital guest documents form on the Italian police website">
      <h2 className="text-xl font-semibold mb-2">Check out the Digital Guest Documents Form!</h2>
      <p className="text-cyan-200">
        Click here to open the digital form for allowing guest to upload their data digitally!
      </p>
    </div>

    <div>


    </div>

      <div className="mt-16 text-center">
        <a
          href='/contact'
          className="inline-block w-full text-center py-3 px-6 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-lg font-semibold hover:from-cyan-500 hover:to-teal-600 transition duration-300"
          
      
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default AirbnbOfferSEO;
