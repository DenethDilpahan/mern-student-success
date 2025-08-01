// roleMiddleware.js
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: "Access denied: insufficient permissions" });
    }

    next();
  };
};

module.exports = roleMiddleware;
