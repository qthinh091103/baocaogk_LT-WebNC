import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const handleLogout = () => {
    console.log("Đã đăng xuất");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <strong>T1</strong>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Trang Chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Đăng Nhập
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Đăng Ký
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                Đăng Xuất
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
