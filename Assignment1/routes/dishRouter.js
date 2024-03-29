const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the dishes to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the dish: ' + req.body.name +
            ' with the details ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })
    .delete((req, res, next) => {
        res.end('Deleting all dishes')
    });

dishRouter.route('/:dishId')
    .get((req, res, next) => {
        res.end('Will add the dishes ' + req.body.name
            + ' with details ' + req.body.description);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes');
    })

    .put((req, res, next) => {
        res.write('Updating the dish: ' + req.params.dishId);
        res.end('\nWill update the dish: ' + req.body.name
            + ' with details ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting dish: ' + req.params.dishId);
    });
module.exports = dishRouter;