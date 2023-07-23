const UpcommingPlacement= require("../../models/UpcommingPlacement.model");

const createUpcommingPlacement= async(req, res, next)=>{
    try{
        const {date,title,description,eligibility,designation,location,Registration_Last_Date,Online_Assessment,package}= req.body;


         const upcommingPlacement= new UpcommingPlacement({
            date,
            title,
            description,
            eligibility,
            designation,
            location,
            Registration_Last_Date,
            Online_Assessment,
            package
        })

        await upcommingPlacement.save();

        res.status(200).json({
            success: true,
            message:"upcoming placement created successfully",
            upcommingPlacement,
        });
    }

    
    catch(err){
        console.log(err);
        next(err);
        
    }
};

module.exports= createUpcommingPlacement;