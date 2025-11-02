import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Analytics from "./pages/Analytics";
import SocialSetupModal from "./components/SocialSetupModal";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/contact'
            element={<Contact />}
          />
          <Route
            path='/about-us'
            element={<About />}
          />
          <Route
            path='/analytics'
            element={<Analytics />}
          />
          <Route
            path='/signup'
            element={<SignUp />}
          />
          <Route
            path='/login'
            element={<LogIn />}
          />
        </Routes>
      </Layout>
      <SocialSetupModal />
    </>
  );
};

export default App;
