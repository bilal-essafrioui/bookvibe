const express = require('express');
const booksRouter = require('./routes/bookRoutes');
const reviewsRouter = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/', booksRouter);
app.use('/book', reviewsRouter);
app.use('/auth', authRoutes);

module.exports = app; 