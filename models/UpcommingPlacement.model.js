const{Schema,model} =require("mongoose");


const upcommingplacementSchema= new Schema(
{
date:{
    type:Date
},

title:{
    type:String    
},

description:{
    type:String
},

eligibility:{
    type:String
},

designation:{
    type:String
},

location:{
    type:String
},

Registration_Last_Date:{
    type:Date
    
},

Online_Assessment :{
    type:String
},

package :{
    type:String
},


}, 
{
    timestamps: true,
  }
);

module.exports= model("upcommingplacement", upcommingplacementSchema);