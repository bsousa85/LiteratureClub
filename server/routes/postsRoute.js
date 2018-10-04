const express        = require('express');
const router         = express.Router();
const postController = require('../controllers/postsController');

router.get('/', postController.getAllPosts);

router.post('/newPost', postController.newPost);

router.get('/:id', postController.getPost);

router.put('/:id', postController.updatePost);

router.delete('/delete/:id', postController.deletePost);

module.exports = router;