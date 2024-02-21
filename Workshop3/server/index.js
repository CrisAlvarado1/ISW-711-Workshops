const express = require('express');
const app = express();
const routes = require("./routes/routes");

// Database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/teachers", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

// Mounting main API routes
app.use('/api', routes);

app.listen(3001, () => console.log(`Teachers app listening on port 3001!`))