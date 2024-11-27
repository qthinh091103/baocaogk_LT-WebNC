import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }
    axios
      .get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/login";
      });
  }, []);

  if (!user) {
    return <div>Đang xử lý</div>;
  }

  return (
    <div>
      <h2>Profile của {user.username}</h2>
      <p>Họ tên: {user.fullname}</p>
      <p>Email: {user.email}</p>
      <p>Vai trò: {user.role}</p>
    </div>
  );
};

export default ProfilePage;
