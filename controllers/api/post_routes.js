const router = require('express').Router();
const { user, post, comment } = require('../../models');


//create a post
router.post('/post', async (req, res) => {
    try{
        const postData = await post.create({
            id: req.body.id,
            post_name: req.body.post_name,
            post_body: req.body.post_body
        });
        res.status(200).json(postData);
    } catch (err){
        res.status(400).json(err);
    }
});

//update a post by its id value
router.put('/:id', async (req, res) => {
    try {
        const postData = await post.update(req.body, {
            where: {id: req.params.id}
        })
        res.stus(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//delete a post by its id value
router.delete('/:id', async (req, res) => {
    try {
        const postData = await post.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id!'});
            return;
        }
        res.status(200).json(postData);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
