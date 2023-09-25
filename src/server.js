const express = require('express');

const app = express();

app.get('/health-check', async (req, res) => res.status(200).send('Up and running...'));

module.exports = app;
