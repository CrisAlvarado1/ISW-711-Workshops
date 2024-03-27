const courseModel = require("../models/courseModel");

/**
 * Get all courses or one
 *
 * @returns {Promise} A promise with course objects.
 */
const courseGetAll = () => {
  return courseModel.find((error, courses) => {
    if (error) {
      console.log('there was an error', error);
      return error;
    }
    return courses;
  }).populate('teacher').exec();
};

/**
 * Searches for courses by name.
 * 
 * @param {Object} params - Parameters for course search.
 * @returns {Promise} A promise with course objects.
 */
const courseSearch = (params) => {
  return courseModel.find(
    {
      "name": { $regex: `${params.name}`, $options: 'i' }
    }, (error, courses) => {
    if (error) {
      console.log('there was an error', error);
      return error;
    }
    return courses;
  }).populate('teacher').exec();
};

module.exports = {
  courseGetAll,
  courseSearch
}