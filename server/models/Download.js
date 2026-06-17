const mongoose = require("mongoose");

const DownloadSchema = new mongoose.Schema({

  resourceId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "Resource"

  },

  userEmail: {

    type: String,

    required: true

  },

  downloadDate: {

    type: Date,

    default: Date.now

  }

});

module.exports = mongoose.model(
  "Download",
  DownloadSchema
);