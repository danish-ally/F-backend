const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a User
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    countryCode: req.body.countryCode,
    phoneNumber: req.body.phoneNumber,

  };
  // Save User in the database
  User.create(user)
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
  const firstName = req.query.firstName;
  var condition = firstName ? { firstName: { [Op.iLike]: `%${firstName}%` } } : null;
  User.findAll({ where: condition }, {
    include: [{
      model: db.posts,
      as: 'posts',
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




// 1) get details of list of number

exports.findByPhoneNumber = async (req, res) => {
  const contacts = req.body.contacts;

  let users = [];

  for (let i = 0; i < contacts.length; i++) {
    var element = contacts[i].slice(2)

    await User.findAll({

      where: {
        phoneNumber: element,
      },
    })
      .then((data) => {

        users.push({ "userId": data[0].userId, "firstName": data[0].firstName, "lastName": data[0].lastName, "countryCode": data[0].countryCode, "phoneNumber": data[0].phoneNumber, "photo": data[0].photo })
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving orders",
        });
      });


  }

  res.send(users)
};