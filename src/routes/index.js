const express = require('express'), 
      router = express.Router(),
      //passport = require('passport'),
      mongoose = require('mongoose'),
      User = mongoose.model('User'),
      PollAnswer = require('../src/models/pollAnswer_model'),
      fs = require('fs');

// home page
router.get('/', async (req, res) =>  {
  // get characters if user is logged in
  let characters = [];
  if (req.user?.username) {
    const user = await User.find({username: req.user.username}).exec();    
    characters = user[0].characters;
  }

  res.render('index', {
    username: req.user?.username,
    characters: characters
  });
});

// about page
router.get('/about', (req, res) => {
  res.render('about');
});

// character tracker
router.get('/track-characters', (req, res) => {
  // TODO change to getting from db
  fs.readFile('polls.json', (err, data) => {
    if (err) {
      console.log('Could not read polls file');
      return;
    }

    data = JSON.parse(data);

    const chars1 = data.polls[0].answers;
    const chars2 = data.polls[1].answers;
    const chars3 = data.polls[2].answers;
    
    const characters = chars1.concat(chars2).concat(chars3).sort();

    res.render('trackCharacters', {characters});
  });
});


router.post('/track-characters', async (req, res) => {
  // get characters from form
  const characters = req.body.character;

  // get user from database and update characters
  await User.findOneAndUpdate({username: req.user.username}, {characters: characters});

  res.redirect('/');
});

module.exports = router;
