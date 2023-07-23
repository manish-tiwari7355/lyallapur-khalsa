const express = require("express");
const createEvents = require("../../controllers/events/createEvents");
const deleteEvents = require("../../controllers/events/deleteEvents");
const updateEvents = require("../../controllers/events/updateEvents");
const getEvents = require("../../controllers/events/getEvents");
const getAllEvents = require("../../controllers/events/getAllEvents");
const router = express.Router();
router.post("/create", createEvents);
router.put("/:id", updateEvents);
router.delete("/:id", deleteEvents);
router.get("/:id", getEvents);
router.get("/", getAllEvents);

module.exports = router;