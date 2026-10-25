const protect = async (req, res, next) => {
  const { user } = req.session;

  console.log(req.session);

  if (!user) {
    return res.sendStatus(401);
  }

  next();
};

export { protect };
