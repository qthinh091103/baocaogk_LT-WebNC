import jwt from "jsonwebtoken";
import db from "../configs/db.js";

export const getProfile = (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Vui lòng đăng nhập!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const idUser = decoded.idUser;

    const query =
      "SELECT iduser, username, email, fullname, phone, address, role FROM users WHERE iduser = ?";
    db.query(query, [idUser], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Lỗi truy vấn DB!" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy người dùng!" });
      }

      res.status(200).json({ user: results[0] });
    });
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ!" });
  }
};
