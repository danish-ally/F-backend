const db = require("../models");
const GroupMember = db.groupMember;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.word) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a User
    const groupMember = {
      userId: req.body.userId,
      groupId:req.body.groupId
    };
    // Save User in the database
    GroupMember.create(groupMember)
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

  exports.findAllByUserId = (req, res) => {

    const userId = req.query.userId;
    GroupMember.findAll({
        where:{userId:userId},
        include: [{
            model: db.group,
            as: 'groups',
          }]
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