import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "../src/pages/RegisterPage";
import LoginPage from "../src/pages/LoginPage";
import LogoutPage from "../src/pages/LogoutPage";
import UpdateProfile from "./components/UpdateProfile";
import HomePage from "./components/HomePage";
import UserDashboard from "./components/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={</>}/> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profileuser" element={<UserDashboard />} />
        <Route path="/Logout" element={<LogoutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
