const express = require('express')
const router  = express.Router();
const commentController = require('../controllers/commentsController');
const postUpdate = require('../middleware/postUpdate');

router.get('/', commentController.getAllComments);

router.get('/:id', commentController.getComment);

router.get('/post/:id', commentController.getPostComments);

router.post('/addComment', commentController.addComment, postUpdate);

router.put('/:id', commentController.updateComment);

router.delete('/delete/:id', commentController.deleteComment);


module.exports = router;