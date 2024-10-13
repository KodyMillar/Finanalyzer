require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const MemoryStore = require('memorystore')(session);
const indexRouter = require('./routes/router-index');
const connectDB = require('./config/db');

const app = express();

const port = process.env.PORT
const host = process.env.HOST

app.use(express.json());
app.use(cors())
app.use(helmet());

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://${host}:${port}`);
});

connectDB();

app.use('/', indexRouter);