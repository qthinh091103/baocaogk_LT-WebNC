import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutFrom = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");

    navigate("/login");
  }, [navigate]);

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Đợi xíu nha... </h2>
      </div>
    </div>
  );
};

export default LogoutFrom;
