const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

app.use(express.json());

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('mongo connected');
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('backend server running');
});
