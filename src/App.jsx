import { Route, Router, Routes } from "react-router";
import "./App.css";

import { Suspense } from "react";
import HomeLogoBanner from "./components/HomeLogoBanner";
import WelcomeSlider from "./pages/auth/WelcomeSlider";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="w-[calc(100vw-1rem)] h-screen m-auto">
      <Suspense fallback={<HomeLogoBanner />}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<WelcomeSlider />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </Provider>
        </QueryClientProvider>
      </Suspense>
    </div>
  );
}

export default App;
