
class Book {
    constructor(object) {
        this.title = object.title;
        this.year = object.year;
        this.genre_id = object.genre;
        this.author_id = object.author;
        this.stock = object.stock;
        this.inventory = object.inventory;
    }
}

module.exports = Book;