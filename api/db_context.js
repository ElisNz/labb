const pgp = require('pg-promise')(/* options */);
const db = pgp(`postgres://${process.env.USER}:${process.env.PASSWORD}@localhost:${process.env.DBPORT || '5432'}/${process.env.DATABASE}`);
const { model } = require('./models/index');

// all functions connecting directly to db
async function hello(keyword = 'elis') {
    let data = await db.many(`SELECT * FROM customer`);
    return data;
  }
async function getAllBooks() {
    let data = await db.many(`SELECT * FROM book`);
    return data;
  }
async function registerOneBook(book) {
    const authorId = await db.oneOrNone(`SELECT author_id FROM author WHERE last_name='${book.author}'`);
    book.author = authorId.author_id;
    const genreId = await db.oneOrNone(`SELECT genre_id FROM genre WHERE genre_name='${book.genre}'`);
    book.genre = genreId.genre_id;
    const modelToInsert = new model.book(book);
    return await db.none(
      "INSERT INTO book (title, author_id, genre_id, stock, inventory)" + 
      "VALUES ($1, $2, $3, $4, $5)", [modelToInsert.title, modelToInsert.author_id, modelToInsert.genre_id, modelToInsert.stock, modelToInsert.inventory]
    );
  }
async function deleteOneBook(id) {
    return await db.none(`DELETE FROM book WHERE book_id='${id}'`);
  }
  
module.exports = {
    hello,
    getAllBooks,
    registerOneBook,
    deleteOneBook
};