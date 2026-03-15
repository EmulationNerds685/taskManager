import { body, validationResult } from "express-validator";

export const validateTask = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description too long"),

  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Invalid status"),

  (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success:false,
        errors: errors.array()
      });
    }

    next();
  }
];