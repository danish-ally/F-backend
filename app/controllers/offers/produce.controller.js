const produce = require('../../models').produce;

module.exports = {
    async add(req, res) { console.log('req.body', req.body.items)
        const payload = {
            items: req.body.items
        }
        try {
            const data = await produce
                .create(payload);
            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    async list(req, res) {
        try {
            const data = await produce
                .findAll({
                    nest: true
                });
            return res.status(200).send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}