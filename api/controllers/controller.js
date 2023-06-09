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
        const data = await deleteOneBook(req.body.title);
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
    let data = req.body;
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
        if(value === '') { 
            delete data[key]
        } else if(key !== 'title') {
            data[key] = parseInt(value)
        }
      }
    console.log(data);
    try {
        const data = await updateOneBook(req.body);
        res.status(200).send('Successfully updated book');
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