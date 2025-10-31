import {
  CalendarDays,
  Mail,
  UploadCloud,
  Bot,
  Map,
  AlertTriangle,
  ThumbsUp
} from 'lucide-react';

const steps = [
  {
    title: 'Booking Captured Automatically',
    icon: CalendarDays,
    description:
      'Booking data (dates, guests, contact info) is pulled directly from Airbnb. A unique access PIN is generated for guests and cleaning staff.'
  },
  {
    title: 'Pre-Check-In Notification Sent',
    icon: Mail,
    description:
      '24 hours before check-in, guests receive an email with house rules, access details, and a secure link to upload ID documents.'
  },
  {
    title: 'Guest Document Upload',
    icon: UploadCloud,
    description:
      'Guests securely upload ID documents, which are verified and submitted to the Italian police (Alloggiati Web) or the host automatically.'
  },
  {
    title: 'AI Guest Support Activated',
    icon: Bot,
    description:
      'Our AI assistant supports the guest before and during their stay, answers questions, and shares useful resources via chat or phone.'
  },
  {
    title: 'Local Recommendations',
    icon: Map,
    description:
      'Guests can ask for tailored suggestions — restaurants, events, attractions — creating a memorable, localized experience.'
  },
  {
    title: 'Emergency Assistance',
    icon: AlertTriangle,
    description:
      'In emergencies, the assistant offers immediate help, contacts the host, and coordinates responses for lost keys or tech issues.'
  },
  {
    title: 'Host Benefits Delivered',
    icon: ThumbsUp,
    description:
      'All of this reduces your workload by over 90%, improves compliance, enhances guest satisfaction, and increases 5-star reviews.'
  }
];

const AirbnbSolutionFlow = () => {
  return (
    <section className="relative px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-4xl font-extrabold text-cyan-400 text-center mb-16 uppercase tracking-wider">
          How Our Airbnb Solution Works
        </h2>
        <div className="relative border-l-4 border-cyan-600/30 pl-6 space-y-16">
          {steps.map(({ title, icon: Icon, description }, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[30px] top-1.5 flex items-center justify-center w-10 h-10 bg-cyan-700 rounded-full shadow-lg ring-2 ring-cyan-400">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-cyan-500/10 transition">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AirbnbSolutionFlow;
