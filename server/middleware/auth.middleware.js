const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not Authorized' });
    }
    const decode = jwt.verify(token, process.env.jwtSecret);

    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Not Authorized' });
  }
};
