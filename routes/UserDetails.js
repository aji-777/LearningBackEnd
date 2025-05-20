// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Grid = require('gridfs-stream');
const UserDetails = require('../models/UserDetails');

const upload = multer({
    limits: { fileSize: 20 * 1024 * 1024 }, // 10MB
  });
  
// Route to add a new user
router.post('/add', upload.single('file'), async (req, res) => {
    try {
        console.log("jfjfjjfjjf",req.method,req.url)
        const { name, email, password, age,qualification,nationality,learninglanguage,mobileNumber,profileImage,status} = req.body;
        // Create a new user instance
        const userdetails = new UserDetails({ name, email, password,age,qualification,nationality,learninglanguage,mobileNumber,profileImage,status });
        // Save the user to the database
        console.log("user details",userdetails);
        await userdetails.save();
        res.status(201).json({ message: 'User added successfully', userdetails });
    } catch (error) {
        res.status(400).json({ message: 'Error adding user', error: error.message });
    }
});


async function fetchProfileDetails(email) {
    try {
        const posts = await UserDetails.findOne({ email: email }).populate('userId'); // Joins User data
        console.log(posts);
        return posts;
    } catch (error) {
        console.error(error);
    }
}

router.get('/getProfileDetails', async (req, res) => {
    console.log("coming")
    try {
        const email  = req.headers.email;
        console.log("email",email)

        const profielDetails = await fetchProfileDetails(email);
        console.log("email",profielDetails)
        res.json(profielDetails); // Sends the posts with user data to the client
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch fetchProfileDetails' });
    }
});
module.exports = router;
