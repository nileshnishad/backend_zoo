const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const User = require('../models/User');
const { readJSONFile } = require('../utils/fileUtils');
const path = require('path');

const getFilePath = (fileName) => path.join(__dirname, '..', 'data', fileName);
const usersFilePath = getFilePath('users.json');

const auth = async (req, res, next) => {
  try {
    console.log("auth called ");
    const authHeader = req.header('Authorization');
    console.log("authHeader",authHeader);
    if (!authHeader) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log("token",token);
    const decoded = jwt.verify(token, jwtSecret);
    console.log("decoded",decoded);
    const users = await readJSONFile(usersFilePath);
    const user = users.find(user => user.id === decoded.id);
    // const user = await User.findById(decoded.id);
    console.log("user",user);
    if (!user) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
