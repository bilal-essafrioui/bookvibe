const express = require('express');
const ReviewController = require('../controllers/reviewController');

const router = express.Router();

router.get('/reviews/:id_book', ReviewController.showBookReviews);


module.exports = router;