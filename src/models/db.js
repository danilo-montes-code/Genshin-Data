require('dotenv').config();
const mongoose = require('mongoose');
require('../models'); // generate models

mongoose.connect(process.env.MONGODB_URI, 
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    if (error) console.log(error);
});