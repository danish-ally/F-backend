const db = require("../models");
const Activity = db.activity;

exports.create = (req, res) => {
    // Validate request
    if (!(req.body.name)) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a User
    const activity = {
        // type:req.body.typeId,
      name: req.body.name
    };
    // Save User in the database
    Activity.create(activity)
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
    Activity.findAll({
    })
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