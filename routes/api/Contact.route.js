const express = require("express");
const createContactForm = require("../../controllers/contact/createContactForm");
const deleteContactForm = require("../../controllers/contact/deleteContactForm");
const updateContactForm = require("../../controllers/contact/updateContactForm");
const getContactForm = require("../../controllers/contact/getContactForm");
const getAllContacts = require("../../controllers/contact/getAllContacts");

const router = express.Router();
router.post("/", createContactForm);
router.get("/", getAllContacts);
router.put("/:id", updateContactForm);
router.delete("/:id", deleteContactForm);
router.get("/:id", getContactForm);

module.exports = router;
