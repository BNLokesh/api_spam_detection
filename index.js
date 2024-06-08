import express from 'express';
import bodyParser from 'body-parser';
import const router = require('express').Router()


module.exports  = router from './routes/auth.js';
import contactsRoutes from './routes/contacts.js';
import searchRoutes from './routes/search.js';
import { authMiddleware } from './middleware/authMiddleware.js';

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(authMiddleware);

// Routes
app.use('/api/auth', router);
app.use('/api/contacts', contactsRoutes);
app.use('/api/search', searchRoutes);

// Define a port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for testing
export default app;
