const { Router } = require('express');

const router = Router();

router.use((req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.send(401);
    };
});

const supermarkets = [
    {
        id: 1,
        name: 'Walmart',
        miles: 1,
    },
    {
        id: 2,
        name: 'Target',
        miles: 3,
    },
    {
        id: 3,
        name: 'alfa',
        miles: 5,
    },
    {
        id: 4,
        name: 'HEB',
        miles: 7,
    },
    {
        id: 5,
        name: 'Kroger',
        miles: 9,
    },
    {
        id: 6,
        name: 'Sams',
        miles: 11,
    },
];

// query parameter
router.get('', (req, res) => {
    const { miles } = req.query;
    const parsedMiles = parseInt(miles);
    if (!isNaN(parsedMiles)) {
        const filteredStores = supermarkets.filter((s) => s.miles <= parsedMiles);
        res.send(filteredStores);
    }else{
        res.send(supermarkets);
    }
});

module.exports = router;