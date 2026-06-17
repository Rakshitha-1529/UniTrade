const express = require("express");

const Message = require("../models/Message");

const router = express.Router();


// Save message

router.post("/", async(req,res)=>{

try{

const message = new Message(

req.body

);

await message.save();

res.json({

message:"Message saved"

});

}

catch(error){

res.status(500).json({

message:error.message

});

}

});


// Chat history

router.get("/", async(req,res)=>{

try{

const messages = await Message.find();

res.json(messages);

}

catch(error){

res.status(500).json({

message:error.message

});

}

});

module.exports = router;