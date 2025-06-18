const express = require('express');
const UserController = require('../controllers/userController');
const ReviewController = require('../controllers/reviewController');
const authenticated = require('../middlewares/authenticated');

const router = express.Router();

router.post('/sign-up', UserController.signUp);
router.post('/log-in', UserController.login);
router.post('/add/review/', authenticated, ReviewController.addBookReview);
router.post('/update/review/', authenticated, ReviewController.modifyBookReview);
module.exports = router;