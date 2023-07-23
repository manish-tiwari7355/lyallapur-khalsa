const express = require("express");
const createEnquiryForm = require("../../controllers/enquiry/createEnquiryForm");
const deleteEnquiryForm = require("../../controllers/enquiry/deleteEnquiryForm");
const updateEnquiryForm = require("../../controllers/enquiry/updateEnquiryForm");
const getEnquiryForm = require("../../controllers/enquiry/getEnquiryForm");
const getAllEnquiryForms = require("../../controllers/enquiry/getAllEnquiryForm");
const getAllEnquiryForm = require("../../controllers/enquiry/getAllEnquiryForm");

const router = express.Router();
router.post("/", createEnquiryForm);
router.get("/", getAllEnquiryForm);
router.put("/:id", updateEnquiryForm);
router.delete("/:id", deleteEnquiryForm);
router.get("/:id", getEnquiryForm);

module.exports = router;
