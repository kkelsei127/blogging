const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// The `/api/post` endpoint

// router.get('/', async (req, res) => {
//   try{

//       const postData = await Post.findAll({
//           include: [{ model: User}],
//       });
//       //serialize data so template can read it
//       const posts = postData.map((Post) => Post.get({ plain: true }));
//       // console.log(posts);

//       //pass data and session flag into template
//       res.render('homepage', {
//           posts,
//           logged_in: req.session.logged_in
//       });
//   } catch (err) {
//       res.status(500).json(err);
//       console.log(err);
//   }
// });

//create a post
router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update a post by its id value
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(postData);

  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//delete a post by its id value
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
