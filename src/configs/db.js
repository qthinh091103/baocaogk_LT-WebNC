import mysql from "mysql2";
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "ltwebnc",
  password: "",
});
const connection = pool.promise();
export default connection;
