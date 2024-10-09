require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const cors = require('cors');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');
const MemoryStore = require('memorystore')(session);

app.use(session({
    genid: () => {
        return uuidv4();
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    name: 'sessionId',
    cookie: {
        path: '/',
        httpOnly: true,
        secure: 'auto',
        maxAge: 12 * 60 * 60 * 1000
    },
    store: new MemoryStore({
        checkPeriod: 86400000
    })
}));

const whitelist = ['http://localhost:3000']

const corsOptionsDelegate = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Request not allowed"))
        }
    }
}

app.use((req, res, next) => {
    cors(corsOptionsDelegate)(req, res, (err) => {
      if (!req.headers.origin || whitelist.indexOf(req.headers.origin) === -1) {
        return res.status(403).send('403 Forbidden'); // Send 403 for CORS violations
      }
      next();
    });
  });

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname + "/views"));
app.set('view engine', 'jsx');

app.use('/', indexRouter);

module.exports = app;