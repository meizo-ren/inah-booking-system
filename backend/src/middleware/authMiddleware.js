import jwt from "jsonwebtoken";

// PROTECTDED ROUTES //
export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ msg: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is invalid", error: error.message });
  }
};

// ADMIN ONLY MIDDELWARE //
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Forbidden" });
  next();
};
