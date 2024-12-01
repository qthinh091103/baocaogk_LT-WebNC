// Đây là controller của user
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../configs/db.js";

export const register = async (req, res) => {
  const { username, password, email, fullname, phone, address } = req.body;

  if (!username || !password || !email || !fullname || !phone || !address) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  try {
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserQuery, [username], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi không thể tìm user" });
      }
      if (result.length > 0) {
        return res.status(400).json({ message: "Tên đăng nhập bị trùng lặp!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserQuery =
        "INSERT INTO users (username, password, email, fullname, phone, address) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(
        insertUserQuery,
        [username, hashedPassword, email, fullname, phone, address],
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Lỗi server không thể lưu" });
          }
          res.status(201).json({ message: "Đăng ký thành công!" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  try {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi truy vấn DB!" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Không có tên đăng nhập này!" });
      }

      const user = results[0];

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Mật khẩu không đúng!" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Đăng nhập thành công!",
        token,
        user: {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi!" });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: "Đăng xuất thành công!" });
};
