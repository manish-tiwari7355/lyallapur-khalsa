const express= require("express");
const createPlacementCell = require("../../controllers/placementCell/placementCell");


const router= express.Router();
router.post("/add", createPlacementCell);

module.exports = router;