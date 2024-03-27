require("dotenv").config();
const graphqlHTTP = require("express-graphql");
const { graphQLschema } = require("./graphql-schema.js");

const express = require("express");
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const {
  courseGetAll,
  courseSearch,
} = require("./controllers/courseController.js");

const { careerGetAll } = require("./controllers/careerController.js");

const { teacherGetAll } = require("./controllers/teacherController.js");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
const cors = require("cors");

// expose in the root element the different entry points of the
// graphQL service
const graphqlResolvers = {
  getAllCareers: careerGetAll,
  getAllCourses: courseGetAll,
  searchCourses: (params) => courseSearch(params),
  getAllTeachers: teacherGetAll,
  hello: function () {
    return "Hola Mundo";
  },
  version: function () {
    return "1.0";
  },
};

// Middlewares
app.use(bodyParser.json());
// check for cors
app.use(
  cors({
    domains: "*",
    methods: "*",
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQLschema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

app.listen(3001, () => console.log(`Example app listening on port 3001!`));
