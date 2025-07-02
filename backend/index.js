require('dotenv').config();
const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employees.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to InnovaExp Solutions API');
});

app.use('/api/employees', employeeRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});