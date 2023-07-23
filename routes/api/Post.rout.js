const router = require("express").Router();
const validateAccessToken = require("../../middlewares/jwtValidation")

const createPost = require("../../controllers/post/createPost");
router.post("/create",validateAccessToken, createPost);

module.exports = router;