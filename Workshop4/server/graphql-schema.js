const { buildSchema } = require("graphql");
exports.graphQLschema = buildSchema(`
  type Query {
    getAllCareers: [Career]
    getAllCourses: [Course]
    getAllTeachers: [Teacher]
    searchCourses(name: String!): [Course]
    hello: String
    version: String
  }

  type Career {
    _id: ID!
    name: String,
    code: String,
    description: String,
    courses: [Course]
  }

  type Course {
    _id: ID!
    name: String,
    credits: Int,
    teacher: Teacher
  }

  type Teacher {
    _id: ID,
    first_name: String,
    last_name: String,
    cedula: String,
    age: Int
  }

  `);
