const { Schema, model } = require("mongoose");


const NewsFeedSchema  = new Schema(
    
    {
        date: {
            type: String,
            required:true,
          },
          year: {
            type: String,
            required:true,
          },
          title:{
            type:String,
        },
        media: [
            {
              url: { type: String },
              type: { type: String, default: "image" },
            },
          ],
      },
      { timestamps: true })

module.exports = model("NewsFeed", NewsFeedSchema,"newsFeed");