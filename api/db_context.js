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
      "INSERT INTO book (title, author_id, genre_id, stock, inventory, year)" + 
      "VALUES ($1, $2, $3, $4, $5, $6)", [modelToInsert.title, modelToInsert.author_id, modelToInsert.genre_id, modelToInsert.stock, modelToInsert.inventory, modelToInsert.year]
    );
  }
async function deleteOneBook(title) {
    const id = await db.any(`SELECT book_id FROM book WHERE title = '${title}'`);
    if(id.length === 0) { throw 'No books with that name were found'; }
    for (let { book_id } of id) {
      let check = await db.any(`SELECT rental_id FROM rental WHERE book_id=${book_id}`);
      if(check.length > 0) { 
        throw { message: 'constraint encountered. Could not delete' }
      } else {
        db.none(`DELETE FROM book WHERE book_id=${book_id}`);
      }
    }
    return ('deleted all books with title:' + title);
  }
async function searchAuthorOrTitle(query) {
    let authors = await db.any(`SELECT * FROM author WHERE first_name LIKE'%${query}%' OR last_name LIKE'%${query}%'`);
    let titles = await db.any(`SELECT * FROM book WHERE title LIKE'%${query}%'`);
    return { authors, titles };
  }  
async function updateOneBook(update) {
    const id = update.id;
    delete update.id;
    for (let [key, value] of Object.entries(update)) {
      if (typeof value == 'string') { value = `'${value}'`};
      db.none(`
        UPDATE book
        SET ${key} = ${value}
        WHERE book_id = '${id}'
      `);
    }
    return; 
  }

module.exports = {
    hello,
    getAllBooks,
    registerOneBook,
    deleteOneBook,
    searchAuthorOrTitle,
    updateOneBook
};