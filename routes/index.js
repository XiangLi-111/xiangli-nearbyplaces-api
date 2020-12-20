var express = require('express');
var router = express.Router();
const {Place} = require('../db/model');
const Op = require('sequelize').Op;

router.post('/place', async function (req, res, next) {
    console.log(req.body, req.headers.referer)
    const {
        name,
        category,
        city,
        state,
        description,
        review,
    } = req.body;

    if (!name || !category || !city || !state) {
        res.redirect(`${req.headers.referer}mynearbyplaces/error`);
    } else {
        const place = await Place.create({category, name, city, state, description: description || '', reviews: review || 0});
        res.redirect(`${req.headers.referer}mynearbyplaces/success`);
    }

    // res.render('index', { title: 'Express' });
});

router.get('/places', async function (req, res, next) {
    const list = await Place.findAll({ attributes: { exclude: ['reviews'] } });
    res.json(list);
});

router.post('/review/:placeId', async function (req, res, next) {
    console.log(req.body, req.params)
    if (!req.body.review) {
        res.redirect(`${req.headers.referer}mynearbyplaces/error`);
    } else {
        await Place.increment({
            reviews: req.body.review,
            reviewNumbers: 1
        }, {
            where: {
                id: req.params.placeId
            }
        })
        res.json({
            msg: 'review update success'
        });
    }

});

router.get('/search/:searchItem/:location', async function (req, res, next) {
    const {
        searchItem,
        location
    } = req.params;
    const category = {
        Restaurants: 1,
        Delivery: 1,
        Takeout: 1,
        Accountants: 1,
        Plumbers: 1,
        'Auto': 1,
    }
    if (category[searchItem]) {
        const list = await Place.findAll({
            where: {
                category: searchItem,
                city: {
                    [Op.like]: `%${location === 'all' ? '' : location}%`
                }
            },
            // attributes: { exclude: ['reviews'] }
        })
        res.json(list);
    } else {
        const list = await Place.findAll({
            where: {
                name: {
                    [Op.like]: `%${searchItem}%`
                },
                city: {
                    [Op.like]: `%${location === 'all' ? '' : location}%`
                }
            },
            // attributes: { exclude: ['reviews'] }
        })
        res.json(list);
    }

});


module.exports = router;
