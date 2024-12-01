import express from "express";
import { register, login, logout } from "../controllers/accountController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//get
// router.get("/profile/userdashboard", verifyToken, (req, res) => {
//   res.json({ message: "Đã có thể truy cập", user: req.user });
// });

export default router;
