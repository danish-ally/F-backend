const chest = require('../../models').chest;

module.exports = {
    add(req, res) { console.log('req.body', req.body)
        const payload = {
            offer: req.body.offer
        }
        return chest
          .create(payload).then((data) => res.status(200).send(data)).catch((error) => res.status(400).send(error));
    },
    list(req, res) {
        return chest
        .findAll({
        nest : true})
        .then((data) => res.status(200).send(data))
        .catch((error) => { res.status(400).send(error); });
    }
}