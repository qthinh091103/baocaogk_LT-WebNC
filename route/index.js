import dotenv from "dotenv";
import express from "express";
import configViewEngine from "webRoute";
const app = express();
dotenv.config();
const port = process.env.PORT;
comfigViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
  console.log("Example app listening on port ${port}");
});
