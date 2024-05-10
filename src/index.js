const express = require("express");
const dotenv = require("dotenv");
const router = require('./routes/api.js');
const cookieParser = require('cookie-parser')
const cors = require("cors");
const path = require("path");
const { log } = require("console");
const app = express();


dotenv.config();
const PORT = process.env.PORT;
app.get('/', async (req, res) => {
    res.send('home')
  })

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_PORT,
  })
);
app.use(express.static(path.join(__dirname, '../public')))
// app.use(express.static(path.join(__dirname, '../public')));
app.use(router);
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
  