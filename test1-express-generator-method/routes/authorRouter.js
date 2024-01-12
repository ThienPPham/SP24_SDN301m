const express = require('express');
const authorsRouter = express.Router();
const bodyParser = require('body-parser');

authorsRouter.use(bodyParser.json());

authorsRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the authors to you!')
    })
    .post((req, res, next) => {
        res.end('Will add the author ' + req.body.name + ' with details:\nbirthYear: '
            + req.body.birthYear + '\ncountry: ' + req.body.country);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /authors');
    })
    .delete((req, res, next) => {
        res.end('Deleting all authors');
    });

authorsRouter.route('/:authorsId')

    .get((req, res, next) => {
        res.end('Will add the author ' + req.body.name + ' with details:\nbirthYear: '
        + req.body.birthYear + '\ncountry: ' + req.body.country);
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /authors/' + req.params.authorsId);
    })

    .put((req, res, next) => {
        res.write('Updating the author: ' + req.params.authorsId + '\n');
        res.end('Will update the author: ' + req.body.name +
            ' with birthYear: ' + req.body.birthYear);
    })

    .delete((req, res, next) => {
        res.end('Deleting author: ' + req.params.authorsId);
    });

module.exports = authorsRouter;