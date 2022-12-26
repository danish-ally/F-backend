const db = require("../models");
const Group = db.group;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.word) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a User
    const group = {
      name: req.body.name
    };
    // Save User in the database
    Group.create(group)
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
    Group.findAll() 
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