const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Routes
const searchRoutes = require('./routes/search');  // Make sure this path is correct

app.use('/api/search', searchRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
