const { boolean } = require("joi");
const { Schema, model } = require("mongoose");

const EnquiryFormSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    courseInterested: {
      type: String,
      enum: ["First Choice", "Second Choice", "Third Choice"],
    },
    phone: {
      type: String,

      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Enquiry", EnquiryFormSchema, "enquiry");
