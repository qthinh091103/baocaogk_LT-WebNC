import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "../src/pages/RegisterPage";
import LoginPage from "../src/pages/LoginPage";
import UpdateProfile from "./components/UpdateProfile";
import HomePage from "./components/HomePage";
import Profile from "./router/Profile";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
