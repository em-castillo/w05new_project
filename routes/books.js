const express = require('express');

const contactsController = require('../controllers/books');

const router = express.Router();

// GET collection(s)
// GET request returns ALL documents in children collection
router.get('/', contactsController.getAll);
// GET request returns a SINGLE document in children collection
router.get('/:id', contactsController.getSingle);


// POST request
router.post('/', contactsController.createBook);
// PUT request/ uses id to be specific and don't mess up info
router.put('/:id', contactsController.updateBook);
// DELETE request/ uses id to be specific
router.delete('/:id', contactsController.deleteBook);


module.exports = router;