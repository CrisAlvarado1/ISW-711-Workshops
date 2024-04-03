const Career = require("../models/careerModel");

/**
 * Get all careers with associated courses and teachers.
 * 
 * @returns {Promise} A promise with career objects.
 */
const careerGetAll = async () => {
  try {
    const careers = await Career.find().populate({
      path: 'courses',
      populate: {
        path: 'teacher'
      }
    }).exec();
    
    return careers;
  } catch (error) {
    console.log("there was an error", error);
    return error;
  }
};

module.exports = {
  careerGetAll,
};
