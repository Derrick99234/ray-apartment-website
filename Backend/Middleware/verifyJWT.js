const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) return res.sendStatus(401);

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json("You need to login");

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err)
      return res.status(403).json({
        error: true,
        err,
        message: "Unauthorized",
      });
    req.id = decoded;
    next();
  });
};

module.exports = authenticate;
