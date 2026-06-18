const express = require("express");
const router = express.Router();

const Request = require("../models/Request");
const Notification = require("../models/Notification");
const User = require("../models/User");

const generateOTP = require("../utils/generateOTP");
const transporter = require("../utils/mailer");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
"/create",
authMiddleware,
async(req,res)=>{

try{

const {
resourceId,
authorId
} = req.body;

const request =
await Request.create({
resourceId,
requesterId:req.user.id,
authorId
});

await Notification.create({
userId:authorId,
message:"New resource request received",
type:"request",
data:{
requestId:request._id
}
});

res.status(201).json(request);

}
catch(error){

res.status(500).json({
message:error.message
});

}

}
);

router.post(
"/accept/:id",
authMiddleware,
async(req,res)=>{

try{

const otp = generateOTP();

const request =
await Request.findByIdAndUpdate(
req.params.id,
{
status:"accepted",
otp
},
{
new:true
}
);

if(!request){

return res.status(404).json({
message:"Request not found"
});

}

const requester =
await User.findById(
request.requesterId
);

if(requester){

await transporter.sendMail({
to:requester.email,
subject:"Request Accepted",
html:`

<h3>Your request has been accepted</h3>
<p>OTP: ${otp}</p>
<a href="http://localhost:3000/chat/${request._id}">
Go to Chat
</a>
`
});
}

await Notification.create({
userId:request.requesterId,
message:"Your request has been accepted",
type:"response",
data:{
requestId:request._id
}
});

res.json(request);

}
catch(error){

res.status(500).json({
message:error.message
});

}

}
);

router.post(
"/reject/:id",
authMiddleware,
async(req,res)=>{

try{

const request =
await Request.findByIdAndUpdate(
req.params.id,
{
status:"rejected"
},
{
new:true
}
);

if(!request){

return res.status(404).json({
message:"Request not found"
});

}

await Notification.create({
userId:request.requesterId,
message:"Your request was rejected",
type:"response"
});

res.json(request);

}
catch(error){

res.status(500).json({
message:error.message
});

}

}
);

router.get(
"/myrequests",
authMiddleware,
async(req,res)=>{

try{const requests =await Request.find({requesterId:req.user.id})
.populate("resourceId")
.populate("authorId","name email");

res.json(requests);

}
catch(error){res.status(500).json({message:error.message});
}

}
);

router.get(
"/received",
authMiddleware,
async(req,res)=>{

try{
const requests =
await Request.find({
authorId:req.user.id
})
.populate("resourceId")
.populate("requesterId","name email");
res.json(requests);

}
catch(error){res.status(500).json({message:error.message});

}

}
);

module.exports = router;
