const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
resourceId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Resource",
required:true
},
requesterId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},
authorId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},
status:{
type:String,
enum:["pending","accepted","rejected","completed"],
default:"pending"
},
otp:{
type:String,
default:null
},
createdAt:{
type:Date,
default:Date.now
}
});

module.exports = mongoose.model(
"Request",
requestSchema
);