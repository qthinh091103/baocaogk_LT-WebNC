import express from "express";
import db from "../configs/db.js";

const router = express.Router();

router.get("/listuser", (req, res) => {
  // Truy vấn
  const query = "SELECT username, fullname, email, phone, address FROM users";
  db.query(query, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Lỗi server");
    }

    res.render("listUser", { rows });
  });
});

export default router;
