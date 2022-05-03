const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const timestamp = require('unix-timestamp');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  console.info(`${req.method} request received to diagnostics`);
  readFromFile('./db/diagnostics.json').then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  console.info(`${req.method} request received to diagnostics`);
  const { errors } = req.body;

  const newDiagnostic = {
    time: timestamp.now(),
    error_id: uuidv4(),
    errors,
  };

  readAndAppend(newDiagnostic, './db/diagnostics.json');
  const response = {
    status: 'success',
    body: newFeedback,
  };

  res.json(response);
});

module.exports = diagnostics;
