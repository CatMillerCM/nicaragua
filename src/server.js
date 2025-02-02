const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

app.use(cors());

const db = new sqlite3.Database('./nicaragua_parties.db');

app.get('/parties', (req, res) => {
  const validParams = ['location', 'day'];
  const receivedParams = Object.keys(req.query);

  const invalidParams = receivedParams.filter((param) => !validParams.includes(param));

  if (invalidParams.length > 0) {
    return res.status(400).json({ error: `Invalid query parameter(s): ${invalidParams.join(', ')}` });
  }

  let sql = 'SELECT * FROM nicaragua_parties WHERE 1=1';
  const params = [];

  if (req.query.location) {
    sql += ' AND location = ?';
    params.push(req.query.location);
  }

  if (req.query.day) {
    sql += ' AND (day = ? OR day = "every day")';
    params.push(req.query.day);
  }

  return db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(rows);
  });
});

app.get('/party/:name', (req, res) => {
  const partyName = req.params.name.replace(/-/g, ' ').toLowerCase();

  const sql = 'SELECT * FROM nicaragua_parties WHERE LOWER(name) = ?';

  db.get(sql, [partyName], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Party not found' });
    }
    return res.status(200).json(row);
  });
});

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

module.exports = app;
