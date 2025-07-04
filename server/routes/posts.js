const { body, validationResult } = require('express-validator');

// ...

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category ID is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, content, category } = req.body;
      const newPost = new Post({ title, content, category });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      next(err);
    }
  }
);
