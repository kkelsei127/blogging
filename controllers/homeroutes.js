const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all posts and join with user data
router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            include: [{ model: User}],
        });
        //serialize data so template can read it
        const posts = postData.map((Post) => Post.get({ plain: true }));
        // console.log(posts);

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

//get a single post
// router.get('/viewpost', withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: [ 'username'],
//                 },
//             ],
//         });
//         console.log(postData)
//         const post = postData.get({ plain: true });
//         res.render('viewpost', {
//             ...post,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//         console.log(err);
//     }
// });

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
               User, 
               {
                model: Comment,
                include: [User]
               }
            ],
        });
        console.log("See me?")
        console.log(postData)
        const post = postData.get({ plain: true });
        // console.log(post);
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
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password'] },
            include: [{ model: Post }],
            
        });
        const user = userData.get({ plain: true });
        // console.log(user);
        // console.log("~~~~~~~~~~~~~~~~~")
        // console.log(userData.posts)
        
        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Rendering the createPost page, passing the logged_in variable so the user will stay logged in
 
router.get("/createPost", withAuth, (req, res) => {
  res.render("createPost", {
    logged_in: req.session.logged_in
  });
})

router.get("/post/:id/edit", withAuth, async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
    const post = postData.get({ plain: true });
  
    console.log(post);
  
    res.render('updatePost', {
      id: post.id.toString(),
      post_name: post.post_name,
      post_body: post.post_body,
      logged_in: req.session.logged_in
    })
  })

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
});

router.get('/signup', (req, res) => {
if (req.session.logged_in) {
    res.redirect('/profile'); 
    return;
    }

res.render('signup');
});


module.exports = router;
