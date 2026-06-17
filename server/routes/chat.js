const express = require("express");

const Chat = require("../models/Chat");

const router = express.Router();


// Get all messages

router.get("/", async (req, res) => {

  try {

    const chats = await Chat.find()

    .sort({

      createdAt: 1

    });

    res.json(chats);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});


// Send message

router.post("/", async (req, res) => {

  try {

    const {

      sender,

      message

    } = req.body;

    const chat = new Chat({

      sender,

      message

    });

    await chat.save();

    res.status(201).json({

      message: "Message sent"

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

});

module.exports = router;