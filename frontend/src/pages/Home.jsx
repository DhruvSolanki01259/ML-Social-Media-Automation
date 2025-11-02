import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Calendar,
  BarChart3,
  Share2,
  Instagram,
  Twitter,
  Linkedin,
  CheckCircle,
  XCircle,
} from "lucide-react";
import socialData from "../stores/socialData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" },
});

const Home = () => {
  // 🧩 Mock socials (replace with context or API later)
  const socials = socialData;
  const allConnected = socials.every((s) => s.connected);

  // Map icon names dynamically
  const icons = {
    Instagram,
    Twitter,
    Linkedin,
  };

  return (
    <section className='bg-[#F8FAFC] text-[#012A4A] min-h-screen overflow-hidden'>
      {/* 🌟 Hero Section */}
      <div className='max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-16'>
        {/* Left - Text */}
        <motion.div
          {...fadeUp(0)}
          className='flex-1 text-center lg:text-left max-w-2xl'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight'>
            Automate. Schedule.{" "}
            <span className='bg-gradient-to-r from-[#01497C] to-[#61A5C2] bg-clip-text text-transparent'>
              Grow Smarter.
            </span>
          </h1>
          <p className='text-[#013A63]/80 mt-6 text-base sm:text-lg max-w-xl mx-auto lg:mx-0'>
            Simplify your social media strategy with real-time insights,
            AI-powered scheduling, and automated performance tracking — all in
            one seamless dashboard.
          </p>

          <div className='flex flex-wrap justify-center lg:justify-start gap-4 mt-10'>
            <button
              onClick={() => (window.location.href = "/profile")}
              className='bg-[#01497C] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#014F86] shadow-md transition-all duration-300'>
              Get Started
            </button>
            <button className='border border-[#01497C] text-[#01497C] px-8 py-3 rounded-xl font-semibold hover:bg-[#E0F2FF] transition-all duration-300'>
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Right - Animated Hero Visualization */}
        <motion.div
          {...fadeUp(0.3)}
          className='flex-1 relative w-full max-w-sm sm:max-w-md lg:max-w-lg h-[300px] sm:h-[340px] lg:h-[400px] mx-auto lg:mx-0'>
          {/* Background Glow */}
          <div className='absolute inset-0 w-full h-full bg-gradient-to-r from-[#A9D6E5]/40 to-[#E0F2FF]/50 blur-3xl rounded-full -z-10'></div>

          {/* Floating Dashboard Cards */}
          <div className='relative w-full h-full flex flex-col items-center justify-center'>
            {/* Main Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className='bg-white border border-[#E2E8F0] rounded-3xl shadow-xl p-6 w-full max-w-xs sm:max-w-sm z-20'>
              <h3 className='text-lg font-semibold text-[#012A4A] mb-3 flex items-center gap-2'>
                <Calendar className='text-[#01497C] w-5 h-5' />
                Scheduled Post
              </h3>
              <div className='bg-[#F1F5F9] rounded-xl p-3'>
                <p className='text-[#013A63] text-sm font-medium'>
                  "Product Launch Tomorrow 🚀"
                </p>
                <p className='text-[#6C757D] text-xs mt-1'>
                  Scheduled for 10:30 AM
                </p>
              </div>
            </motion.div>

            {/* Analytics Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className='absolute top-[-40px] right-[-40px] bg-white border border-[#E2E8F0] rounded-2xl shadow-lg p-4 w-[150px] sm:w-[180px]'>
              <h4 className='flex items-center gap-2 text-sm font-semibold text-[#012A4A] mb-2'>
                <BarChart3 className='w-4 h-4 text-[#01497C]' />
                Analytics
              </h4>
              <div className='h-16 bg-gradient-to-t from-[#A9D6E5] to-[#61A5C2] rounded-lg relative overflow-hidden'>
                <motion.div
                  className='absolute bottom-0 left-0 right-0 bg-[#01497C]'
                  animate={{ height: ["40%", "80%", "50%"] }}
                  transition={{ repeat: Infinity, duration: 3 }}></motion.div>
              </div>
            </motion.div>

            {/* Dynamic Socials Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
                delay: 1,
              }}
              className='absolute bottom-[-40px] left-[-40px] bg-white border border-[#E2E8F0] rounded-2xl shadow-lg p-4 w-[180px] sm:w-[200px]'>
              <h4 className='text-sm font-semibold text-[#012A4A] mb-2 flex items-center gap-1'>
                {allConnected ? (
                  <>
                    <CheckCircle className='text-[#2ECC71] w-4 h-4' />
                    <span>All Connected</span>
                  </>
                ) : (
                  <>
                    <XCircle className='text-[#E63946] w-4 h-4' />
                    <span>Not Connected</span>
                  </>
                )}
              </h4>

              <div className='flex items-center gap-3 mt-2'>
                {socials.map((social) => {
                  const Icon = icons[social.icon];
                  return (
                    <Icon
                      key={social.id}
                      className={`w-5 h-5 transition-all ${
                        social.connected
                          ? ""
                          : "opacity-30 grayscale cursor-not-allowed"
                      }`}
                      style={{ color: social.color }}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 💎 Features Section */}
      <motion.div
        {...fadeUp(0.5)}
        className='max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
        {[
          {
            icon: <Zap className='text-[#01497C] w-8 h-8' />,
            title: "Smart Automation",
            desc: "AI-driven scheduling and optimized posting times for maximum reach.",
          },
          {
            icon: <Calendar className='text-[#01497C] w-8 h-8' />,
            title: "Content Planner",
            desc: "Organize, visualize, and plan your content calendar effortlessly.",
          },
          {
            icon: <BarChart3 className='text-[#01497C] w-8 h-8' />,
            title: "Analytics Dashboard",
            desc: "Get deep insights on engagement, growth, and performance trends.",
          },
          {
            icon: <Share2 className='text-[#01497C] w-8 h-8' />,
            title: "Cross-Platform Posting",
            desc: "Post across Instagram, Twitter, and LinkedIn in one click.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            {...fadeUp(0.1 * i)}
            className='bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300'>
            <div className='mb-4'>{feature.icon}</div>
            <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
            <p className='text-[#6C757D] text-sm'>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 🚀 CTA Section */}
      <motion.div
        {...fadeUp(0.6)}
        className='relative bg-gradient-to-r from-[#01497C] to-[#61A5C2] text-white py-20 px-6 text-center rounded-[2.5rem] mx-6 my-24 shadow-lg overflow-hidden'>
        <div className='absolute inset-0 bg-white/10 backdrop-blur-sm'></div>

        <div className='relative z-10'>
          <h2 className='text-3xl md:text-4xl font-bold mb-6'>
            Ready to Elevate Your Social Media Game?
          </h2>
          <p className='text-[#E0F2FF]/90 mb-4 max-w-2xl mx-auto text-lg'>
            Join thousands of creators and brands automating their social growth
            — it’s{" "}
            <span className='font-semibold text-white'>
              100% Free (for now)
            </span>{" "}
            🎉
          </p>

          <div className='flex flex-wrap justify-center gap-4 mt-10'>
            <button
              onClick={() => (window.location.href = "/profile")}
              className='bg-white text-[#01497C] px-8 py-3 rounded-xl font-semibold hover:bg-[#E0F2FF] transition-all duration-300 shadow-md hover:shadow-lg'>
              Get Started
            </button>
            <button className='border border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300'>
              See Demo
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
