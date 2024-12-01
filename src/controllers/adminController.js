// Đây là controller của admin.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../configs/db.js";

export const adminLogin = async (req, res) => {
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
        return res
          .status(401)
          .json({ message: "Không có tên đăng nhập này nha!" });
      }

      const user = results[0];

      // Check role
      if (user.role !== "admin") {
        return res.status(403).json({
          message: "Vai trò của bạn là user!",
        });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Sai mật khẩu rồi bạn ơi!" });
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

      res.cookie("auth_token", token, { httpOnly: true, maxAge: 3600000 });
      res.render("dashboard", { user });
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi!" });
  }
};

export const adminLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Lỗi khi đăng xuất!");
    }
    res.redirect("/admin");
  });
};

export const getUsers = (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách user:", err.message);
      return res.status(500).json({ message: "Lỗi lấy danh sách user!" });
    }

    res.render("listUser", { users: results });
  });
};

// Thêm
export const addUser = (req, res) => {
  const { username, email, password, fullname, phone, address, role } =
    req.body;

  if (
    !username ||
    !email ||
    !password ||
    !fullname ||
    !phone ||
    !address ||
    !role
  ) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi mã hóa mật khẩu!" });
    }

    const query =
      "INSERT INTO users (username, email, password, fullname, phone, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [username, email, hashedPassword, fullname, phone, address, role],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Lỗi khi thêm người dùng!" });
        }

        res.status(200).json({ message: "Thêm người dùng thành công!" });
      }
    );
  });
};

// Sửa
export const updateUser = (req, res) => {
  const { iduser } = req.params;
  const { username, email, password, fullname, phone, role } = req.body;

  const query = `
    UPDATE users SET username = ?, email = ?, password = ?, fullname = ?, phone = ?, address = ?, role = ? WHERE iduser = ?
  `;
  db.query(
    query,
    [username, email, password, fullname, phone, role, iduser],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Lỗi khi cập nhật người dùng!" });
      }
      res.redirect("/admin/listUser");
    }
  );
};

// Xóa
export const deleteUser = (req, res) => {
  const userId = req.params.id;

  const query = "DELETE FROM users WHERE iduser = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi xóa người dùng!" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }
    res.redirect("/admin/listUser");
  });
};
