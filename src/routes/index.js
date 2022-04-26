const express    = require('express'), 
      router     = express.Router(),
      User       = require('mongoose').model('User');
      
// home page
router.get('/', async (req, res) =>  {
  // get characters if user is logged in
  let characters = [],
      weapons    = [];
  
  if (req.user) {
    const user = await User.findById({username: req.user.id})
                           .populate('characters', 'name')
                           .populate('weapons', 'name')
                           .exec();

    characters = user.characters;
    weapons    = user.weapons;
  }

  res.render('index', {characters, weapons});
});

// about page
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
