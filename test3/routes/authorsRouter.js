const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Authors = require('../models/authors');
const authorRouter = express.Router();

authorRouter.use(bodyParser.json());

authorRouter.route('/')
    .get((req, res, next) => {
        Authors.find({})
            .then((authors) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(authors);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Authors.create(req.body)
            .then((author) => {
                console.log("Authors Created", author);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(author);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /authors');
    })
    .delete((req, res, next) => {
        Authors.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

authorRouter.route('/:authorId')
    .get((req, res, next) => {
        Authors.findById(req.params.authorId)
            .then((author) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(author);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /authors/' + req.param.authorId);
    })
    .put((req, res, next) => {
        Authors.findByIdAndUpdate(req.params.authorId, {
            $set: req.body
        }, { new: true })
            .then((author) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(author);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Authors.findByIdAndRemove(req.params.authorId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
module.exports = authorRouter;