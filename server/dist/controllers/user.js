"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLoginStatus = exports.getUser = exports.addUser = void 0;
const user_1 = require("../models/user");
exports.addUser = (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const isLoggedIn = req.body.isLoggedIn != undefined ? req.body.isLoggedIn : false;
    const user = new user_1.User({
        id,
        email,
        name,
        imageUrl,
        isLoggedIn
    });
    user.save().then(response => {
        return res.status(201).json(response);
    });
};
exports.getUser = (req, res) => {
    const id = req.params.id;
    user_1.User.find({ id }).then(user => {
        return res.status(200).json(user);
    })
        .then(error => {
        return res.status(400).json({ error });
    });
};
exports.updateLoginStatus = (req, res) => {
    const id = req.params.id;
    user_1.User.findOne({ id: id }).then((user) => {
        // @ts-ignore
        user_1.User.updateOne({ id: id }, { "$set": { "isLoggedIn": !user.isLoggedIn } })
            .then(response => {
            return res.status(201).json(response);
        })
            .catch(error => {
            return res.status(400).json({ error });
        });
    });
};
//# sourceMappingURL=user.js.map