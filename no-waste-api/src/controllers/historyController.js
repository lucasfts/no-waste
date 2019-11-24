const History = require('../models/history');


exports.getBySettings = (req, res, next) => {
    History.find({ 'settings._id' : req.params.settingsId })
        .then(histories => {
            if (!histories)
                return res.status(404).json({ message: 'Histories not found' });
            res.status(200).json(histories);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

exports.getById = (req, res, next) => {
    History.findById( req.params.historyId )
        .then(history => {
            if (!history)
                return res.status(404).json({ message: 'History not found' });
            res.status(200).json(history);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

exports.create = (req, res, next) => {
    console.log(req.body);

    const history = new History({
        settings: req.body.settings,
        date: req.body.date,
        hour: req.body.hour,
        wheater: req.body.wheater,
        meals: req.body.meals,
        events: req.body.events
    });

    history.save()
        .then(result => {
            res.status(201).json({
                message: 'History created',
                result: result._id
            });
        }).catch(err => {
            res.status(500).json({ message: err.message });
        });
};

exports.update = (req, res, next) => {
    console.log(req.body);

    const history = {
        date: req.body.date,
        hour: req.body.hour,
        wheater: req.body.wheater,
        meals: req.body.meals,
        events: req.body.events
    };

    History.updateOne({ _id: req.params.historyId }, { $set: history })
        .then(result => {
           if (result.n > 0) {
            res.status(201).json({
                message: 'History updated',
                result: result._id
            });
           }
           else{
            res.status(404).json({ message: 'History not found' });
           }
        }).catch(err => {
            res.status(500).json({ message: err.message });
        });
};

exports.delete = (req, res, next) => {
    History.deleteOne({ _id: req.params.historyId })
        .then(result => {
            if (!result || result.n == 0 )
                return res.status(404).json({ message: 'Histórico não existe' });
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};
