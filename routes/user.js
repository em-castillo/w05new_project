const express = require('express');

const userController = require('../controllers/user');
//validation
const validation = require('../middleware/validate');

const router = express.Router();

// GET collection(s)
// GET request returns ALL documents in user collection
// router.get('/', userController.getAll);
// GET request returns a SINGLE document in user collection
router.get('/:id', userController.getSingle);

// router.get('/:id', userController.login);
// router.get('/', userController.logout);


// POST request
router.post('/', validation.saveUser, userController.createUser);
// PUT request/ uses id to be specific and don't mess up info
router.put('/:id', validation.saveUser, userController.updateUser);
// DELETE request/ uses id to be specific
router.delete('/:id', userController.deleteUser);


module.exports = router;