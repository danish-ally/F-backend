const home = require('../models').home;
const profile = require('../models').profile;
const login = require('../models').login;

module.exports = {
    async add(req, res) { console.log('home.req.body', req.body);
        const profileResponse = await profile.findAll();
        let profileData = JSON.stringify(profileResponse);
        let parseProfileData = JSON.parse(profileData);
        const profileSelectedData = parseProfileData.filter(e => e.mobileUniqueID === req.body.mobileUniqueID)
        // console.log("profileResponse", parseProfileData);
        const payload = {
            userId: profileSelectedData[0].userId,
            mobileUniqueID: req.body.mobileUniqueID,
            profilePicture: profileSelectedData[0].profilePicture,
            coverPicture: profileSelectedData[0].coverPicture,
            name: profileSelectedData[0].name,
        }
        console.log("profileResponse", payload.userId);
        try {
            const data = await home.create(payload);
            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async list(req, res) {
        try {
            const data = await home.findAll();
            return res.status(200).send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getById(req, res) { console.log("req.params", req.params.id)
        const id = req.params.id;
        return home
        .findByPk(id)
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
    return home
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
    return home
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