const ReviewModel = require('../models/reviewModel');

class ReviewController {
    //
    static async showBookReviews(req, res) {
        try {
            const id_book = req.params.id_book;

            if (!id_book) {
                return res.status(400).json({ message: "Id book is required" });
            }

            const reviews = await ReviewModel.getBookReviews(id_book);

            if (reviews.length === 0) {
                return res.status(404).json({ message: "This book has no reviews." });
            }

            res.status(200).json({message: "Reviews fetched successfully", data: reviews});
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }

    //
    static async addBookReview(req, res) {
        try {
            const id_user = req.user.userId;
            const { id_book, review, stars = null } = req.body;
            
            if (!id_user || !id_book || !review) return res.status(400).json({ message: 'Missed data' });

            const result = await ReviewModel.insertReview(id_user, id_book, review, stars);
            if (result.success) {
                res.status(201).json({ message: 'Review added', reviewId: result.insertId });
            } else {
                res.status(500).json({ message: 'Failed to add review', error: result.error });
            }

        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    //
    static async modifyBookReview(req, res) {
        try {
            const {id_review, newReview} = req.body;
            if (!id_review) return res.status(400).json({ message: 'Missed data' });

            const result = await ReviewModel.updateReview(newReview, id_review);

            if (review.success) {
                res.status(200).json({ message: 'Review updated'});
            } else {
                res.status(500).json({ message: 'failed to update review'});
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message});
        }
    }
}

module.exports = ReviewController;