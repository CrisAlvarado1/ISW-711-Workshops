const Teacher = require("../models/teacherModel");

/**
 * Get all teachers.
 * 
 * @returns {Promise}  A promise with teacher objects.
 */
const teacherGetAll = () => {
  return Teacher.find((error, courses) => {
    if (error) {
      console.log("there was an error", error);
      return error;
    }
    return courses;
  });
};

module.exports = {
  teacherGetAll,
};
