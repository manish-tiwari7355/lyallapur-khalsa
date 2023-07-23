const uploadFiles = require("../../services/upload-files");
const EnquiryForm = require("../../models/EnquiryForm.model");
const formidable = require("formidable");
const createError = require("http-errors");

const getEnquiryForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await EnquiryForm.findOne({ _id: ObjectId(id) });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = getEnquiryForm;
