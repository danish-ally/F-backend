const db = require("../models");
const ActivityType = db.activityType;

exports.create = (req, res) => {
    // Validate request
    if (!(req.body.type)) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a User
    const activityType = {
        type:req.body.type,
    };
    // Save User in the database
    ActivityType.create(activityType)
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
    ActivityType.findAll()
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