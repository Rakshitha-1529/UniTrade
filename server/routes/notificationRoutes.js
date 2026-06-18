const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
"/",
authMiddleware,
async(req,res)=>{

try{

const notifications =
await Notification.find({
userId:req.user.id
})
.sort({
createdAt:-1
});

res.json(notifications);

}
catch(error){

res.status(500).json({
message:error.message
});

}

}
);

module.exports = router;