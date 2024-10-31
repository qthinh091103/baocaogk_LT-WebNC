import express from "express";
import dotenv from "dotenv/config";
import myDateTime from "./date";
import { getParamsURL, getPath } from "./getURL";
import viewEngine from "./src/configs/viewEngine";
import initWebRoute from "./src/routes/webRoute";
const app = express();
viewEngine(app);

const port = process.env.port;
app; // const ;
app.set("views", __dirname + "/src/views");
// app.get("/", (req, res) => {
//   res.send("Hello QThinh");
// });
initWebRoute(app);
app.listen(port, () => {
  console.log("Example app listening on port ${port}");
});
