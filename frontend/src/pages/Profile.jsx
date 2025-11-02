import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  BarChart3,
  UploadCloud,
  LogOut,
  PlusCircle,
  Link2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SocialSetupModal from "../components/SocialSetupModal"; // 👈 import modal here

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" },
});

const dummyUploadedPosts = [
  {
    id: 1,
    title: "New Product Launch 🚀",
    date: "2025-10-15",
    platform: "Instagram",
    image: "https://via.placeholder.com/400x250?text=Uploaded+Post+1",
  },
  {
    id: 2,
    title: "Behind the Scenes",
    date: "2025-10-10",
    platform: "Twitter",
    image: "https://via.placeholder.com/400x250?text=Uploaded+Post+2",
  },
];

const dummyScheduledPosts = [
  {
    id: 1,
    title: "Festive Offer Campaign 🎉",
    scheduledTime: "2025-11-05 10:30 AM",
    platform: "Facebook",
    image: "https://via.placeholder.com/400x250?text=Scheduled+Post+1",
  },
  {
    id: 2,
    title: "Customer Success Story 💬",
    scheduledTime: "2025-11-10 2:00 PM",
    platform: "LinkedIn",
    image: "https://via.placeholder.com/400x250?text=Scheduled+Post+2",
  },
];

const Profile = () => {
  const navigate = useNavigate();

  const [connectedSocials, setConnectedSocials] = useState({
    instagram: false,
    twitter: false,
    facebook: false,
    linkedin: false,
  });

  const [showModal, setShowModal] = useState(false); // 👈 state to control modal

  const handleConnect = (platform) => {
    setConnectedSocials((prev) => ({ ...prev, [platform]: !prev[platform] }));
  };

  const isAnySocialConnected = Object.values(connectedSocials).some(
    (val) => val
  );

  return (
    <section className='min-h-screen bg-[#F8FAFC] py-16 px-6 relative'>
      {/* 👇 Social Setup Modal */}
      {showModal && <SocialSetupModal onClose={() => setShowModal(false)} />}

      <div className='max-w-7xl mx-auto'>
        {/* 🌟 Header Section */}
        <motion.div
          {...fadeUp(0)}
          className='mb-12 text-center relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-[#A9D6E5]/20 to-[#E0F2FF]/30 blur-3xl rounded-full opacity-60 -z-10'></div>

          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            <div className='text-center md:text-left'>
              <h1 className='text-4xl md:text-5xl font-extrabold text-[#012A4A] leading-tight'>
                Welcome Back,{" "}
                <span className='bg-gradient-to-r from-[#01497C] to-[#61A5C2] bg-clip-text text-transparent'>
                  Dhruv
                </span>
              </h1>
              <p className='text-[#013A63]/80 text-base md:text-lg mt-3'>
                Manage your posts, connect socials, and track performance — all
                in one place.
              </p>
            </div>

            {/* ➕ Create Post Button */}
            <button
              disabled={!isAnySocialConnected}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                isAnySocialConnected
                  ? "bg-[#01497C] text-white hover:bg-[#014F86] hover:shadow-lg"
                  : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
              }`}>
              <PlusCircle className='w-5 h-5' /> Create Post
            </button>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className='h-1 mt-8 mx-auto bg-gradient-to-r from-[#01497C] to-[#61A5C2] rounded-full'></motion.div>
        </motion.div>

        {/* 🧑‍💼 Profile Info Card */}
        <motion.div
          {...fadeUp(0.2)}
          className='relative bg-white border border-[#E2E8F0] rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 p-10 mb-16 flex flex-col md:flex-row items-center gap-8'>
          {/* 🔘 Logout Button */}
          <button
            className='absolute top-5 right-5 text-[#6C757D] hover:text-[#E63946] transition-colors'
            title='Logout'>
            <LogOut className='w-5 h-5' />
          </button>

          <img
            src='https://via.placeholder.com/150x150.png?text=Profile'
            alt='User Profile'
            className='w-32 h-32 rounded-full border-4 border-[#61A5C2] object-cover shadow-lg'
          />
          <div className='text-center md:text-left'>
            <h2 className='text-2xl font-bold text-[#012A4A]'>Dhruv Solanki</h2>
            <p className='text-[#2A6F97] font-medium'>Content Strategist</p>
            <p className='text-[#6C757D] mt-3 max-w-md'>
              Enthusiastic creator and automation enthusiast. Passionate about
              optimizing social presence through data-driven strategies.
            </p>
          </div>
        </motion.div>

        {/* 🌐 Social Accounts Setup */}
        <motion.div
          {...fadeUp(0.3)}
          className='bg-white border border-[#E2E8F0] rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 p-10 mb-16'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <Link2 className='text-[#01497C] w-6 h-6' />
              <h3 className='text-2xl font-bold text-[#012A4A]'>
                Connected Social Accounts
              </h3>
            </div>
            {/* ⚙️ Manage / Update Button */}
            <button
              onClick={() => setShowModal(true)}
              className='text-[#01497C] font-semibold hover:text-[#014F86] transition-colors'>
              Manage
            </button>
          </div>

          <p className='text-[#6C757D] mb-6 text-sm md:text-base'>
            Connect at least one platform to start posting and scheduling
            content.
          </p>

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-6'>
            {[
              { name: "Instagram", key: "instagram" },
              { name: "Twitter", key: "twitter" },
              { name: "Facebook", key: "facebook" },
              { name: "LinkedIn", key: "linkedin" },
            ].map((social) => {
              const connected = connectedSocials[social.key];
              return (
                <button
                  key={social.key}
                  onClick={() => handleConnect(social.key)}
                  className={`p-4 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md font-semibold ${
                    connected
                      ? "bg-[#2ECC71]/10 border-[#2ECC71] text-[#2ECC71]"
                      : "bg-white border-[#E2E8F0] text-[#01497C] hover:border-[#61A5C2]"
                  }`}>
                  {connected ? "Connected ✓" : `Connect ${social.name}`}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 📤 Uploaded Posts */}
        <motion.div
          {...fadeUp(0.4)}
          className='mb-16'>
          <div className='flex items-center gap-3 mb-6'>
            <UploadCloud className='text-[#01497C] w-6 h-6' />
            <h3 className='text-2xl font-bold text-[#012A4A]'>
              Uploaded Posts
            </h3>
          </div>

          {dummyUploadedPosts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {dummyUploadedPosts.map((post) => (
                <motion.div
                  key={post.id}
                  {...fadeUp(0.1 * post.id)}
                  className='bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden'>
                  <img
                    src={post.image}
                    alt={post.title}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-6'>
                    <h4 className='text-lg font-bold text-[#012A4A] mb-2'>
                      {post.title}
                    </h4>
                    <p className='text-[#6C757D] text-sm'>
                      Posted on: {post.date}
                    </p>
                    <p className='text-[#2A6F97] text-sm mt-1'>
                      Platform: {post.platform}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className='text-[#6C757D] italic'>No uploaded posts yet.</p>
          )}
        </motion.div>

        {/* ⏰ Scheduled Posts */}
        <motion.div
          {...fadeUp(0.5)}
          className='mb-16'>
          <div className='flex items-center gap-3 mb-6'>
            <Clock className='text-[#01497C] w-6 h-6' />
            <h3 className='text-2xl font-bold text-[#012A4A]'>
              Scheduled Posts
            </h3>
          </div>

          {dummyScheduledPosts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {dummyScheduledPosts.map((post) => (
                <motion.div
                  key={post.id}
                  {...fadeUp(0.1 * post.id)}
                  className='bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden'>
                  <img
                    src={post.image}
                    alt={post.title}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-6'>
                    <h4 className='text-lg font-bold text-[#012A4A] mb-2'>
                      {post.title}
                    </h4>
                    <p className='text-[#6C757D] text-sm'>
                      Scheduled for: {post.scheduledTime}
                    </p>
                    <p className='text-[#2A6F97] text-sm mt-1'>
                      Platform: {post.platform}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className='text-[#6C757D] italic'>No scheduled posts yet.</p>
          )}
        </motion.div>

        {/* 📊 View Analytics Button */}
        <motion.div
          {...fadeUp(0.6)}
          className='flex justify-center mt-10'>
          <button
            onClick={() => navigate("/analytics")}
            className='flex items-center gap-2 bg-[#01497C] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#014F86] transition-all duration-300 shadow-md hover:shadow-lg'>
            <BarChart3 className='w-5 h-5' /> View Analytics
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
