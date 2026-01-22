// ===============================
// Future Viz Backend Server
// ===============================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();


// ===============================
// Middlewares
// ===============================

// 🔥 VERY IMPORTANT (fixes Vercel → Render requests)
app.use(cors({
  origin: "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ===============================
// Routes
// ===============================

const authRoutes = require('./routes/auth');
const transformationRoutes = require('./routes/transformations');

app.use('/api/auth', authRoutes);
app.use('/api/transformations', transformationRoutes);


// ===============================
// Health check route
// ===============================

app.get('/', (req, res) => {
  res.send('🚀 Future Viz Backend is running');
});


// ===============================
// Start server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
