const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(401).json('no user was found');
    }
    let hashedPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!hashedPassword) {
      res.status(401).json('Password does not match');
    }
    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '5d' }
    );
    res.status(201).json({ user, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
