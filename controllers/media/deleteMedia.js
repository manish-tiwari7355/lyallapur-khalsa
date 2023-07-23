const uploadFiles = require("../../services/upload-files");
const Media = require("../../models/Media.model");
const formidable = require("formidable");
const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;

const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Media.findOneAndDelete({
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

module.exports = deleteMedia;