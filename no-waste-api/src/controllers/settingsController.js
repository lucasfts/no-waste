const config = require('../../config.json');
const Settings = require('../models/settings');

exports.getByUser = (req, res, next) => {
    Settings.findOne({ userId: req.params.userId })
        .then(settings => {
            if (!settings) return res.status(404).json({ message: 'Settings not found' });
            res.status(200).json(settings);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

exports.create = (req, res, next) => {
    console.log(req.body);
    const settings = new Settings({
        userId: req.body.userId,
        institution: req.body.institution,
        state: req.body.state,
        city: req.body.city
    });
    settings.save()
        .then(result => {
            res.status(201).json({
                message: 'Settings created',
                result: result
            });
        }).catch(err => {
            res.status(500).json({ message: err.message });
        });
};

exports.update = (req, res, next) => {
    let id = req.params.id;
    Settings.updateOne({ _id: id }, { state: req.body.state, city: req.body.city })
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