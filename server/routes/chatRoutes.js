const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

router.get("/:requestId", async (req, res) => {
  try {
    const messages = await Chat.find({
      requestId: req.params.requestId,
    })
      .populate("senderId", "name")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { requestId, senderId, message } = req.body;

    const chat = new Chat({
      requestId,
      senderId,
      message,
    });

    await chat.save();

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;