const Career = require("../models/careerModel");

/**
 * Creates a career
 *
 * @param {*} req
 * @param {*} res
 */
const careerPost = async (req, res) => {
    let career = new Career();
    // Get al the values
    career.name = req.body.name;
    career.code = req.body.code;
    career.description = req.body.description;

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

/**
 * Get all careers
 *
 * @param {*} req
 * @param {*} res
 */
const careerGet = (req, res) => {
    // If an specific career is required
    if (req.query && req.query.id) {
        // Search if exist this career and send it
        Career.findById(req.query.id)
            .then((career) => {
                res.json(career);
            })
            .catch(err => {
                res.status(404);
                console.log('error while querying the career', err)
                res.json({ error: "Career doesnt exist" })
            });
    } else {
        // Get all careers
        Career.find()
            .then(careers => {
                res.json(careers);
            })
            .catch(err => {
                res.status(422);
                res.json({ "error": err });
            });
    }
};

/**
 * Updates a specific career
 *
 * @param {*} req
 * @param {*} res
 */
const careerPatch = (req, res) => {
    // Get teacher by id
    if (req.query && req.query.id) {
        Career.findById(req.query.id, function (err, career) {
            if (err) {
                res.status(404);
                console.log('error while querying the career', err)
                res.json({ error: "Career doesn't exist" })
            }

            // Update the career object (patch)
            career.name = req.body.name ? req.body.name : career.name;
            career.code = req.body.code ? req.body.code : career.code;
            career.description = req.body.description ? req.body.description : career.description

            // Finally update the career
            career.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('Error while updating the career', err)
                    res.json({
                        error: 'There was an error updating the career'
                    });
                }
                res.status(200); // OK
                res.json(career);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "Career doesnt exist" })
    }
};

/**
 * Deletes a specific career
 *
 * @param {*} req
 * @param {*} res
 */
const careerDelete = (req, res) => {
    // If an specific career is required
    if (req.query && req.query.id) {
        // Search if exist this career and send it
        Career.findById(req.query.id, function (err, career) {
            if (err) {
                res.status(404);
                console.log('error while querying the career', err)
                res.json({ error: "Career doesn't exist" })
            }
            // If exists, delete the specific career
            career.deleteOne(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while deleting the career', err)
                    res.json({
                        error: 'There was an error deleting the career'
                    });
                }

                res.status(204);
                res.json({})
            });
        })
    } else {
        res.status(404);
        res.json({ error: "Career doesn't exist" })
    }
}

// Export the functions of this controller
module.exports = {
    careerGet,
    careerPost,
    careerPatch,
    careerDelete
}