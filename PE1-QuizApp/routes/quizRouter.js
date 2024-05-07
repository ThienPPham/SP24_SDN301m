const express = require('express');
const bodyParser = require('body-parser');
const quizRouter = express.Router();
const mongoose = require('mongoose');

const Quizzes = require('../models/quiz');
var authenticate = require('./authenticate');
const Questions = require('../models/question');

quizRouter.use(bodyParser.json());

quizRouter.route('/')
    .get((req, res, next) => {
        Quizzes.find({})
            .populate('questions')
            .then((quiz) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(quiz);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Quizzes.create(req.body)
            .then((quiz) => {
                console.log('Quizz Created', quiz);
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(quiz);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /quizzes');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Quizzes.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
quizRouter.route('/:quizId')
    .get((req, res, next) => {
        Quizzes.findById(req.params.quizId)
            .populate('questions')
            .then((quiz) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(quiz);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /quizzes/' + req.param.quizId);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        Quizzes.findByIdAndUpdate(req.params.quizId, {
            $set: req.body
        }, { new: true })
            .then((quiz) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(quiz);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Quizzes.findByIdAndRemove(req.params.quizId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => (err))
            .catch((err) => next(err));
    });
quizRouter.post('/:quizId/questions', async (req, res) => {
    try {
        // Create a new question document
        const newQuestion = new Questions(req.body);
        const question = await newQuestion.save();

        // Find the quiz by ID and add the question's ObjectId to the questions array
        const quiz = await Quizzes.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).send('Quiz not found');
        }
        quiz.questions.push(question._id);
        await quiz.save();

        res.status(201).send(question);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
module.exports = quizRouter;