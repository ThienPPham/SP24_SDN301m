const express = require('express');
http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const booksRouter = require('./routes/booksRouter');
const genresRouter = require('./routes/genresRouter');
const authorsRouter = require('./routes/authorRouter');

const hostname = 'localhost'
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/books', booksRouter);
app.use('/genres', genresRouter);
app.use('/authors', authorsRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
