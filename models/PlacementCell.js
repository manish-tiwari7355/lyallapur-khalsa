const{Schema,model} =require("mongoose");


const placementCellSchema= new Schema(
{
name:{
    type:String
},

designation:{
    type:String    
},

email:{
    type:String
},

phone:{
    type:String
},

}, 
{
    timestamps: true,
  }
);

module.exports= model("placementCell", placementCellSchema);