const express = require("express");

const getAllNewFeed = require("../../controllers/newsFeed/getAllNewFeed");
const router = express.Router();

router.get("/", getAllNewFeed);

module.exports = router;
