import { body, validationResult } from "express-validator";

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateRegister = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email")
    .isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  handleValidation,
];

export const validateLogin = [
  body("email")
    .isEmail().withMessage("Invalid email address"),
  body("password")
    .notEmpty().withMessage("Password is required"),
  handleValidation,
];