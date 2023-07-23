const uploadFiles = require("../../services/upload-files");
const EnquiryForm = require("../../models/EnquiryForm.model");
const formidable = require("formidable");
const createError = require("http-errors");

const updateEnquiryForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, courseInterested, message } =
      req.body;
    const data = await EnquiryForm.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        firstName,
        lastName,
        email,
        phone,
        courseInterested,
        message,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateEnquiryForm;
