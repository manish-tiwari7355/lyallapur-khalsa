const express= require("express");
const createUpcommingPlacement = require("../../controllers/placementCell/upcommingPlacement");
const getAllUpcomingPlacements = require("../../controllers/placementCell/getUpcomigPlacement");


const router= express.Router();
router.post("/post",createUpcommingPlacement);
router.get("/fetch",getAllUpcomingPlacements)
module.exports = router;