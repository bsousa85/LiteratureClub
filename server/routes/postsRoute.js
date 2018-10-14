const express        = require('express');
const router         = express.Router();
const postController = require('../controllers/postsController');
const deletePostComments  = require('../middleware/deletePostComments');

router.get('/', postController.getAllPosts);

router.get('/:user', postController.getUserPosts);

router.get('/:id', postController.getPost);

router.post('/newPost', postController.newPost);

router.put('/:id', postController.updatePost);

router.put('/like/:id', postController.decrementLikes);

router.delete('/delete/:id', deletePostComments, postController.deletePost);

module.exports = router;