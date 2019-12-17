const HistoryEvent = require('../models/historyEvent');

exports.getBySettings = (req, res, next) => {
    HistoryEvent.find({ settingsId: req.params.settingsId })
        .then(historyEvent => {
            if (!historyEvent)
                return res.status(404).json({ message: 'Event not found' });
            res.status(200).json(historyEvent);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

exports.create = (req, res, next) => {
    console.log(req.body);

    const historyEvent = new HistoryEvent({
        settingsId: req.body.settingsId,
        name: req.body.name
    });

    HistoryEvent.findOne({ settingsId: req.body.settingsId, name: req.body.name })
        .then(hasEvent => {
            if (hasEvent)
                return res.status(404).json({ message: 'Este evento já existe' });
            historyEvent.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Event created',
                        result: result._id
                    });
                }).catch(err => {
                    res.status(500).json({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

exports.delete = (req, res, next) => {
    HistoryEvent.deleteOne({ _id: req.params.eventId })
        .then(result => {
            if (!result || result.n == 0 )
                return res.status(404).json({ message: 'Evento não existe' });
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};
