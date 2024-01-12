const express = require('express');
const genresRouter = express.Router();
const bodyParser = require('body-parser');

genresRouter.use(bodyParser.json());

genresRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the genres to you!')
    })
    .post((req, res, next) => {
        res.end('Will add the genres ' + req.body.name);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /books');
    })
    .delete((req, res, next) => {
        res.end('Deleting all genres');
    });

genresRouter.route('/:genresId')

    .get((req, res, next) => {
        res.end('Will add the genre ' + req.body.name);
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /genres/' + req.params.genresId);
    })

    .put((req, res, next) => {
        res.write('Updating the genre: ' + req.params.genresId + '\n');
        res.end('Will update the genre: ' + req.body.name);
    })

    .delete((req, res, next) => {
        res.end('Deleting genre: ' + req.params.genresId);
    });

module.exports = genresRouter;