import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User, Loader, Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import Input from "../components/Input";
import GenderCheckbox from "../components/GenderCheckbox";
import { useAuthStore } from "../stores/authStore";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const { signup, isLoading, error } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(username, email, password, gender);
      navigate("/profile");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  const handleSocialSignUp = (provider) => {
    console.log(`Signup with ${provider} clicked`);
    // OAuth endpoints.
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-10'>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='flex w-full max-w-6xl bg-white rounded-2xl shadow-lg border border-[#E2E8F0] overflow-hidden'>
        {/* Left Side: Signup Form */}
        <div className='w-full md:w-1/2 flex justify-center items-center p-8 md:p-10'>
          <div className='w-full max-w-lg'>
            <h2 className='text-3xl font-bold text-center mb-6 text-[#012A4A]'>
              Create Your Account
            </h2>

            <form
              onSubmit={handleSignUp}
              className='space-y-4'>
              <Input
                icon={User}
                type='text'
                placeholder='Enter your Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                icon={Mail}
                type='email'
                placeholder='Enter your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                icon={Lock}
                type='password'
                placeholder='Enter your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <GenderCheckbox
                selectedGender={gender}
                onCheckboxChange={setGender}
              />

              {error && (
                <p className='text-[#E63946] text-sm font-medium text-center'>
                  {error}
                </p>
              )}

              <PasswordStrengthMeter password={password} />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type='submit'
                disabled={isLoading}
                className='mt-5 w-full py-3 px-4 font-semibold rounded-lg shadow-md transition-all duration-300 bg-[#01497C] hover:bg-[#014F86] text-white'>
                {isLoading ? (
                  <Loader className='w-5 h-5 animate-spin mx-auto' />
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className='flex items-center my-6'>
              <hr className='flex-grow border-[#E2E8F0]' />
              <span className='mx-3 text-sm text-[#6C757D]'>
                or continue with
              </span>
              <hr className='flex-grow border-[#E2E8F0]' />
            </div>

            {/* Social Buttons */}
            <div className='flex gap-4 justify-center'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialSignUp("Google")}
                className='flex items-center gap-2 px-5 py-2.5 border border-[#E2E8F0] rounded-lg text-[#013A63] hover:bg-[#F1F5F9] transition'>
                <FcGoogle className='w-5 h-5' />
                Google
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialSignUp("GitHub")}
                className='flex items-center gap-2 px-5 py-2.5 border border-[#E2E8F0] rounded-lg text-[#013A63] hover:bg-[#F1F5F9] transition'>
                <Github className='w-5 h-5 text-[#2A6F97]' />
                GitHub
              </motion.button>
            </div>

            {/* Login Redirect */}
            <div className='mt-6 text-center'>
              <p className='text-sm text-[#6C757D]'>
                Already have an account?{" "}
                <Link
                  to='/login'
                  className='text-[#01497C] font-medium hover:underline'>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Image Section */}
        <div className='hidden md:flex md:w-1/2 flex-col items-center justify-center p-10 bg-[#F1F5F9] border-l border-[#E2E8F0]'>
          <img
            src='/signup-image.png'
            alt='Sign Up'
            className='w-128 h-128 object-contain mb-6'
          />
          <h3 className='text-3xl font-bold text-[#012A4A] mb-2 text-center'>
            Automate Your Social Growth
          </h3>
          <p className='text-[#013A63]/80 text-center text-base'>
            Simplify your social media workflow and let automation handle the
            posting.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
