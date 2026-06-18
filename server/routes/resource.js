const express = require("express");
const multer = require("multer");
const Resource = require("../models/Resource");

const router = express.Router();

const storage = multer.diskStorage({
destination:(req,file,cb)=>{
cb(null,"uploads");
},
filename:(req,file,cb)=>{
cb(
null,
Date.now() +
"-" +
file.originalname
);
}
});

const fileFilter = (req,file,cb)=>{

const allowed = [
"application/pdf",
"image/png",
"image/jpeg",
"image/jpg"
];

if(
allowed.includes(
file.mimetype
)
){
cb(null,true);
}
else{
cb(
new Error(
"Only PDF and images allowed"
)
);
}

};

const upload = multer({
storage,
fileFilter,
limits:{
fileSize:10*1024*1024
}
});

router.post(
"/",
upload.single("file"),
async(req,res)=>{

try{

const resource = new Resource({
title:req.body.title,
subject:req.body.subject,
category:req.body.category,
uploadedBy:req.body.uploadedBy,
fileName:req.file.filename,
filePath:`uploads/${req.file.filename}`
});

await resource.save();

res.status(201).json({
message:"Resource Uploaded"
});

}
catch(error){

console.log(error);

res.status(500).json({
message:error.message
});

}

}
);

router.get(
"/",
async(req,res)=>{

try{

const resources =
await Resource.find()
.populate(
"uploadedBy",
"name email"
)
.sort({
uploadDate:-1
});

res.json(resources);

}
catch(error){

res.status(500).json({
message:error.message
});

}

}
);

router.get(
"/user/:id",
async(req,res)=>{

try{

const resources =
await Resource.find({
uploadedBy:req.params.id
})
.populate(
"uploadedBy",
"name email"
);

res.json(resources);

}
catch(error){

res.status(500).json({
message:error.message
});

}

}
);

router.put(
"/download/:id",
async(req,res)=>{

try{

const resource =
await Resource.findById(
req.params.id
);

if(!resource){

return res.status(404).json({
message:"Resource not found"
});

}

resource.downloads++;

await resource.save();

res.json({
message:"Download updated"
});

}
catch(error){

res.status(500).json({
message:error.message
});

}

}
);

router.delete(
"/:id",
async(req,res)=>{

try{

const resource =
await Resource.findByIdAndDelete(
req.params.id
);

if(!resource){

return res.status(404).json({
message:"Resource not found"
});

}

res.json({
message:"Deleted successfully"
});

}
catch(error){

res.status(500).json({
message:error.message
});

}

}
);

module.exports = router;