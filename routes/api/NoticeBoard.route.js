const express = require("express");
const createNoticeBoard = require("../../controllers/noticeBoard/createNoticeBoard");
const deleteNoticeBoard = require("../../controllers/noticeBoard/deleteNoticeBoard");
const updateNoticeBoard = require("../../controllers/noticeBoard/updateNoticeBoard");
const getNoticeBoard = require("../../controllers/noticeBoard/getNoticeBoard");
const getAllNoticeBoard = require("../../controllers/noticeBoard/getAllNoticeBoard");
const router = express.Router();
router.post("/create", createNoticeBoard);
router.put("/:id", updateNoticeBoard);
router.delete("/:id", deleteNoticeBoard);
router.get("/:id", getNoticeBoard);
router.get("/", getAllNoticeBoard);

module.exports = router;
