const Settings = require('../models/settings');
const UserSettings = require('../models/userSettings');

exports.getByUser = (req, res, next) => {
    UserSettings.findOne({ userId: req.params.userId })
    .then(userSettings => {
        Settings.findOne({ _id: userSettings.settingsId })
        .then(settings => {
            if (!settings) return res.status(404).json({ message: 'Settings not found' });
            res.status(200).json(settings);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
};

exports.create = (req, res, next) => {
    console.log(req.body);

    const settings = new Settings({
        institution: req.body.institution,
        averagePeople: req.body.averagePeople,
        state: req.body.state,
        city: req.body.city
    });

    settings.save()
        .then(settingsResult => {
            const userSettings = new UserSettings({
                userId: req.body.userId,
                settingsId: settingsResult._id
            });
            userSettings.save().then(result => {
                res.status(201).json({
                    message: 'Settings created',
                    result: result._id
                });
            });
        }).catch(err => {
            res.status(500).json({ message: err.message });
        });
};

exports.update = (req, res, next) => {
    const id = req.params.id;

    const settings = {
        institution: req.body.institution,
        averagePeople: req.body.averagePeople,
        state: req.body.state,
        city: req.body.city
    }

    Settings.updateOne({ _id: id },settings)
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