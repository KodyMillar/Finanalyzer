require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const cors = require("cors");
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname + "/views"));
app.set('view engine', 'jsx');

app.use('/', indexRouter);

module.exports = app;