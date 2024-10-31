import express from "express";
import homeController from "../controllers/HomeController";
import aboutController from "../controllers/AboutController";
import contactController from "../controllers/ContactController";
const router = express.Router();
const initWebRoute = (app) => {
  // define the home page route
  app.get("/", homeController.renderHome);
  app.get("/about", aboutController.renderAbout);
  app.get("/contact", contactController.renderContact);
};
export default initWebRoute;
