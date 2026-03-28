const express = require('express');
const cors = require('cors');
const db = require('./initDB');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));