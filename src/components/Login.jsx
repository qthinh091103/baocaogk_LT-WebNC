import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/account/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      setMessage("Đăng nhập thành công!");
      navigate("/userdashboard", { state: { user: response.data.user } });
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Đăng nhập thất bại!");
      } else if (error.request) {
        setMessage("Không thể kết nối đến server! Vui lòng thử lại.");
      } else {
        setMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Tên đăng nhập
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Đăng Nhập
          </button>
          <p className="text-center text-muted mt-1">
            Bạn chưa có tài khoản?{" "}
            <a href="/register" className="text-decoration-none">
              Đăng ký
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
