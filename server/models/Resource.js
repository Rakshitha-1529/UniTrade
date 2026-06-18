const mongoose = require("mongoose");
const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  category: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadedBy: { type:mongoose.Schema.Types.ObjectId,ref:"User",required:true },
  downloads: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resource", ResourceSchema);
