const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// // Create a new user
// router.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = new User({ username, email, password:hashedPassword });
//     await user.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Retrieve all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//login by user

router.post('/login', async (req, res) => {
  console.log("comidididiidid")
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const payload = { userId: user.id };
    console.log("jwt token",process.env.JWT_SECRET,payload)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("token",token);
    res.json({ email,token, message: 'Login successfull' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;
