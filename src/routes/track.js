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
          weapons    = await Weapon.find({}).exec(),
          user       = await User.findOne({username: req.user.username}).exec();

    // gets user characters
    let trackedCharacters = characters.filter(character => {
      return user.characters.includes(character.id);
    });

    // put into string
    trackedCharacters = trackedCharacters.reduce((fullString, character) => {
      return fullString += character.name + ',';
    }, '');
    trackedCharacters = trackedCharacters.slice(0, -1);

    // get user weapons
    let trackedWeapons = weapons.filter(weapon => {
      return user.weapons.includes(weapon.id);
    });

    // put into string
    trackedWeapons = trackedWeapons.reduce((fullString, weapon) => {
      return fullString += weapon.name + ',';
    }, '');
    trackedWeapons = trackedWeapons.slice(0, -1);

    res.render('trackCharacters', {characters, weapons, trackedCharacters, trackedWeapons});
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