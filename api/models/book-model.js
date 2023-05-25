
class Book {
    constructor(object) {
        this.title = object.title;
        this.year = parseInt(object.year);
        this.genre_id = object.genre;
        this.author_id = object.author;
        this.stock = object.inventory; //set to initial same as inventory (before rentals)
        this.inventory = object.inventory;
    }
}

module.exports = Book;