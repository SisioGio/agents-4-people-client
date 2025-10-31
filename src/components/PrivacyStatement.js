import React, { useState } from 'react';

const PrivacyStatement = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle the visibility of the privacy statement
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {/* Button to open the privacy statement */}
      <div className=" inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 w-full p-4">
        <div className="bg-white rounded-lg p-6  w-full md:w-3/4 lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="text-sm mb-4">Effective Date: May 5th, 2025</p>

          <p className="mb-4">
            At <strong>agents4people.com</strong>, we prioritize your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our services.
          </p>

          <h3 className="font-semibold mt-4">Information We Collect</h3>
          <p className="mb-4">
            We collect personal information such as your <strong>email address</strong> when you sign up or engage with our platform. This information is used to manage your account, provide services, and communicate with you.
          </p>
          <p className="mb-4">
            Additionally, we may collect certain technical details such as browser type, device type, and IP address, which are used to optimize our website’s functionality and improve user experience.
          </p>

          <h3 className="font-semibold mt-4">How We Use Your Information</h3>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Create and manage your account.</li>
            <li>Authenticate your login credentials.</li>
            <li>Send important notifications regarding your account, product updates, or other relevant information.</li>
          </ul>
          <p className="mb-4">We do <strong>not sell, rent, or lease</strong> your personal information to third parties. We do, however, use third-party services for analytics and functionality purposes that may collect additional information on our behalf.</p>

          <h3 className="font-semibold mt-4">Data Handling and Storage</h3>
          <p className="mb-4">
            Any documents or data you provide are stored temporarily and used solely for the purpose of the requested service. Once the process is complete, all data is immediately deleted. We do not retain any of your personal or transactional data after processing.
          </p>

          <h3 className="font-semibold mt-4">Cookies and Tracking Technologies</h3>
          <p className="mb-4">
            Our website may use cookies to enhance your experience. Cookies help us remember your preferences and improve the functionality of the site. You can control cookie settings through your browser, but please note that disabling cookies may impact certain features.
          </p>

          <h3 className="font-semibold mt-4">Security of Your Information</h3>
          <p className="mb-4">
            We employ robust security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no security system is 100% secure, and we cannot guarantee absolute protection of your data.
          </p>

          <h3 className="font-semibold mt-4">Your Rights</h3>
          <p className="mb-4">
            You have the following rights regarding your personal data:
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Request access to your personal data.</li>
            <li>Request correction or updating of your data.</li>
            <li>Request deletion of your account or data, subject to legal or contractual obligations.</li>
          </ul>
          <p className="mb-4">To exercise these rights, please contact us at <strong>alessio.giovannini@finbotix.de</strong>.</p>

          <h3 className="font-semibold mt-4">Third-Party Services</h3>
          <p className="mb-4">
            We may use third-party services, such as analytics and payment processing, which may collect information on our behalf. We are not responsible for their privacy practices, so we encourage you to review their privacy policies.
          </p>

          <h3 className="font-semibold mt-4">Changes to This Privacy Policy</h3>
          <p className="mb-4">
            We reserve the right to modify this Privacy Policy at any time. Any changes will be reflected on this page with an updated "Effective Date." We encourage you to review this policy periodically to stay informed about how we protect your personal data.
          </p>

          <h3 className="font-semibold mt-4">Contact Us</h3>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> alessio.giovannini@finbotix.de
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyStatement;
