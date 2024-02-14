// dependencies
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require('./routes/routes');

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: "*"
}));

// routes
app.use('/', routes); // Use the file of routes for the endpoints

// start the app
app.listen(3001, () => console.log(`BBCR Exchange type service listening on port 3001!`));
