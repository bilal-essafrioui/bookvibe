const pool = require('../config/db');

class UserModel {
    static async insertUser(full_name, birth_date, email, psswd) {
        try {
            const [result] = await pool.execute(
                "INSERT INTO users (full_name, birth_date, email, psswd) VALUES (?, ?, ?, ?)",
                [full_name, birth_date, email, psswd]
            );
            return { success: true, insertId: result.insertId };
        } catch (error) {
            console.error("Error while inserting user: ", error);
            return { success: false, error: error.message };
        }
    }

    static async getUser(email) {
        try {
            const [result] = await pool.execute(
                "SELECT * FROM users WHERE email = ?",
                [email]
            );
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error while getting user: ", error);
            throw error;
        }
    }
}

module.exports = UserModel;