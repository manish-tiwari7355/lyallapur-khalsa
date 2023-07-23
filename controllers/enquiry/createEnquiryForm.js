const uploadFiles = require("../../services/upload-files");
const EnquiryForm = require("../../models/EnquiryForm.model");
const formidable = require("formidable");
const createError = require("http-errors");

const createEnquiryForm = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, courseInterested, message } =
      req.body;
    const data = new EnquiryForm({
      firstName,
      lastName,
      phone,
      email,
      courseInterested,
      message,
    });
    await data.save();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = createEnquiryForm;
