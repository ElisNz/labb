const { hello, getAllBooks, registerOneBook, deleteOneBook, searchAuthorOrTitle, updateOneBook } = require('../db_context');

async function getCustomer(req, res) {
    res.status(200).send(await hello());
};
async function getBooks(req, res) {
    try {
        const data = await getAllBooks();
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send(err)
    }
};
async function registerBook(req, res) {
    try {
        const data = await registerOneBook(req.body);
        res.status(200).send('Successfully added book');
    } catch (err) {
        res.status(500).send(err);
    }   
};
async function deleteBook(req, res) {
    try {
        const data = await deleteOneBook(req.body.id);
        res.status(200).send('Successfully removed book');
    } catch (err) {
        res.status(500).send(err);
    }   
};
async function search(req, res) {
    const query = req.params.query;
    try {
        let result = await searchAuthorOrTitle(query);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }  
};
async function updateBook(req, res) {
    try {
        const data = await updateOneBook(req.body);
        res.status(200).send('Successfully removed book');
    } catch (err) {
        res.status(500).send(err);
    }   
};

module.exports = {
    getCustomer,
    getBooks,
    registerBook,
    deleteBook,
    search,
    updateBook
}