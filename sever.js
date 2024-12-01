import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./src/configs/db.js";
import initWebRoute from "./src/routes/webRoute";
import accountController from "./src/controllers/accountController.js";
import accountRoutes from "./src/routes/accountRoutes.js";
import profileRoutes from "./src/routes/profileRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import listUserRoutes from "./src/routes/listuserRoutes.js";
import path from "path";
import cookieParser from "cookie-parser";
import router from "./src/routes/accountRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use((req, res, next) => {
  console.log(
    `Kết nối thành công - ID: ${db.threadId} - URL: ${req.originalUrl}`
  );
  next();
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi truy vấn DB" });
    }
    res.status(200).json(results);
  });
});

app.use("/admin", adminRoutes);
app.use("/user", profileRoutes);
app.use("/account", accountRoutes);
app.use("/profile", profileRoutes);

app.listen(port, () => {
  console.log(`Server của bạn http://localhost:${port}`);
});
