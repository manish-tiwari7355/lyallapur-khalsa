const uploadFiles = require("../../services/upload-files");
const EnquiryForm = require("../../models/EnquiryForm.model");
const formidable = require("formidable");
const createError = require("http-errors");

const deleteEnquiryForm = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await EnquiryForm.findOneAndDelete({ _id: ObjectId(id) });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteEnquiryForm;
