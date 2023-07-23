const express = require("express");
const createMedia = require("../../controllers/media/createMedia");
 const deleteMedia = require("../../controllers/media/deleteMedia");
 const getMedia = require("../../controllers/media/getMedia");
 const getAllMedia = require("../../controllers/media/getAllMedia");
 const updateMedia= require("../../controllers/media/updateMedia");
const router = express.Router();
router.post("/add", createMedia);
router.delete("/:id", deleteMedia);
 router.get("/:id", getMedia);
router.get("/", getAllMedia);
 router.put("/:id", updateMedia);

module.exports = router;