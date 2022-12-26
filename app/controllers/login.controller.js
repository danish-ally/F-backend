const loginModel = require('../models').login;
const { sequelize } = require('../models');

module.exports = {
    add(req, res) { console.log('req.body', req.body)
        const payload = {
            phone: req.body.phone,
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            occupation: req.body.occupation,
            profilePicture: req.body.profilePicture,
            coverPicture: req.body.coverPicture,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            mobile: req.body.mobile,
            interest: req.body.interest,
        }
        return loginModel
          .create(payload).then((data) => res.status(200).send(data)).catch((error) => res.status(400).send(error));
      },
    list(req, res) {
        return loginModel
        .findAll()
        .then((data) => res.status(200).send(data))
        .catch((error) => { res.status(400).send(error); });
    },
    getById(req, res) { 
        const id = {mobile: req.params.id};
        console.log("getById", id)
        return loginModel
        .findAll({where: {
            mobile: req.params.id,
          }})
        .then((data) => {
            if (!data) {
            return res.status(404).send({
                message: 'data Not Found',
            });
            }
            return res.status(200).send(data);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
    },
    update(req, res) {
    const id = req.params.id;
    return loginModel
        .findByPk(id)
        .then(data => {
        if (!data) {
            return res.status(404).send({
            message: 'datas Not Found',
            });
        }
        return data
            .update(req.body, {where: { id: id }})
            .then(() => res.status(200).send(data))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    delete(req, res) {
    return loginModel
        .findByPk(req.params.id)
        .then(data => {
        if (!data) {
            return res.status(400).send({
            message: 'data Not Found',
            });
        }
        return data
            .destroy()
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    }
}
