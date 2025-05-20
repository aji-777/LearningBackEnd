const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/Auth');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();


const user = require('./routes/User');
const existing = require('./routes/existing');
const userDetails = require('./routes/UserDetails');
const subscription = require('./routes/Subscription');



// app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Learning', {})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', user);
app.use('/api',existing);
app.use('/api',userDetails);
app.use('/api',subscription);

//
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});