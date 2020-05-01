const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth.middleware');

// Post model
const Post = require('../../model/posts');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Fail to load Comment' });
  }
});

router.post(
  '/',
  [
    check('name', 'Name is required!').notEmpty(),
    check('reason', 'Reason is required!').notEmpty(),
  ],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
          message: 'Make sure fields are not empty',
        });
      }
      // eslint-disable-next-line object-curly-newline
      const { name, reason, comment, route } = req.body;

      const newPost = new Post({
        name,
        reason,
        comment,
        route,
      });
      await newPost.save();

      res.json(newPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Fail to create a comment' });
    }
  },
);

router.delete('/:id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    console.log(req.user);
    await posts.remove();
    res.json({ message: 'Post deleted', userId: req.user.userId });
  } catch (error) {
    res.status(500).json({ message: 'Fail to delete comment' });
  }
});

// Edit Post
router.get('/edit/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Fail to get single comment' });
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const { name, reason, comment } = req.body;
    const post = {
      name,
      reason,
      comment,
    };

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      post,
      {
        useFindAndModify: false,
      },
      () => {},
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Fail to edit comment' });
  }
});

module.exports = router;
