const express = require("express");
const userController = require('../controllers/user-controller')
const router = express.Router();

router
    .get('/', userController.findAll)
    .get('/:id', userController.findOne)
    .post('/', userController.create)
    .patch('/:id', userController.update)
    .delete('/:id', userController.destroy)
module.exports = router;