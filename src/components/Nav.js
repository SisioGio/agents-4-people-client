import React, { useState } from "react";



const MainNav = () => {
 
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // Close the mobile menu when a link is clicked
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-50  border-b border-indigo-400/30 bg-metallic-blue">
  <div className="mx-auto flex justify-between items-center px-6 h-full max-w-7xl">
    {/* Logo */}
    <a
      href="/#home" 
      className="text-2xl font-bold text-white tracking-wide hover:opacity-80 transition duration-300"
    >
      Agents4People
    </a>

    {/* Mobile Menu Button */}
    <button
      className="xl:hidden text-white text-2xl focus:outline-none hover:text-indigo-500 transition"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle menu"
    >
      ☰
    </button>

    {/* Nav Links */}
    <ul
  className={`z-30 absolute xl:static top-20 left-0 w-full xl:w-auto px-6 py-4 xl:px-0 transition-all duration-300 ease-in-out transform
    ${isOpen ? 'block shadow-lg xl:shadow-none' : 'hidden xl:block'}
    bg-metallic-blue xl:bg-none xl:bg-transparent
    xl:flex xl:items-center xl:space-x-5`}
>
      {[
        { label: 'Home', href: '/#home' },
        { label: 'Why Us', href: '/#why-us' },
        { label: 'How it works', href: '/#how-to' },
    
        { label: 'FAQs', href: '/#faq' },
        { label: 'Contact Us', href: '/#contact' },
      ].map((item) => (
        <li
  key={item.label}
  className="py-2 px-3 hover:bg-indigo-600 rounded-md transition"
>
  <a
    href={item.href}
    onClick={handleLinkClick}
    className="text-white text-base font-medium  block w-full text-center"
  >
    {item.label}
  </a>
</li>

      ))}

  
    </ul>
  </div>
</nav>


  );
};

export default MainNav;
