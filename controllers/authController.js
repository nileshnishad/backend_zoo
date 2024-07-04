const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { jwtSecret } = require('../config/config');
const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../utils/jwtUtils');
const path = require('path');
const { successResponse, errorResponse } = require('../utils/responseUtils');


const getFilePath = (fileName) => path.join(__dirname, '..', 'data', fileName);

const usersFilePath = getFilePath('users.json');

exports.register = async (req, res) => {
  const { name, email, password , userRole } = req.body;
  try {
    const users = await readJSONFile(usersFilePath);
    let user = users.find(user => user.email === email);
    if (user) return res.status(400).json(errorResponse(null, 'User already exists'));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = { id: uuidv4(), name, email, password: hashedPassword, role: userRole? userRole: 'user' }; // Add role if needed
    users.push(user);
    await writeJSONFile(usersFilePath, users);

    const token = generateToken(user);
    res.status(201).json(successResponse({ token, 'role': user.role }, 'User registered successfully'));
  } catch (err) {
    res.status(500).json(errorResponse(err.message, 'Server error'));
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await readJSONFile(usersFilePath);
    let user = users.find(user => user.email === email);
    console.log("user",user);
    if (!user) return res.status(400).json(errorResponse(null, 'User Not Found'));

    console.log('user.password',user.password);
    // const isMatch = password === user.password;

    const isMatch = await bcrypt.compare(password, user.password);
        // const isMatch = await (password, user.password);

    console.log("isMatch",isMatch);
    if (!isMatch) return res.status(400).json(errorResponse(null, 'Invalid credentials'));

    const token = generateToken(user);
    res.status(200).json(successResponse({ token,'role': user.role ,'id':user.id , }, 'Login successful'));
  } catch (err) {
    res.status(500).json(errorResponse(err, 'Server error'));
  }
};
