const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const productRoutes = require('./routes/productRoutes');

const rateLimiter = require('./middlewares/rateLimiter');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const { port } = require('./config/config');

// Connect to database
// connectDB();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', profileRoutes);

// Error handling
app.use(errorHandler);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/view/index.html'));
});
// Middleware to handle other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '/view/404.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
