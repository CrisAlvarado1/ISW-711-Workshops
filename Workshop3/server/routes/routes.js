const express = require('express');
const router = express.Router();

// Importing teacher controller functions
const {
    teacherPatch,
    teacherPost,
    teacherGet,
    teacherDelete
} = require("../controllers/teacherController.js");

// Importing course controller functions
const {
    coursePost,
    courseGet
} = require("../controllers/courseController.js");

// Importing career controller functions
const {
    careerPost,
    careerGet,
    careerPatch,
    careerDelete
} = require("../controllers/careerController.js")

// teacher routes:
router.get("/teachers", teacherGet);
router.post("/teachers", teacherPost);
router.patch("/teachers", teacherPatch);
router.put("/teachers", teacherPatch);
router.delete("/teachers", teacherDelete);

// courses routes
router.get("/courses", courseGet);
router.post("/courses", coursePost);

// careers routes
router.get("/careers", careerGet);
router.post("/careers", careerPost);
router.put("/careers", careerPatch);
router.patch("/careers", careerPatch);
router.delete("/careers", careerDelete);

// Export this module
module.exports = router;