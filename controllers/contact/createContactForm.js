const uploadFiles = require("../../services/upload-files");
const Contact = require("../../models/ContactUs.model");
const formidable = require("formidable");
const createError = require("http-errors");

const createContactForm = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const data = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });
    await data.save();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = createContactForm;
