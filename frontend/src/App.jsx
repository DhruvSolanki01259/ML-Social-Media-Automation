import { Routes, Route } from "react-router-dom";

import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
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
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/login'
          element={<LogIn />}
        />
      </Routes>
    </div>
  );
};

export default App;
