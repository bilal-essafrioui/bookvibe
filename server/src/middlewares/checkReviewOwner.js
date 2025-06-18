const reviewController = require('../models/reviewModel');

const checkReviewOwner = async (req, res, next) => {
    try {

        const { id_review } = req.body;
        const id_user = req.user.userId;

        const review = await reviewController.geUserReview(id_review, id_user);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        if (review.user_id !== id_user) return res.status(403).json({ message: 'Forbidden: not your review' });
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
}

module.exports = checkReviewOwner;