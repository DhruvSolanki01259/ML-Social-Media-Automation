import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";

const App = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("visited");
    if (!hasVisited) {
      setShowSplash(true);
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  return (
    <AnimatePresence mode='wait'>
      {showSplash ? (
        <motion.div
          key='splash'
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}>
          <SplashScreen onComplete={() => setShowSplash(false)} />
        </motion.div>
      ) : (
        <motion.div
          key='app'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}>
          <Layout>
            <Routes>
              {/* ✅ Public Routes (accessible to all users) */}
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/about-us'
                element={<About />}
              />
              <Route
                path='/contact'
                element={<Contact />}
              />

              <Route
                path='/login'
                element={<LogIn />}
              />
              <Route
                path='/signup'
                element={<SignUp />}
              />

              {/* ✅ Protected Routes (login required) */}
              <Route
                path='/profile'
                element={<Profile />}
              />
              <Route
                path='/analytics'
                element={<Analytics />}
              />
              <Route
                path='/create-post'
                element={<CreatePost />}
              />

              {/* ❌ Catch-all 404 */}
              <Route
                path='*'
                element={<NotFound />}
              />
            </Routes>
          </Layout>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
