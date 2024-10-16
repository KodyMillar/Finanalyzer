require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const MemoryStore = require('memorystore')(session);
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');

const app = express();

const port = process.env.PORT || 9088;
const host = process.env.HOST || 'localhost';

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:80', // Replace with your React app's URL
  credentials: true
}));

app.use(express.json());
app.use(helmet());

// Generate a random secret key
const sessionSecret = crypto.randomBytes(64).toString('hex');

// Configure session
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: 86400000 }) // prune expired entries every 24h
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://${host}:${port}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    // Here you would find or create a user in your database
    // For now, just return the profile
    return done(null, profile);
  }
));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to show results page.
    res.redirect('http://localhost:3010'); // Redirect to React app after authentication
  }
);

app.get('/', (req, res) => {
  res.send('Google OAuth Service');
});

app.listen(port, () => {
  console.log(`Auth service started at http://${host}:${port}`);
});