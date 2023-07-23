const { Schema, model } = require("mongoose");

const noticeBoardSchema = new Schema(
  {
    date: {
      type: Date,
    },

    title: {
      type: String,
    },

    description: {
      type: String,
    },
    media: [
      {
        url: { type: String },
        type: { type: String, default: "image" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("NoticeBoard", noticeBoardSchema, "noticeBoard");
