import { Route, Router, Routes } from "react-router";
import "./App.css";
import SignUp from "./pages/auth/signup";
import { Suspense } from "react";
import HomeLogoBanner from "./components/HomeLogoBanner";

function App() {
  return (
    <div className="w-[calc(100vw-1rem)] h-screen m-auto">
      <Suspense fallback={<HomeLogoBanner />}>
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
