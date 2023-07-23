const { Schema, model } = require("mongoose");


const feedbackSchema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },

        Phone: {
            type: String,
            required: true
        },

        Subject: {
            type: String,
            required: true
        },

        Message: {
            type: String,
            required: true
        }
        
    },
    {
        timestamps: true
    }
);

module.exports = model("Feedback", feedbackSchema,"feedback");