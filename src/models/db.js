require('dotenv').config(); // env vars
require('../models'); // generate models

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, 
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    if (error) console.log(error);
    else       console.log('connected to db');
});