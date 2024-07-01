const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

const generateToken = (user) => {
  const payload = { id: user.id, role: user.role };
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};

module.exports = { generateToken };
