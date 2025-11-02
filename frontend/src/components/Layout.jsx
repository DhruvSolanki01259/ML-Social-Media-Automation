import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen bg-[#F8FAFC] text-[#012A4A]'>
      <Header />

      {/* Main Content Area */}
      <main className='flex-grow pt-20 px-4 md:px-8 lg:px-16'>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
