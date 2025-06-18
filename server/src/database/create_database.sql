CREATE DATABASE onlinebookreviews;

CREATE TABLE books(
    id_book INTEGER AUTO_INCREMENT,
    isbn VARCHAR(15),
    title VARCHAR(100),
    author VARCHAR(100),
    pages INTEGER CHECK (pages > 0),
    CONSTRAINT pk_books PRIMARY KEY(id_book)
);

CREATE TABLE users(
    id_user INTEGER AUTO_INCREMENT,
    full_name VARCHAR(50),
    birth_date DATE,
    email VARCHAR(50) UNIQUE,
    psswd VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    CONSTRAINT pk_users PRIMARY KEY (id_user)
);

CREATE TABLE reviews(
    id_review INTEGER AUTO_INCREMENT,
    id_user INTEGER,
    id_book INTEGER,
    review TEXT DEFAULT NULL,
    stars INTEGER CHECK (stars BETWEEN 0 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_reviews PRIMARY KEY (id_review),
    CONSTRAINT fk1_reviews FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    CONSTRAINT fk2_reviews FOREIGN KEY (id_book) REFERENCES books(id_book) ON DELETE CASCADE
);
