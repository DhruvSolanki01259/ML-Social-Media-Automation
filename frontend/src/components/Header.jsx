import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const APP_NAME = import.meta.env.VITE_APP_NAME || "Social Media Automation";
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Animation for nav tabs
  const tabAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15, // increased delay spacing
        duration: 0.5, // slower fade-in
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier easing
      },
    }),
  };

  return (
    <header
      className='w-full fixed top-0 left-0 z-30 
      bg-[#F8FAFC] border-b border-[#E2E8F0] 
      shadow-sm backdrop-blur-md'>
      <div className='max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4'>
        {/* 1. App Name / Logo */}
        <motion.h1
          onClick={() => handleNavigate("/")}
          className='text-2xl sm:text-3xl font-bold tracking-tight cursor-pointer select-none 
          text-[#012A4A]'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}>
          {APP_NAME}
        </motion.h1>

        {/* 2. Navigation Tabs */}
        <nav className='hidden md:flex items-center gap-8 text-[#013A63] font-medium'>
          {[
            { label: "About Us", path: "/about-us" },
            { label: "Contact", path: "/contact" },
            { label: "View Analytics", path: "/analytics" },
          ].map((tab, i) => (
            <motion.button
              key={tab.path}
              onClick={() => handleNavigate(tab.path)}
              custom={i}
              variants={tabAnimation}
              initial='hidden'
              animate='visible'
              className='relative group transition-all duration-300'>
              <span className='hover:text-[#01497C] transition-colors duration-300'>
                {tab.label}
              </span>
              {/* underline animation */}
              <span className='absolute left-0 bottom-[-4px] w-0 group-hover:w-full h-[2px] bg-[#01497C] transition-all duration-500 ease-in-out'></span>
            </motion.button>
          ))}
        </nav>

        {/* 3. Right Side Controls */}
        <div className='hidden md:flex items-center gap-4'>
          {/* Functional Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className='w-10 h-10 flex items-center justify-center rounded-full 
              bg-[#FFFFFF] border border-[#E2E8F0] 
              hover:bg-[#A9D6E5]/40 transition text-[#01497C]'
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            {isDarkMode ? (
              <Moon className='w-5 h-5' />
            ) : (
              <Sun className='w-5 h-5' />
            )}
          </motion.button>

          {/* Sign Up */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavigate("/signup")}
            transition={{ duration: 0.25 }}
            className='px-5 py-2 rounded-full font-semibold border-2 
              border-[#01497C] text-[#01497C] hover:bg-[#01497C] hover:text-[#FFFFFF] transition-all duration-400 ease-in-out'>
            Sign Up
          </motion.button>
        </div>

        {/* 4. Mobile Controls */}
        <div className='flex md:hidden items-center gap-2'>
          {/* Theme Toggle for Mobile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className='w-10 h-10 flex items-center justify-center rounded-full 
              bg-[#FFFFFF] border border-[#E2E8F0] 
              hover:bg-[#A9D6E5]/40 transition text-[#01497C]'
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            {isDarkMode ? (
              <Moon className='w-5 h-5' />
            ) : (
              <Sun className='w-5 h-5' />
            )}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='p-2 rounded-md hover:bg-[#E2E8F0]/50 
              text-[#013A63] transition'
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className='md:hidden bg-[#FFFFFF] border-t border-[#E2E8F0] shadow-md'>
            <div className='flex flex-col px-6 py-4 space-y-3 text-[#013A63] font-medium'>
              {[
                { label: "About Us", path: "/about-us" },
                { label: "Contact", path: "/contact" },
                { label: "View Analytics", path: "/analytics" },
              ].map((tab, i) => (
                <motion.button
                  key={tab.path}
                  onClick={() => handleNavigate(tab.path)}
                  custom={i}
                  variants={tabAnimation}
                  initial='hidden'
                  animate='visible'
                  className='text-left rounded-md px-3 py-2 hover:bg-[#A9D6E5]/25 transition-all duration-300'>
                  {tab.label}
                </motion.button>
              ))}

              <motion.button
                onClick={() => handleNavigate("/signup")}
                custom={4}
                variants={tabAnimation}
                initial='hidden'
                animate='visible'
                className='px-5 py-2 rounded-md border-2 
                  border-[#01497C] text-[#01497C] hover:bg-[#01497C] hover:text-[#FFFFFF] transition-all duration-400 ease-in-out text-center'>
                Sign Up
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
