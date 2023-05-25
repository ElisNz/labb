require('dotenv').config();

const express = require('express');
const router = require('./routes/router');
const app = express();
const cors = require('cors');

const PORT = process.env.port || '3001';

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => { // LYSSNA på port
    console.log('API - Listening on port: ' + PORT);
});