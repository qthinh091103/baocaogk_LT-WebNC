import http from "http";
import myDateTime from "./date";
import { getParamsURL, getPath } from "./getURL";
import "bootstrap/dist/css/bootstrap.min.css";

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": 'text/html;charset = "utf8' });
    res.write(myDateTime() + "<br>");
    res.write(getPath(req) + "<br>");
    res.write(getParamsURL(req) + "<br>");
    res.write("Hello, KTPM0121, chuc ban thanh cong voi nodejs");
    res.end();
  })
  .listen(8080);
