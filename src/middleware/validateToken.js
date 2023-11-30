const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token without the "Bearer" prefix

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(403).json({ err: err });
  }
};

module.exports = { validateToken };
