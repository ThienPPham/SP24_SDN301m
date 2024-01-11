const express = require('express');
const booksRouter = express.Router();
const bodyParser = require('body-parser');

booksRouter.use(bodyParser.json());

booksRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the book to you!')
    })
    .post((req, res, next) => {
        res.end('Will add the book ' + req.body.title + ' with details:\nSubTitle: '
            + req.body.subTitle + '\npublish_date: ' + req.body.publish_date
            + '\npublisher: ' + req.body.publisher + '\npages: ' + req.body.pages
            + '\ndescription: ' + req.body.description + '\nwebsite' + req.body.website);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /books');
    })
    .delete((req, res, next) => {
        res.end('Deleting all books');
    });

booksRouter.route('/:booksId')

    .get((req, res, next) => {
        res.end('Will add the book ' + req.body.title + ' with details:\nSubTitle: '
            + req.body.subTitle + '\npublish_date: ' + req.body.publish_date
            + '\npublisher: ' + req.body.publisher + '\npages: ' + req.body.pages
            + '\ndescription: ' + req.body.description + '\nwebsite' + req.body.website);
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /books/' + req.params.booksId);
    })

    .put((req, res, next) => {
        res.write('Updating the book: ' + req.params.booksId + '\n');
        res.end('Will update the book: ' + req.body.title +
            ' with subTitle: ' + req.body.subTitle);
    })

    .delete((req, res, next) => {
        res.end('Deleting book: ' + req.params.booksId);
    });

module.exports = booksRouter;