const uploadFiles = require("../../services/upload-files");
const Contact = require("../../models/ContactUs.model");
const formidable = require("formidable");
const createError = require("http-errors");

const deleteContactForm = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Contact.findOneAndDelete({ _id: ObjectId(id) });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = deleteContactForm;
