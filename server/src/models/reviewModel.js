const pool = require('../config/db');

class ReviewModel {

    // getting book reviews
    static async getBookReviews(id_book) {
        try {
            const [reviews] = await pool.execute(
                "SELECT users.full_name, books.title, reviews.review, reviews.stars FROM books JOIN reviews ON books.id_book = reviews.id_book JOIN users ON reviews.id_user = users.id_user WHERE reviews.id_book = ?",
                [id_book]
            );
            return reviews;
        } catch (error) {
            console.error("Error while getting book reviews !", error);
            throw error;
        }
    }

    // add book review
    static async insertReview ( id_user, id_book, review, stars) {
        try {
            const [result] = await pool.execute(
                "INSERT INTO reviews (id_user, id_book, review, stars) VALUES (?, ?, ?, ?)",
                [id_user, id_book, review, stars]
            );
            return { success: true, insertId: result.insertId };
        } catch (error) {
            console.error("Error while adding book review !", error);
            return { success: false, error: error.message };
        }
    }

    // update book review
    static async updateReview (newReview, id_review) {
        try {
            const [result] = await pool.execute(
                "UPDATE reviews SET review = ? WHERE id_review = ?",
                [newReview, id_review]
            );

            if (result.affectedRows > 0) {
                return { success: true, message: 'Review updated successfully.'};
            } else {
                return { success: false, message: 'No review found to update.' };
            }

        } catch (error) {
            console.error("Error while updating review:", error);
            return { success: false, error: error.message };
        }
    }

    // 
    static async geUserReview (id_review) {
        const [result] = await pool.execute(
            "SELECT id_user FROM reviews WHERE id_review = ?",
            [id_review]
        );
        return result[0];
    }

    // delete book review

}

module.exports = ReviewModel;