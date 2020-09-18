"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
exports.addUser = (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const user = new user_1.User({
        id,
        email,
        name,
        imageUrl
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
//# sourceMappingURL=user.js.map