const PlacementCell= require("../../models/PlacementCell");

const createPlacementCell= async(req, res, next)=>{
    try{
        const {name,designation,email,phone}= req.body;


         const placementCell= new PlacementCell({
            name,
            designation,
            email,
            phone
        })

        await placementCell.save();

        res.status(200).json({
            success: true,
            message:"Placement cell created successfully",
            placementCell,
        });
    }

    
    catch(err){
        console.log(err);
        next(err);
        
    }
};

module.exports= createPlacementCell;