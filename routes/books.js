const express = require('express');

const booksController = require('../controllers/books');
//validation
const validation = require('../middleware/validate');

const router = express.Router();

// GET collection(s)
// GET request returns ALL documents in children collection
router.get('/', booksController.getAll);
// GET request returns a SINGLE document in children collection
router.get('/:id', booksController.getSingle);


// POST request
router.post('/', validation.saveBook, booksController.createBook);
// PUT request/ uses id to be specific and don't mess up info
router.put('/:id', validation.saveBook, booksController.updateBook);
// DELETE request/ uses id to be specific
router.delete('/:id', booksController.deleteBook);


module.exports = router;