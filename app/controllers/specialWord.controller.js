const db = require("../models");
const SpecialWord = db.specialWord;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.word) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a User
    const specialWord = {
      word: req.body.word
    };
    // Save User in the database
    SpecialWord.create(specialWord)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };

  exports.findAll = (req, res) => {
    SpecialWord.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };