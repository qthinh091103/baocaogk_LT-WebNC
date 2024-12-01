import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "baocaogk",
  multipleStatements: true,
});

// Kết nối đến DB
db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối đến MySQL:", err.message);
    return;
  }
  console.log("Kết nối MySQL thành công! ID kết nối:", db.threadId);
});

export default db;
