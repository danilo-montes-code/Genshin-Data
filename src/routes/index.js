const express    = require('express'), 
      router     = express.Router();
      
// home page
router.get('/', async (req, res) =>  {
  // get characters if user is logged in
  let characters = [];
  
  if (req.user) {
    //const user = await User.findById({username: req.user.id}).exec();    
    characters = req.user.characters;
  }

  res.render('index', {characters});
});

// about page
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
