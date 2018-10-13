const express        = require('express');
const router         = express.Router();
const userController = require('../controllers/usersController');

router.get('/', userController.getUsers);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.put('/:id', userController.updateUser);

router.post('/checkAuth/:token', userController.checkUserStatus);

router.delete('/delete/:id', userController.deleteUser);


module.exports = router;
