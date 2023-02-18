const router = require('express').Router();
const { post, user, comment } = require('../models');
const withAuth = require('../utils/auth');

//get all posts and join with user data
router.get('/', async (req, res) => {
    try{
        const postData = await post.findAll({
            include: [
                {
                    model: user,
                    attributes: ['username'],
                },
            ],
        });
        //serialize data so template can read it
        const posts = postData.mapp((post) => post.get({ plain: true }));

        //pass data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = post.findByPk(req.params.id, {
            include: [
                {
                    model: user,
                    attributes: [
                        'username',
                        'post_name',
                        'post_body'
                    ],
                },
            ],
        });
        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//use with auth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
        //find the logged in user based on session id
        const userData = await user.findByPk(req.session.user_id, {
            attributes: {exclude: ['password'] },
            include: [{ model: post}],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});




