const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const rateLimiter = require('./middlewares/rateLimiter');
const helmet = require('helmet');
const morgan = require('morgan');
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
app.use('/api/products', productRoutes);

// Error handling
app.use(errorHandler);

app.get('/', (req, res) => {
 res.send("server start")
});
// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
