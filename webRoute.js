import express from "express";
const router = express.router();
const initWebRoute = (app) => {
  // define the home page route
  app.get("/date", (req, res) => {
    res.send(myDateTime());
  });

  app.get("/getURL", (req, res) => {
    res.send(getParamsURL(req) + getPath(req));
  });

  app.get("/views/ejs", (req, res) => {
    res.render("views/test");
  });

  app.get("/views/home", (req, res) => {
    res.render("views/home");
  });

  app.get("/views/about", (req, res) => {
    res.render("views/about");
  });

  app.get("/views/header", (req, res) => {
    res.render("view/header");
  });

  app.get("/views/footer", (req, res) => {
    res.render("views/footer");
  });

  app.get("/views/layout", (req, res) => {
    res.render("views/layout");
  });

  app.get("/", (req, res) => {
    res.render("views/main");
  });
};
export default initWebRoute;
