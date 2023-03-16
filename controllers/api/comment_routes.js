const router = require('express').Router();
const { Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/comment` endpoint

//get all comments for one post
router.get('/:id', async(req, res) => {
    try{
        const commentData = await Post.findByPk(req.params.id, {
            include: [
                {model: Comment},
            ],
        });
        
        // console.log(commentData.comment_content)
        
        const comment = commentData.map((Post) => Post.get({ plain: true }));
        console.log(comment)
        res.render('comment', { comment });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//create a comment
router.post('/', withAuth, async (req, res) => {
    try {
        
        const commentData = await Comment.create({
            // make sure this includes the post_id and comment_content in the req.body from the frontend
        post_id: req.body.post_id,
        comment_content: req.body.comment_content,
        user_id: req.session.user_id
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;