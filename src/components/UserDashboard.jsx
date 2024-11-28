import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateProfile from "./UpdateProfile";

function UserDashbroad() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Bạn cần đăng nhập để xem thông tin.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải thông tin người dùng.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2>Thông tin người dùng</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Tên đăng nhập</th>
            <td>{user.username}</td>
          </tr>
          <tr>
            <th>Họ tên</th>
            <td>{user.fullname}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>Số điện thoại</th>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <th>Địa chỉ</th>
            <td>{user.address}</td>
          </tr>
        </tbody>
      </table>
      <a href="/UpdateProfile" className="btn btn-primary">
        Cập nhật thông tin
      </a>
    </div>
  );
}

export default UserDashbroad;
