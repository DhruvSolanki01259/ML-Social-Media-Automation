import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../stores/post.store";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.3 },
});

const CreatePost = () => {
  const navigate = useNavigate();
  const { createPost } = usePostStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    socialMedia: [],
    isScheduled: false,
    scheduledAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "socialMedia") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev.socialMedia, value]
          : prev.socialMedia.filter((sm) => sm !== value);
        return { ...prev, socialMedia: updated };
      });
    } else if (type === "checkbox" && name === "isScheduled") {
      setFormData((prev) => ({ ...prev, isScheduled: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      };
      await createPost(payload);
      navigate("/content-studio");
    } catch (err) {
      setError(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      {...fadeUp(0)}
      className='min-h-screen bg-[#F8FAFC] px-6 py-10 flex justify-center'>
      <div className='w-full max-w-3xl bg-white shadow-md border border-[#E2E8F0] rounded-2xl p-8'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-[#012A4A]'>Create New Post</h1>
          <button
            onClick={() => navigate("/content-studio")}
            className='flex items-center gap-2 text-[#01497C] hover:text-[#012A4A] transition'>
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className='space-y-6'>
          {/* Title */}
          <div>
            <label className='block text-sm text-[#6C757D] mb-2'>Title</label>
            <input
              type='text'
              name='title'
              placeholder='Enter post title'
              value={formData.title}
              onChange={handleChange}
              required
              className='w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 
                text-[#013A63] bg-[#F9FAFB] focus:ring-2 focus:ring-[#2A6F97] focus:border-[#2A6F97]'
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm text-[#6C757D] mb-2'>
              Description
            </label>
            <textarea
              name='description'
              placeholder='Write your post content...'
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className='w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 
                text-[#013A63] bg-[#F9FAFB] focus:ring-2 focus:ring-[#2A6F97] focus:border-[#2A6F97]'
            />
          </div>

          {/* Tags */}
          <div>
            <label className='block text-sm text-[#6C757D] mb-2'>
              Tags (comma separated)
            </label>
            <input
              type='text'
              name='tags'
              placeholder='e.g. marketing, design, trends'
              value={formData.tags}
              onChange={handleChange}
              className='w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 
                text-[#013A63] bg-[#F9FAFB] focus:ring-2 focus:ring-[#2A6F97] focus:border-[#2A6F97]'
            />
          </div>

          {/* Social Media Platforms */}
          <div>
            <label className='block text-sm text-[#6C757D] mb-2'>
              Platforms
            </label>
            <div className='flex flex-wrap gap-4'>
              {["Instagram", "Facebook", "LinkedIn", "Twitter"].map((sm) => (
                <label
                  key={sm}
                  className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    name='socialMedia'
                    value={sm}
                    checked={formData.socialMedia.includes(sm)}
                    onChange={handleChange}
                  />
                  <span className='text-[#013A63]'>{sm}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Schedule Option */}
          <div className='flex items-center gap-3'>
            <input
              type='checkbox'
              name='isScheduled'
              checked={formData.isScheduled}
              onChange={handleChange}
            />
            <span className='text-[#013A63] font-medium'>
              Schedule this post
            </span>
          </div>

          {/* Date and Time Picker (Visible only if scheduled) */}
          {formData.isScheduled && (
            <motion.div
              {...fadeUp(0.1)}
              className='grid sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm text-[#6C757D] mb-2 flex items-center gap-2'>
                  <Calendar size={16} /> Date
                </label>
                <input
                  type='date'
                  name='date'
                  onChange={(e) => {
                    const date = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      scheduledAt: date
                        ? new Date(
                            date + "T" + (prev.time || "00:00")
                          ).toISOString()
                        : "",
                    }));
                  }}
                  className='w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 
                    text-[#013A63] bg-[#F9FAFB] focus:ring-2 focus:ring-[#2A6F97] focus:border-[#2A6F97]'
                />
              </div>
              <div>
                <label className='block text-sm text-[#6C757D] mb-2 flex items-center gap-2'>
                  <Clock size={16} /> Time
                </label>
                <input
                  type='time'
                  name='time'
                  onChange={(e) => {
                    const time = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      scheduledAt: prev.scheduledAt
                        ? new Date(
                            prev.scheduledAt.split("T")[0] + "T" + time
                          ).toISOString()
                        : "",
                    }));
                  }}
                  className='w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 
                    text-[#013A63] bg-[#F9FAFB] focus:ring-2 focus:ring-[#2A6F97] focus:border-[#2A6F97]'
                />
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <p className='text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded'>
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='flex items-center justify-center gap-2 w-full bg-[#01497C] text-white 
              font-medium py-3 rounded-lg hover:bg-[#014F86] transition-all disabled:opacity-70'>
            {loading ? "Creating..." : "Create Post"}
            {!loading && <Send size={18} />}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreatePost;
