const Food = require('../models/food');

exports.getBySettings = (req, res, next) => {
    Food.find({ settingsId: req.params.settingsId })
        .then(foods => {
            if (!foods)
                return res.status(404).json({ message: 'Foods not found' });
            res.status(200).json(foods);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};


exports.create = (req, res, next) => {
    console.log(req.body);

    const food = new Food({
        settingsId: req.body.settingsId,
        name: req.body.name,
        unit: req.body.unit,
        category: req.body.category
    });

    Food.findOne({ settingsId: req.body.settingsId, name: req.body.name })
        .then(hasFood => {
            if (hasFood)
                return res.status(404).json({ message: 'Este alimento já existe' });
            food.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Food created',
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
    Food.deleteOne({ _id: req.params.foodId })
        .then(result => {
            if (!result || result.n == 0 )
                return res.status(404).json({ message: 'Alimento não existe' });
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};
