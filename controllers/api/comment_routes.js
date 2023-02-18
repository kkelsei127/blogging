const router = require('express').Router();
const { user, post, comment } = require('../../models');


//get all comments for one post
router.get('/comments', async(req, res) => {
    try{
        const commentData = comment.findByPk(req.params.comment_id, {
            include: [
                {
                    model: post,
                    attributes: [
                        'id',
                        'comment_content'
                    ],
                },
            ],
        });

        const comment = commentData.get({ plain: true });
        res.render('comment', { comment });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//create a comment
router.post('/comment', async (req, res) => {
    try {
        
        const commentData = await comment.create({
        //TODO link this to a post ???
        //maybe ...
            //where: {
                //id: req.params.post_id?
            //}
            id: req.body.id,
            comment_content: req.body.comment_content,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;