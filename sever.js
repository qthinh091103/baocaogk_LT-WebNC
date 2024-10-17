import express from "express";
import dotenv from "dotenv/config";
import myDateTime from "./date";
import { getParamsURL, getPath } from "./getURL";
import viewEngine from "./viewEngine";
import initWebRoute from "./webRoute";
const app = express();
viewEngine(app);
initWebRoute(app);
const port = process.env.port;
// const ;

// app.get("/", (req, res) => {
//   res.send("Hello QThinh");
// });

app.listen(port, () => {
  console.log("Example app listening on port ${port}");
});
