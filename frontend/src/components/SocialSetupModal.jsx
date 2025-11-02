import { useState, useEffect } from "react";
import { X } from "lucide-react";

const SocialSetupModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [socials, setSocials] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });

  // Check if user has already filled at least one social (stored locally)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userSocials"));
    if (!saved || Object.values(saved).every((val) => val === "")) {
      setShowModal(true);
    }
  }, []);

  const handleChange = (e) => {
    setSocials({ ...socials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(socials).every((val) => val.trim() === "")) {
      alert("Please add at least one social handle.");
      return;
    }

    localStorage.setItem("userSocials", JSON.stringify(socials));
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#00000080] backdrop-blur-sm'>
      <div className='relative bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-8 border border-[#E2E8F0]'>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 text-[#6C757D] hover:text-[#012A4A] transition-colors'>
          <X size={22} />
        </button>

        {/* Modal Content */}
        <h2 className='text-2xl font-bold text-[#012A4A] mb-3 text-center'>
          Connect Your Socials
        </h2>
        <p className='text-[#013A63] text-sm text-center mb-6'>
          Add at least one social media username to start posting.
        </p>

        <form
          onSubmit={handleSubmit}
          className='space-y-4'>
          <div>
            <label className='block text-sm font-semibold text-[#013A63] mb-1'>
              Facebook Username
            </label>
            <input
              type='text'
              name='facebook'
              value={socials.facebook}
              onChange={handleChange}
              className='w-full border border-[#E2E8F0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#01497C]'
              placeholder='@username'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-[#013A63] mb-1'>
              Twitter Username
            </label>
            <input
              type='text'
              name='twitter'
              value={socials.twitter}
              onChange={handleChange}
              className='w-full border border-[#E2E8F0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#01497C]'
              placeholder='@username'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-[#013A63] mb-1'>
              LinkedIn Username
            </label>
            <input
              type='text'
              name='linkedin'
              value={socials.linkedin}
              onChange={handleChange}
              className='w-full border border-[#E2E8F0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#01497C]'
              placeholder='@username'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-[#013A63] mb-1'>
              Instagram Username
            </label>
            <input
              type='text'
              name='instagram'
              value={socials.instagram}
              onChange={handleChange}
              className='w-full border border-[#E2E8F0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#01497C]'
              placeholder='@username'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-[#01497C] text-white font-semibold py-2 rounded-lg mt-4 hover:bg-[#014F86] transition-all'>
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SocialSetupModal;
