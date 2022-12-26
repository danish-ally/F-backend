const profile = require('../../models').profile;
const login = require('../../models').login;

module.exports = {
    async add(req, res) { console.log('profile.req.body', req.body)
        const Login = await login.findAll();
        let loginData = JSON.stringify(Login);
        let parseLoginData = JSON.parse(loginData);
        const loginSelectedData = parseLoginData.filter(e => e.mobile === req.body.mobileUniqueID)
        // console.log("loginSelectedData", loginSelectedData)
        const payload = {
            userId: loginSelectedData[0].id,
            mobileUniqueID: req.body.mobileUniqueID,
            profilePicture: loginSelectedData[0].profilePicture,
            coverPicture: loginSelectedData[0].coverPicture,
            name: loginSelectedData[0].name,
            endorsed: req.body.endorsed,
            genuine: req.body.genuine,
            followers: req.body.followers,
            following: req.body.following,
            gifts: req.body.gifts,
            occupation: req.body.occupation,
            education: req.body.education,
            maritalStatus: req.body.maritalStatus,
            location: req.body.location,
        }
        
        try {
            const data = await profile
                .create(payload);
            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    async list(req, res) {
        try {
            // console.log("login", Login)
            const data = await profile.findAll({
                include: [{ model: login, attributes: ['name', 'profilePicture', 'coverPicture']}]
            });
            return res.status(200).send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getById(req, res) { console.log("req.params", req.params.id)
        const id = req.params.id;
        return profile
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
    return profile
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
        return profile
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