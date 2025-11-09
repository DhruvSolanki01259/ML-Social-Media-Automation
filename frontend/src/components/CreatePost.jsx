import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Send } from "lucide-react";
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
    socialMedia: [],
    isScheduled: false,
    scheduledAt: "",
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [captionSuggestions, setCaptionSuggestions] = useState([]);
  const typingTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Tag input management
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Handle input updates
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "socialMedia") {
      setFormData((prev) => ({
        ...prev,
        socialMedia: checked
          ? [...prev.socialMedia, value]
          : prev.socialMedia.filter((sm) => sm !== value),
      }));
    } else if (type === "checkbox" && name === "isScheduled") {
      setFormData((prev) => ({
        ...prev,
        isScheduled: checked,
        scheduledAt: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Schedule date/time
  const handleScheduleChange = (key, value) => {
    setFormData((prev) => {
      const existing = prev.scheduledAt
        ? new Date(prev.scheduledAt)
        : new Date();
      if (key === "date") {
        const [year, month, day] = value.split("-");
        existing.setFullYear(year, month - 1, day);
      } else if (key === "time") {
        const [hours, minutes] = value.split(":");
        existing.setHours(hours, minutes);
      }
      return { ...prev, scheduledAt: existing.toISOString() };
    });
  };

  // Autocomplete suggestions (OpenAI)
  const fetchAutocomplete = async (text, field) => {
    if (!text.trim()) return;
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/openai/autocomplete`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: text, field }),
          signal: abortControllerRef.current.signal,
        }
      );
      const data = await res.json();
      if (data?.suggestions) {
        field === "title"
          ? setTitleSuggestions(data.suggestions)
          : setCaptionSuggestions(data.suggestions);
      }
    } catch (err) {
      if (err.name !== "AbortError") console.error("Autocomplete error:", err);
    }
  };

  const handleTyping = (text, field) => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(
      () => fetchAutocomplete(text, field),
      600
    );
  };

  // Suggestion click
  const handleSuggestionSelect = (field, suggestion) => {
    if (field === "title") {
      setFormData((prev) => ({ ...prev, title: suggestion }));
      setTitleSuggestions([]);
    } else {
      setFormData((prev) => ({ ...prev, description: suggestion }));
      setCaptionSuggestions([]);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and description are required.");
      setLoading(false);
      return;
    }

    const payload = { ...formData, tags };

    try {
      await createPost(payload);
      navigate("/content-studio");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      {...fadeUp(0)}
      className='min-h-screen bg-[#F8FAFC] flex justify-center items-center px-4 py-8'>
      <div className='w-full max-w-2xl bg-white border border-[#E2E8F0] shadow-lg rounded-2xl p-6 sm:p-8 overflow-y-auto'>
        {/* Header */}
        <h1 className='text-2xl sm:text-3xl font-bold text-[#012A4A] text-center mb-6'>
          Create New Post
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className='space-y-6'>
          {/* Title */}
          <div className='relative'>
            <label className='block text-sm text-[#6C757D] mb-2'>Title</label>
            <input
              type='text'
              name='title'
              placeholder='Enter post title'
              value={formData.title}
              onChange={(e) => {
                handleChange(e);
                handleTyping(e.target.value, "title");
              }}
              required
              className='w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[#013A63] bg-[#F9FAFB] focus:ring-2 focus:ring-[#2A6F97] focus:border-[#2A6F97]'
            />
            {titleSuggestions.length > 0 && (
              <div className='absolute bg-white border border-gray-200 rounded-lg mt-1 shadow-lg w-full z-50'>
                {titleSuggestions.map((s, i) => (
                  <div
                    key={i}
                    className='px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-[#013A63]'
                    onClick={() => handleSuggestionSelect("title", s)}>
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className='relative'>
            <label className='block text-sm text-[#6C757D] mb-2'>
              Description
            </label>
            <textarea
              name='description'
              placeholder='Write your post content...'
              rows={4}
              value={formData.description}
              onChange={(e) => {
                handleChange(e);
                handleTyping(e.target.value, "caption");
              }}
              required
              className='w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[#013A63] bg-[#F9FAFB] focus:ring-2 focus:ring-[#2A6F97] focus:border-[#2A6F97]'
            />
            {captionSuggestions.length > 0 && (
              <div className='absolute bg-white border border-gray-200 rounded-lg mt-1 shadow-lg w-full z-50'>
                {captionSuggestions.map((s, i) => (
                  <div
                    key={i}
                    className='px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-[#013A63]'
                    onClick={() => handleSuggestionSelect("caption", s)}>
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className='mb-2'>
            <label className='text-sm text-[#6C757D] font-medium'>Tags</label>
            <div className='flex flex-wrap gap-2 mt-2'>
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className='bg-[#A9D6E5] text-[#012A4A] px-3 py-1 rounded-full text-sm flex items-center gap-2'>
                  #{tag}
                  <button
                    type='button'
                    onClick={() => removeTag(i)}
                    className='text-xs hover:text-[#E63946]'>
                    ✕
                  </button>
                </span>
              ))}
              <input
                type='text'
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder='Press Enter to add tag'
                className='flex-1 min-w-[120px] px-3 py-1 rounded-xl border border-[#E2E8F0] bg-[#F9FAFB] focus:ring-2 focus:ring-[#2A6F97] text-[#013A63] outline-none'
              />
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label className='block text-sm text-[#6C757D] mb-2'>
              Platforms
            </label>
            <div className='flex flex-wrap gap-4'>
              {["Instagram", "Facebook", "LinkedIn", "Twitter"].map((sm) => (
                <label
                  key={sm}
                  className='flex items-center gap-2 text-[#013A63]'>
                  <input
                    type='checkbox'
                    name='socialMedia'
                    value={sm}
                    checked={formData.socialMedia.includes(sm)}
                    onChange={handleChange}
                  />
                  {sm}
                </label>
              ))}
            </div>
          </div>

          {/* Schedule */}
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
                  onChange={(e) => handleScheduleChange("date", e.target.value)}
                  className='w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 bg-[#F9FAFB] focus:ring-2 focus:ring-[#2A6F97] focus:border-[#2A6F97]'
                />
              </div>

              <div>
                <label className='block text-sm text-[#6C757D] mb-2 flex items-center gap-2'>
                  <Clock size={16} /> Time
                </label>
                <input
                  type='time'
                  onChange={(e) => handleScheduleChange("time", e.target.value)}
                  className='w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 bg-[#F9FAFB] focus:ring-2 focus:ring-[#2A6F97] focus:border-[#2A6F97]'
                />
              </div>
            </motion.div>
          )}

          {error && (
            <p className='text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded'>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className='flex items-center justify-center gap-2 w-full bg-[#01497C] text-white font-medium py-3 rounded-lg hover:bg-[#014F86] transition-all disabled:opacity-70'>
            {loading ? "Creating..." : "Create Post"}
            {!loading && <Send size={18} />}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreatePost;
