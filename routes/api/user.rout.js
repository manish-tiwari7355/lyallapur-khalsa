const router = require("express").Router();
const validateAccessToken=require("../../middlewares/jwtValidation")
const getUser = require("../../controllers/user/getUser");
router.get("/me", validateAccessToken, getUser);


module.exports = router;