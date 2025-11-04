import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  Link2,
  UserPen,
  Trash2,
  PlusCircle,
  Settings2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" },
});

const Profile = () => {
  const navigate = useNavigate();
  const {
    user,
    logout,
    isLoading,
    updateUser,
    deleteUserField,
    socials,
    setSocials,
    saveProfileToBackend,
  } = useAuthStore();

  const [showSocialForm, setShowSocialForm] = useState(false);
  const [localSocials, setLocalSocials] = useState(socials);
  const [editMode, setEditMode] = useState(false);
  const [localProfile, setLocalProfile] = useState({
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
    profilePic: user?.profilePic || "",
  });

  // ✅ Save updated profile locally
  const handleProfileSave = async () => {
    await updateUser(localProfile);
    await saveProfileToBackend(); // sync backend
    setEditMode(false);
  };

  // ✅ Delete individual profile fields
  const handleDeleteField = async (field) => {
    await deleteUserField(field);
    setLocalProfile((prev) => ({ ...prev, [field]: "" }));
  };

  // ✅ Logout user
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // ✅ Normalize & save socials globally + backend
  const handleSocialSubmit = async (e) => {
    e.preventDefault();

    const normalized = Object.fromEntries(
      Object.entries(localSocials).map(([key, value]) => {
        if (!value) return [key, ""];
        const trimmed = value.trim();
        return [
          key,
          trimmed.startsWith("http") ? trimmed : `https://${trimmed}`,
        ];
      })
    );

    // ✅ Update Zustand store and sync backend
    Object.entries(normalized).forEach(([key, value]) =>
      setSocials(key, value)
    );

    await updateUser({ socials: normalized });
    await saveProfileToBackend();

    setShowSocialForm(false);
  };

  useEffect(() => {
    setLocalSocials(socials);
  }, [socials]);

  return (
    <section className='min-h-screen bg-[#F8FAFC] py-16 px-6 relative'>
      {/* Socials Form Modal */}
      {showSocialForm && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg'>
            <h3 className='text-2xl font-semibold text-[#012A4A] mb-3 text-center'>
              Manage Social Links
            </h3>
            <p className='text-sm text-[#6C757D] text-center mb-6'>
              Include{" "}
              <span className='text-[#01497C] font-medium'>https://</span>{" "}
              before URLs — we’ll add it automatically if missing.
            </p>

            <form
              onSubmit={handleSocialSubmit}
              className='space-y-4'>
              {Object.keys(localSocials).map((platform) => (
                <div key={platform}>
                  <label
                    htmlFor={platform}
                    className='block text-[#01497C] font-medium mb-1 capitalize'>
                    {platform} URL
                  </label>
                  <input
                    id={platform}
                    type='text'
                    placeholder={`https://${platform}.com/yourprofile`}
                    value={localSocials[platform] || ""}
                    onChange={(e) =>
                      setLocalSocials({
                        ...localSocials,
                        [platform]: e.target.value,
                      })
                    }
                    className='w-full border border-[#E2E8F0] rounded-lg px-4 py-2 focus:border-[#61A5C2] outline-none'
                  />
                </div>
              ))}
              <div className='flex justify-end gap-3 mt-6'>
                <button
                  type='button'
                  onClick={() => setShowSocialForm(false)}
                  className='border border-[#E2E8F0] text-[#6C757D] px-5 py-2 rounded-lg hover:text-[#012A4A]'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-[#01497C] text-white px-5 py-2 rounded-lg hover:bg-[#013A63] transition-all'>
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <motion.div
          {...fadeUp(0)}
          className='mb-12 text-center relative'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            <div className='text-center md:text-left'>
              <h1 className='text-4xl md:text-5xl font-bold text-[#012A4A]'>
                Welcome,{" "}
                <span className='text-[#01497C]'>
                  {user?.username || "User"}
                </span>
              </h1>
              <p className='text-[#013A63]/80 text-base md:text-lg mt-3'>
                Manage your profile, connect socials, and personalize your
                account.
              </p>
            </div>

            <button
              className='flex items-center gap-2 px-5 py-2 rounded-lg border border-[#01497C] text-[#01497C] font-medium hover:bg-[#01497C] hover:text-white transition-all'
              onClick={() => navigate("/create-post")}>
              <PlusCircle className='w-5 h-5' /> Create Post
            </button>
          </div>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          {...fadeUp(0.2)}
          className='relative bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md transition-all p-8 mb-16 flex flex-col md:flex-row items-center gap-8'>
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
            alt='User Profile'
            className='w-32 h-32 rounded-full border-4 border-[#61A5C2] object-cover shadow'
          />

          <div className='flex-1 text-center md:text-left relative w-full'>
            <div className='flex justify-between items-start'>
              <div>
                <h2 className='text-2xl font-semibold text-[#012A4A]'>
                  {user?.username}
                </h2>
                <p className='text-[#2A6F97] font-medium'>{user?.email}</p>
              </div>
            </div>

            {editMode ? (
              <div className='mt-4 space-y-3'>
                {["bio", "location", "website"].map((field) => (
                  <div
                    key={field}
                    className='flex items-center gap-2'>
                    <input
                      type='text'
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={localProfile[field]}
                      onChange={(e) =>
                        setLocalProfile({
                          ...localProfile,
                          [field]: e.target.value,
                        })
                      }
                      className='w-full border border-[#E2E8F0] rounded-lg px-4 py-2 text-[#012A4A] focus:border-[#61A5C2] outline-none'
                    />
                    <button
                      onClick={() => handleDeleteField(field)}
                      className='text-[#E63946] hover:scale-110 transition-transform'>
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                ))}

                <div className='flex gap-3 mt-4'>
                  <button
                    onClick={handleProfileSave}
                    className='bg-[#01497C] text-white px-5 py-2 rounded-lg hover:bg-[#013A63] transition-all'>
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className='border border-[#E2E8F0] text-[#6C757D] px-5 py-2 rounded-lg hover:text-[#012A4A]'>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className='mt-4 space-y-2'>
                <p className='text-[#6C757D]'>
                  {user?.bio || "No bio added yet."}
                </p>
                <p className='text-[#01497C]'>
                  📍 {user?.location || "Location not set"}
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
            )}

            {!editMode && (
              <div className='absolute bottom-0 right-0 mt-6'>
                <button
                  onClick={() => setEditMode(true)}
                  className='flex items-center gap-2 text-[#01497C] border border-[#01497C] px-4 py-1.5 rounded-lg hover:bg-[#01497C] hover:text-white transition-all'>
                  <UserPen className='w-4 h-4' /> Edit Profile
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Connected Socials */}
        <motion.div
          {...fadeUp(0.3)}
          className='bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md transition-all p-8 mb-16'>
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
              <Settings2 className='w-4 h-4' /> Manage
            </button>
          </div>

          <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-6'>
            {Object.entries(socials).map(([key, value]) => (
              <div
                key={key}
                className={`p-4 rounded-lg border text-center ${
                  value
                    ? "border-[#2ECC71] text-[#2ECC71] bg-[#2ECC71]/5"
                    : "border-[#E2E8F0] text-[#6C757D]"
                }`}>
                <span className='font-medium capitalize'>
                  {key}:{" "}
                  {value ? (
                    <a
                      href={value}
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

        {/* Uploaded Posts Section */}
        <motion.div
          {...fadeUp(0.4)}
          className='bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md transition-all p-8 mb-16'>
          <h3 className='text-xl font-semibold text-[#012A4A] mb-4'>
            Uploaded Posts
          </h3>
          <p className='text-[#6C757D] text-center'>No posts uploaded yet.</p>
        </motion.div>

        {/* Scheduled Posts Section */}
        <motion.div
          {...fadeUp(0.5)}
          className='bg-white border border-[#E2E8F0] rounded-2xl shadow-sm hover:shadow-md transition-all p-8'>
          <h3 className='text-xl font-semibold text-[#012A4A] mb-4'>
            Scheduled Posts
          </h3>
          <p className='text-[#6C757D] text-center'>No posts scheduled yet.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
