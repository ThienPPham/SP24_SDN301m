const express = require('express');
const bodyParser = require('body-parser');
const favoriteRouter = express.Router();
const mongoose = require('mongoose');

const Favorites = require('../models/favorite');
var authenticate = require('./authenticate');
const Dishes = require('../models/dishes');


favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .populate('user')
            .populate('dishes')
            .then((favorites) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser,
        (req, res, next) => {
            Favorites.find({})
                .populate('user')
                .populate('dishes')
                .then((favourites) => {
                    var user;
                    if (favourites)
                        user = favourites.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
                    if (!user)
                        user = new Favorites({ user: req.user.id });
                    for (let i of req.body) {
                        if (user.dishes.find((d_id) => {
                            if (d_id._id) {
                                return d_id._id.toString() === i._id.toString();
                            }
                        }))
                            continue;
                        user.dishes.push(i._id);
                    }
                    user.save()
                        .then((userFavs) => {
                            res.statusCode = 201;
                            res.setHeader("Content-Type", "application/json");
                            res.json(userFavs);
                            console.log("Favorites Created");
                        }, (err) => next(err))
                        .catch((err) => next(err));

                })
                .catch((err) => next(err));
        })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOneAndRemove({ user: req.user._id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ message: "Deletion successful", deletedDocument: resp });
            }, (err) => next(err))
            .catch((err) => next(err));
    });

favoriteRouter.route('/:dishId')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (!dish) {
                    const err = new Error('Dish not found');
                    err.status = 404;
                    return next(err);
                }
                Favorites.findOne({ user: req.user._id })
                    .then((favorites) => {
                        if (favorites && favorites.dishes.includes(req.params.dishId)) {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({ favorite: true, dish: dish });
                        } else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({ favorite: false});
                        }
                    })
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .then((favorites) => {
                if (!favorites) {
                    Favorites.create({ user: req.user._id, dishes: [req.params.dishId] })
                        .then((favorites) => {
                            console.log('Favorite Created ', favorites);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorites);
                        }, (err) => next(err));
                } else {
                    if (favorites.dishes.indexOf(req.params.dishId) === -1) {
                        favorites.dishes.push(req.params.dishId);
                        favorites.save()
                            .then((favorites) => {
                                console.log('Favorite Updated ', favorites);
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favorites);
                            }, (err) => next(err));
                    } else {
                        res.statusCode = 403;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end('Dish ' + req.params.dishId + ' already exists in your favorites!');
                    }
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .then((favorites) => {
                if (favorites.dishes.indexOf(req.params.dishId) !== -1) {
                    favorites.dishes.remove(req.params.dishId);
                    favorites.save()
                        .then((favorites) => {
                            console.log('Favorite Dish Removed ', favorites);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorites);
                        }, (err) => next(err));
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Dish ' + req.params.dishId + ' not found in your favorites!');
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = favoriteRouter;
