// requires
require("dotenv").config(); // environment variabes
require('./config/db'); // database
require('./config/passport_setup'); // passport

const passport   = require('passport'),
      express    = require('express'),
      session    = require('express-session'),
      path       = require('path'),
      MongoStore = require('connect-mongo')(session),
      mongoose   = require('mongoose'),
      app        = express();

// view engine setup
app.set('views', __dirname+'/views/');
app.set('view engine', 'hbs');

// sessions
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection : mongoose.connection,
    })
};
app.use(session(sessionOptions));

// body parsing
app.use(express.urlencoded({ extended: false }));

// static
app.use(express.static(path.join(__dirname, 'public')));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routers
const baseRouter  = require('./routes/index'),
      userRouter  = require('./routes/user'),
      pollRouter  = require('./routes/poll'),
      trackRouter = require('./routes/track')
      apiRouter   = require('./routes/api');

app.use('/', baseRouter);
app.use('/', trackRouter);
app.use('/user', userRouter);
app.use('/poll', pollRouter); 
app.use('/api', apiRouter);

// start server
app.listen(process.env.PORT || 3000, 
  () => {console.log('server started');}
);