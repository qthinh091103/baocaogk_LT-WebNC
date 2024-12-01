import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(403).redirect("/admin");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).redirect("/admin");
    }

    req.user = decoded;
    next();
  });
};
