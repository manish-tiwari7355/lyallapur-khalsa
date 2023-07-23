const express = require("express");
const createNewsFeed = require("../../controllers/newsFeed/createNewsFeed");
const deleteNewsFeed = require("../../controllers/newsFeed/deleteNewsFeed");
const getNewsFeed = require("../../controllers/newsFeed/getNewsFeed");
const getAllNewsFeed = require("../../controllers/newsFeed/getAllNewsFeed");
const updateNewsFeed = require("../../controllers/newsFeed/updateNewsFeed");

const getAllNewFeed = require("../../controllers/newsFeed/getAllNewFeed");
const router = express.Router();
router.post("/add", createNewsFeed);
router.delete("/:id", deleteNewsFeed);
router.get("/:id", getNewsFeed);
router.get("", getAllNewsFeed);
// router.get("/", getAllNewFeed);
router.put("/:id", updateNewsFeed);

module.exports = router;
