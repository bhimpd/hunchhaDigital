
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: APIs for user authentication
 */






/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user and generate a token
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               message: Login successful
 *               token: <generated-token>
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: Username and password do not match
 */

router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Check if the provided credentials are valid
  if (username === 'bhim' && password === 'bhim123') {
    // Generate a token with a 30-minute expiration
    const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    console.log('Secret Key Used for Token Creation:', process.env.ACCESS_TOKEN_SECRET);

    return res.json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ message: 'Username and password do not match' });
  }
});

module.exports = router;
