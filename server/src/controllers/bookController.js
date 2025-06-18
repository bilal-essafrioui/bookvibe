const BookModel = require('../models/bookModel');

class BookController {

    // for getting all books 
    static async showBooks(req, res) {
        try{
            const books = await BookModel.getAllBooks();

            if (books.length === 0) {
                return res.status(404).json({ message: "No books found" });
            }

            res.status(200).json({message: "Books found successfully", data: books});
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }

    // 
    static async showBooksByISBN(req, res) {
        try {
            const ISBN = req.params.isbn;

            if (!ISBN) {
                return res.status(400).json({ message: "ISBN is required" });
            }

            const books = await BookModel.getBookByISBN(ISBN);

            if (books.length === 0) {
                return res.status(404).json({ message: "No books found with this ISBN: " + ISBN });
            }

            res.status(200).json({message: "Books found successfully", data: books});
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }

    // 
    static async showBooksByAuthor(req, res) {
        try {
            const author = req.params.author;

            if (!author) {
                return res.status(400).json({ message: "Author is required" });
            }

            const books = await BookModel.getBooksByAuthor(author);

            if (books.length === 0) {
                return res.status(404).json({ message: "No books found of " + author });
            }

            res.status(200).json({message: "Books found successfully", data: books});
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }

    //
    static async showBooksByTitle(req, res) {
        try {
            const title = req.params.title;

            if (!title) {
                return res.status(400).json({ message: "Title is required" });
            }

            const books = await BookModel.getBooksByTitle(title);

            if (books.length === 0) {
                return res.status(404).json({ message: "No book has this title " + title });
            }

            res.status(200).json({message: "Book found successfully", data: books});
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }

}

module.exports = BookController;