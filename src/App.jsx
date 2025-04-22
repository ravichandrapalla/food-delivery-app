import { Route, Router, Routes } from "react-router";
import "./App.css";

import { Suspense } from "react";
import HomeLogoBanner from "./components/HomeLogoBanner";
import WelcomeSlider from "./pages/auth/WelcomeSlider";
import SignIn from "./pages/auth/SignIn";

function App() {
  return (
    <div className="w-[calc(100vw-1rem)] h-screen m-auto">
      <Suspense fallback={<HomeLogoBanner />}>
        <Routes>
          <Route path="/" element={<WelcomeSlider />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
