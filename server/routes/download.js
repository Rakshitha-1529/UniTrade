const express = require("express");
const Resource = require("../models/Resource");
const Download = require("../models/Download");
const router = express.Router();

router.post("/:id", async(req,res)=>{

try{

const resource = await Resource.findById(

req.params.id

);

if(!resource){

return res.status(404).json({

message:"Not found"

});

}

resource.downloads++;

await resource.save();

const download = new Download({

resourceId:req.params.id,

userEmail:req.body.email

});

await download.save();

res.json({

message:"Download stored"

});

}

catch(error){

res.status(500).json({

message:error.message

});

}

});

module.exports = router;