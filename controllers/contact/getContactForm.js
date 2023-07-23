const uploadFiles = require("../../services/upload-files");
const Contact = require("../../models/ContactUs.model");
const formidable = require("formidable");
const createError = require("http-errors");

const updateContactForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Contact.findOne({ _id: ObjectId(id) });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = updateContactForm;
