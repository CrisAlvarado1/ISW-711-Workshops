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

/**
 * Saves a new career with associated courses.
 * 
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise} A promise with the saved career data or an error message.
 */
const careerPost = async (req, res) => {
  let career = new Career();
  // Get al the values
  career.name = req.body.name;
  career.code = req.body.code;
  career.description = req.body.description;
  career.courses = req.body.courses;
  console.log(career.courses);

  if (career.name && career.code && career.description) {
      // Save the new career
      await career.save()
          .then(data => {
              res.status(201);
              res.header({
                  'location': `/api/careers/?id=${data.id}`
              });
              res.json(data);
          })
          .catch(err => {
              // Manage the error when try to save
              res.status(422);
              console.error('error while saving the career', err);
              res.json({
                  error: 'There was an error saving the career'
              });
          });
  } else {
      // Manage the error with the request
      res.status(422);
      console.error('error while saving the career')
      res.json({
          error: 'No valid data provided for save the career'
      });
  }
}

module.exports = {
  careerGetAll,
};
