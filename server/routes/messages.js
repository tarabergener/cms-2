var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/messages");

router.get("/", (req, res, next) => {
  Message.find()
    .then((messages) => {
      res.status(200).json({
        message: "Messages retrieved successfully!",
        messages: messages,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const maxMessagesId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessagesId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  message
    .save()
    .then((createdMessage) => {
      res.status(201).json({
        message: "Message added successfully",
        message: createdMessage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      message.name = req.body.name;
      message.description = req.body.description;
      message.url = req.body.url;

      Message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully!",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      Message.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Message deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

module.exports = router;
