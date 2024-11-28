import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/account/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "Lỗi khi tải hồ sơ!");
      });
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Profile Của bạn nè</h2>

        {message && <div className="alert alert-danger">{message}</div>}

        {user ? (
          <div>
            <div className="mb-3">
              <strong>Tên người dùng: </strong> {user.username}
            </div>
            <div className="mb-3">
              <strong>Email: </strong> {user.email}
            </div>
            <div className="mb-3">
              <strong>Họ tên: </strong> {user.fullname}
            </div>
            <div className="mb-3">
              <strong>Số điện thoại: </strong> {user.phone}
            </div>
            <div className="mb-3">
              <strong>Địa chỉ: </strong> {user.address}
            </div>
            <div className="mb-3">
              <strong>Vai trò: </strong> {user.role}
            </div>
          </div>
        ) : (
          <div>Vui lòng đợi tải hồ sơ...</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
