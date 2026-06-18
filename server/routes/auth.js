const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const authMiddleware=require("../middleware/authMiddleware");
const router=express.Router();

router.post("/register",async(req,res)=>{
try{
const{name,email,password,department,year,semester}=req.body;
const emailRegex=/^[0-9]{5}[a-zA-Z][0-9]{4}@pvpsit\.ac\.in$/;
if(!emailRegex.test(email)){
return res.status(400).json({message:"Use a valid PVPSIT email"});
}
const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
if(!passwordRegex.test(password)){
return res.status(400).json({message:"Password must have 8+ chars, uppercase, lowercase, number and special character"});
}
const existingUser=await User.findOne({email});
if(existingUser){
return res.status(400).json({message:"Email already exists"});
}
const hashedPassword=await bcrypt.hash(password,10);
const user=new User({name,email,password:hashedPassword,department,year,semester});
await user.save();
res.status(201).json({message:"Registration successful"});
}catch(error){
res.status(500).json({message:error.message});
}
});

router.post("/login",async(req,res)=>{
try{
const{email,password}=req.body;
const user=await User.findOne({email});
if(!user){
return res.status(404).json({message:"User not found"});
}
const validPassword=await bcrypt.compare(password,user.password);
if(!validPassword){
return res.status(401).json({message:"Invalid password"});
}
const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax"});
res.json({message:"Login successful",user:{id:user._id,name:user.name,email:user.email,department:user.department,year:user.year,semester:user.semester}});
}catch(error){
res.status(500).json({message:error.message});
}
});

router.post("/logout",(req,res)=>{
res.clearCookie("token");
res.json({message:"Logged out successfully"});
});

router.get("/me",authMiddleware,async(req,res)=>{
try{
const user=await User.findById(req.user.id).select("-password");
res.json(user);
}catch(error){
res.status(500).json({message:error.message});
}
});

module.exports=router;