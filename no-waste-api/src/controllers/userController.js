const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const User = require('../models/user');


exports.getUser = (req, res, next) => {
    let id = req.params.id;
    User.findById(id)
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            var responseUser = {
                name: user.name,
                email: user.email
            };
            res.status(200).json(responseUser);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

exports.createUser = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, config.BCRYPT_SALT)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created',
                        result: result
                    });
                }).catch(err => {
                    res.status(500).json({ message: err.message });
                });
        });
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    console.log(result);
                    if (!result) return res.status(404).json({ message: 'User not found' });
                    const token = signToken(user);
                    res.status(200).json({
                        token: token,
                        expiresIn: 3600,
                        userId: user._id
                    });
                }).catch(err => {
                    res.status(500).json({ message: err.message });
                });

        })
};


exports.updateUser = (req, res, next) => {
    let id = req.params.id;
    User.updateOne({ _id: id }, { name: req.body.name })
        .then(result => {
            console.log(result);
            if (result.n > 0)
                res.status(200).json({ message: 'Update sucessfull!' });
            else
                res.status(401).json({ message: 'Update error!' });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};


signToken = (user) => {
    return jwt.sign(
        {
            email: user.email,
            userId: user._id
        },
        config.JWT_KEY,
        {
            expiresIn: '1h'
        });
};