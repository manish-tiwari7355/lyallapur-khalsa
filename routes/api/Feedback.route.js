const express= require("express");
const createFeedbackform = require("../../controllers/forms/feedbackform");
const getAllFeedback = require("../../controllers/forms/getAllFeedback");
const router= express.Router();

router.post("/", createFeedbackform);
router.get("/getAll",getAllFeedback);

module.exports = router;