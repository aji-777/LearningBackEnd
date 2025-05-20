// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const bodyParser = require('body-parser');

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api', require('./routes/User'));
// app.use('/api',require('./routes/existing'));
// app.use('/api',require('./routes/UserDetails'));
// app.use('/api',require('./routes/Subscription'));

// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {})
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.error(err));

// // Route: Create Subscription
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
