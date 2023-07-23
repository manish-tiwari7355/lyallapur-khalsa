const Feedback= require("../../models/FeedbackForm");

const createFeedbackform= async(req, res, next)=>{
    try{
        const {Name, Email, Phone, Subject, Message}= req.body;

        console.log(req.body,".............")

         const feedback= new Feedback({
            Name,
            Email,
            Phone,
            Subject,
            Message
        })

        await feedback.save();

        res.status(200).json({
            success: true,
            message:"Feedback created successfully",
            feedback,
        });
    }

    
    catch(err){
        console.log(err);
        next(err);
        
    }
};

module.exports= createFeedbackform;