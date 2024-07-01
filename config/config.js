require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  // mongoUri: process.env.MONGO_URI,
  useFileDb: process.env.USE_FILE_DB === 'true', // Add this line
};
