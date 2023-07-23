const router = require("express").Router();

const authRoutes = require("./Auth.route");

const validateAccessToken = require("../../middlewares/jwtValidation");
const feedback = require("./Feedback.route.js");
const NewsFeed = require("./NewsFeed.route.js");
const user = require("./user.rout");
const NoticeBoard = require("./NoticeBoard.route.js");
const PlacementCell = require("./PlacementCell.rout.js");
const UpcommingPlacement = require("./UpcommingPlacement.route.js");
const Post = require("./Post.rout");
const Contact = require("./Contact.route");
const Enquiry = require("./Enquiry.route");
const Media = require("./Media.route");
const Events = require("./Events.route");
const New = require("./News.route");
router.use("/auth", authRoutes);
router.use("/feedback", feedback);
router.use("/user", user);
router.use("/news", NewsFeed);
router.use("/new", New);
router.use("/noticeboard", NoticeBoard);
router.use("/placementCell", PlacementCell);
router.use("/upcommingPlacement", UpcommingPlacement);
router.use("/post", Post);
router.use("/contact", Contact);
router.use("/enquiryForm", Enquiry);
router.use("/media", Media);
router.use("/events", Events);

router.get("/test", validateAccessToken, (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

router.get("/ping", (req, res) => {
  res.json({ success: "true", message: "successful request" });
});

module.exports = router;
