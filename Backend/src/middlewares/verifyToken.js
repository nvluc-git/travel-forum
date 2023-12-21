import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json("You are not authenticated");
  }
  const accessToken = token.split(" ")[1];
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "JsonWebTokenError")
        return res.status(401).json({
          errCode: 401,
          mess: "token invalid",
        });
      return res.status(401).json({
        errCode: 401,
        mess: err.message,
      });
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
