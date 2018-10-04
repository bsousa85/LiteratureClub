const express        = require('express');
const router         = express.Router();
const userController = require('../controllers/usersController');

router.get('/', userController.getUsers);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/checkAuth/:token', userController.checkUserStatus);

router.delete('/delete/:id', userController.deleteUser);


module.exports = router;

/*
"title" : "The Last Wish",
	"text" : "It was a nice summer brise",
	"category" : "Fiction/Fantasy",
    "author" : "Bruno Sousa",
    
*/