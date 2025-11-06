import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  UserPen,
  PlusCircle,
  Link2,
  Settings2,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const Profile = () => {
  const navigate = useNavigate();

  const isLoading = false;
  const user = { username: "Dhruv Solanki", email: "dhruvsolanki0129" };

  const [editMode, setEditMode] = useState(false);
  const [showSocialForm, setShowSocialForm] = useState(false);
  const [localProfile, setLocalProfile] = useState({
    bio: "",
    location: "",
    website: "",
    profilePic: "",
  });
  const [socials, setSocials] = useState({
    instagram: "",
    twitter: "",
    linkedin: "",
    facebook: "",
  });

  // ✅ Logout handler
  const handleLogout = async () => {
    // Logout
  };

  const handleProfileSave = () => {
    setEditMode(false);
  };

  return (
    <section className='min-h-screen bg-[#F8FAFC] py-16 px-6'>
      <div className='max-w-7xl mx-auto space-y-16'>
        {/* === HEADER SECTION === */}
        <motion.div
          {...fadeUp(0)}
          className='flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='text-center md:text-left'>
            <h1 className='text-4xl md:text-5xl font-bold text-[#012A4A]'>
              Welcome,{" "}
              <span className='text-[#01497C]'>{user?.username || "User"}</span>
            </h1>
            <p className='text-[#013A63]/80 text-base md:text-lg mt-3'>
              Manage your profile, posts, and connected accounts.
            </p>
          </div>

          {/* ✅ Create Post Button */}
          <button
            onClick={() => navigate("/create-post")}
            className='flex items-center gap-2 px-5 py-2 rounded-lg border border-[#01497C] text-[#01497C] font-medium hover:bg-[#01497C] hover:text-white transition-all'>
            <PlusCircle className='w-5 h-5' />
            Create Post
          </button>
        </motion.div>

        {/* === PROFILE INFO CARD === */}
        <motion.div
          {...fadeUp(0.2)}
          className='relative bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md transition-all p-8 flex flex-col md:flex-row items-center gap-8'>
          {/* ✅ Logout button */}
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className='absolute top-5 right-5 text-[#6C757D] hover:text-[#E63946] transition-colors'>
            <LogOut className='w-5 h-5' />
          </button>

          <img
            src={
              localProfile.profilePic ||
              `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                user?.username || "User"
              )}`
            }
            alt='Profile'
            className='w-32 h-32 rounded-full border-4 border-[#61A5C2] object-cover shadow'
          />

          {/* === USER DETAILS === */}
          <div className='flex-1 text-center md:text-left relative w-full'>
            <h2 className='text-2xl font-semibold text-[#012A4A]'>
              {user?.username}
            </h2>
            <p className='text-[#2A6F97] font-medium'>{user?.email}</p>

            <div className='mt-4 space-y-2'>
              <p className='text-[#6C757D]'>
                {user?.bio || "No bio added yet."}
              </p>
              <p className='text-[#01497C] flex items-center justify-center md:justify-start gap-1'>
                <MapPin className='w-4 h-4' />
                {user?.location || "Location not set"}
              </p>
              {user?.website && (
                <a
                  href={user.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#2A6F97] hover:underline block'>
                  🌐 {user.website}
                </a>
              )}
            </div>

            {/* ✅ Edit Profile Button moved to bottom right */}
            <div className='mt-6 flex justify-center md:justify-end'>
              <button
                onClick={() => setEditMode(true)}
                className='flex items-center gap-2 text-[#01497C] border border-[#01497C] px-4 py-1.5 rounded-lg hover:bg-[#01497C] hover:text-white transition-all'>
                <UserPen className='w-4 h-4' />
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>

        {/* === CONNECTED SOCIALS SECTION === */}
        <motion.div
          {...fadeUp(0.3)}
          className='bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md transition-all p-8'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <Link2 className='text-[#01497C] w-6 h-6' />
              <h3 className='text-xl font-semibold text-[#012A4A]'>
                Connected Social Accounts
              </h3>
            </div>

            <button
              onClick={() => setShowSocialForm(true)}
              className='flex items-center gap-2 border border-[#01497C] text-[#01497C] px-4 py-1.5 rounded-lg hover:bg-[#01497C] hover:text-white transition-all'>
              <Settings2 className='w-4 h-4' />
              Manage
            </button>
          </div>

          <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-6'>
            {Object.entries(socials).map(([platform, link]) => (
              <div
                key={platform}
                className={`p-4 rounded-lg border text-center ${
                  link
                    ? "border-[#2ECC71] text-[#2ECC71] bg-[#2ECC71]/5"
                    : "border-[#E2E8F0] text-[#6C757D]"
                }`}>
                <span className='font-medium capitalize'>
                  {platform}:{" "}
                  {link ? (
                    <a
                      href={link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='underline hover:text-[#27AE60]'>
                      Connected
                    </a>
                  ) : (
                    "Not Connected"
                  )}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* === UPLOADED POSTS === */}
        <motion.div
          {...fadeUp(0.4)}
          className='bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md transition-all p-8'>
          <h3 className='text-xl font-semibold text-[#012A4A] mb-6'>
            Uploaded Posts
          </h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {[1, 2, 3, 4, 5, 6].map((post) => (
              <div
                key={post}
                className='border border-[#E2E8F0] rounded-lg p-4 hover:shadow transition-all'>
                <img
                  src={`https://picsum.photos/300/200?random=${post}`}
                  alt='Post'
                  className='rounded-lg mb-3'
                />
                <p className='text-[#012A4A] font-medium'>Post #{post}</p>
                <p className='text-[#6C757D] text-sm'>Uploaded recently</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* === SCHEDULED POSTS === */}
        <motion.div
          {...fadeUp(0.5)}
          className='bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md transition-all p-8'>
          <h3 className='text-xl font-semibold text-[#012A4A] mb-6'>
            Scheduled Posts
          </h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {[1, 2, 3].map((post) => (
              <div
                key={post}
                className='border border-[#E2E8F0] rounded-lg p-4 hover:shadow transition-all'>
                <img
                  src={`https://picsum.photos/300/200?blur=2&random=${
                    post + 10
                  }`}
                  alt='Scheduled'
                  className='rounded-lg mb-3'
                />
                <p className='text-[#012A4A] font-medium'>Scheduled #{post}</p>
                <p className='text-[#6C757D] text-sm'>
                  Scheduled for 2025-11-10
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
