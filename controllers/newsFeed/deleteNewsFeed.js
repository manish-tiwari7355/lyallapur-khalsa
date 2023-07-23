const uploadFiles = require("../../services/upload-files");
const newsFeed = require("../../models/NewsFeed.model");
const formidable = require("formidable");
const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;

const deleteNewsFeed = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id, "id");
    await newsFeed.findOneAndDelete({
      _id: ObjectId(id),
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteNewsFeed;
