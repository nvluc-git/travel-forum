const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return res.status(403).json({
      errCode: 403,
      mess: "you are not allowed",
    });
  }
  next();
};

module.exports = isAdmin;
