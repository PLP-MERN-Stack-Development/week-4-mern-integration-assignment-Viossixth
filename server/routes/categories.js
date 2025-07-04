const { body, validationResult } = require('express-validator');

// ...

router.post(
  '/',
  body('name').notEmpty().withMessage('Category name is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;
      const newCategory = new Category({ name });
      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (err) {
      next(err);
    }
  }
);
