const { boolean } = require("joi");
const { Schema, model } = require("mongoose");

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },

    phone: {
      type: String,

      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,

      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Contact", ContactSchema, "contact");
