const { Schema, model } = require("mongoose");


const MediaSchema  = new Schema(
    
    { 
        title:{
            type:String,
            required: true,

            
        },



        media: [
        {
          url: { type: String },
          type: { type: String, default: "image" },
        },
        {
            url: { type: String },
            type: { type: String, default: "image" },
          },
      ],
    
    
        
  },
  { timestamps: true })

module.exports = model("Media", MediaSchema,"media");