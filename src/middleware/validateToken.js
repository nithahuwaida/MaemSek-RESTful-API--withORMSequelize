const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || "271119";

exports.validateUser = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ status: "error", response: "Unauthorized" });
  token = token.replace("Bearer ", "");
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.json({ status: "error", response: "Invalid token" });
    } else {
      req.body.decode = decoded;
      next();
    }
  });
};