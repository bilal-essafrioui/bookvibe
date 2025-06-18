const express = require('express');
const BookController = require('../controllers/bookController');

const router = express.Router();

router.get('/books', BookController.showBooks);
router.get('/books/isbn/:isbn', BookController.showBooksByISBN);
router.get('/books/author/:author', BookController.showBooksByAuthor);
router.get('/books/title/:title', BookController.showBooksByTitle);

module.exports = router;