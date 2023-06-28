module.exports.protectedRoute = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      throw new Error("login to access resource");
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
