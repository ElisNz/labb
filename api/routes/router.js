const express = require('express');
const router = express.Router();
const { getCustomer, getBooks, registerBook, deleteBook, search } = require('../controllers/controller');

// Get sample user
router.get('/example', getCustomer);
// List all books
router.get('/all', getBooks);
// Search by author or title (via query params)
router.get('/search/:query', search);
// Register new book
router.post('/register', registerBook);
// Register new book
router.put('/update');
// Delete a book
router.delete('/delete', deleteBook);

module.exports = router;