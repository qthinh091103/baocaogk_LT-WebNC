import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/routes/profile/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        setMessage(
          error.response?.data?.message || "Không thể tải thông tin người dùng"
        );
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/routes /profile/${userId}`,
        user
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      setMessage(error.response?.data?.message || "Cập nhật thất bại");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Thông tin người dùng</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Họ và tên
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Địa chỉ
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Cập nhật thông tin
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
