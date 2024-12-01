// Router admin
import express from "express";
import db from "../configs/db.js";
import { adminLogin, adminLogout } from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/adminController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("adminLogin");
});
router.get("/dashboard", verifyAdmin, (req, res) => {
  res.render("dashboard", { user: req.user });
});
router.get("/logout", (req, res) => {
  res.clearCookie("auth_token");
  res.redirect("/admin");
});
router.get("/listUser/update/:idUser", (req, res) => {
  const userId = req.params.idUser;

  const query = "SELECT * FROM users WHERE iduser = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err.message);
      return res.status(500).send("Lỗi truy vấn cơ sở dữ liệu!");
    }
    if (results.length === 0) {
      console.warn("Không tìm thấy người dùng với id:", userId);
      return res.status(404).send("Không tìm thấy người dùng!");
    }

    console.log("Dữ liệu người dùng:", results[0]);
    res.render("updateUser", { user: results[0] });
  });
});

router.post("/", adminLogin);
router.post("/adminLogin", adminLogin);
router.post("/adminLogout", verifyAdmin, adminLogin);

// Quản lý user
router.get("/listUser", verifyAdmin, getUsers);
router.post("/listUser/delete/:id", deleteUser);
router.post("/listUser/add", addUser);
router.post("/listUser/update/:idUser", (req, res) => {
  const userId = req.params.idUser;
  const { username, email, fullname, phone, address, role } = req.body;

  const query = `
    UPDATE users
    SET username = ?, email = ?, fullname = ?, phone = ?, address = ?, role = ?
    WHERE iduser = ?
  `;
  db.query(
    query,
    [username, email, fullname, phone, address, role, userId],
    (err, results) => {
      if (err) {
        return res.status(500).send("Cập nhật thông tin bị lỗi rồi...");
      }

      res.redirect("/admin/listUser");
    }
  );
});

export default router;
