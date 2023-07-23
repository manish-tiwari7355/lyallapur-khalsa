const uploadFiles = require("../../services/upload-files");
const Contact = require("../../models/ContactUs.model");
const formidable = require("formidable");
const createError = require("http-errors");

const updateContactForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, subject, message } = req.body;
    const data = await Contact.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        name,
        email,
        phone,
        subject,
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

module.exports = updateContactForm;
