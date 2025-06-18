const pool = require('../config/db');

class BookModel {
    // static allow using this methode without instanciation
    static async getAllBooks (){
        try{
            const [books] = await pool.execute("SELECT * FROM books");
            return books;
        } catch (error) {
            console.error("Error while fetching books: ", error);
            throw error;
        }
    }

    // getting books based on their ISBN
    static async getBookByISBN(ISBN){
        try{
            const [books] = await pool.execute("SELECT * FROM books WHERE isbn = ?", [ISBN]);
            return books;
        } catch (error) {
            console.error("Error while fetching books by ISBN: ", error);
            throw error;
        }
    }

    // getting books by author
    static async getBooksByAuthor(author){
        try{
            const [books] = await pool.execute("SELECT * FROM books WHERE author LIKE ?", [`%${author}%`]);
            return books;
        } catch (error) {
            console.error("Error while fetching books by Author: ", error);
            throw error;
        }
    }

    // getting books by title
    static async getBooksByTitle(title){
        try{
            const [books] = await pool.execute("SELECT * FROM books WHERE title LIKE ?", [`%${title}%`]);
            return books;
        } catch (error) {
            console.error("Error while fetching books by Title: ", error);
            throw error;
        }
    }
}

module.exports = BookModel;