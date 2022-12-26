const interest = require('../models').interest;
const { sequelize } = require('../models');

module.exports = {
    async add(req, res) { console.log('interest.req.body', req.body)
        const payload = {
            phone: req.body.phone,
            interest: req.body.interest,
        }
        try {
            const data = await interest
                .create(payload);
            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    async list(req, res) {
        try {
            const data = await interest
                .findAll({ nest: true });
            return res.status(200).send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}