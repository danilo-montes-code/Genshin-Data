const express     = require('express'), 
      mongoose    = require('mongoose'),
      router      = express.Router(),
      User        = mongoose.model('User'),
      Character   = mongoose.model('Character'),
      Weapon      = mongoose.model('Weapon');

// function for verifying if the user is logged in
const isAuthenticated = (req, res, next) => {
  if(!req.user) {
    res.redirect('/'); 
  } else {
    next();
  }
}

// character tracker
router.get('/track', isAuthenticated, async (req, res) => {

    const characters = await Character.find({}).exec(),
          weapons    = await Weapon.find({}).exec();
    
    res.render('trackCharacters', {characters, weapons});
});

  
router.post('/track', isAuthenticated, async (req, res) => {
    // get characters from form
    const charactersForm = req.body.character,
          weaponsForm    = req.body.weapon;

    const characters = await Character.find({'name' : { $in: charactersForm} }, 
                                            {"_id":1}).exec(),
          weapons    = await Weapon.find({'name' : { $in: weaponsForm} }, 
                                            {"_id":1}).exec();

    // get user from database and update characters
    await User.findOneAndUpdate({username: req.user.username}, {characters, weapons});

    res.redirect('/');
});

  
module.exports = router;