const uploadFiles = require("../../services/upload-files");
const Events = require("../../models/Events.mode.");
const formidable = require("formidable");
const createError = require("http-errors");
const { ObjectId } = require("mongoose").Types;

const deleteEvents = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Events.findOneAndDelete({
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

module.exports = deleteEvents;
