const jwt = require('jsonwebtoken');
const { Users } = require("../models");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(authHeader);

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }
  try {
    const secret = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, secret);
    const user = await Users.findOne({ where: { id: userId } });
    if (user.is_blocked) { throw new Error() }
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'You are not authenticated!' });
  }
};

module.exports = authenticate;