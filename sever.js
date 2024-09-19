import express from "express";
import dotenv from "dotenv/config";
import myDateTime from "./date";
import { getParamsURL, getPath } from "./getURL";
import viewEngine from "./viewEngine";

const app = express();
viewEngine(app);
const port = process.env.port;
// const ;

// app.get("/", (req, res) => {
//   res.send("Hello QThinh");
// });

app.listen(port, () => {
  console.log("Example app listening on port ${port}");
});

app.get("/", (req, res) => {
  res.rende("home");
});

app.get("/date", (req, res) => {
  res.send(myDateTime());
});

app.get("/getURL", (req, res) => {
  res.send(getParamsURL(req) + getPath(req));
});

app.get("/ejs", (req, res) => {
  res.render("test");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});
