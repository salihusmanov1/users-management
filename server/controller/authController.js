const { Users } = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

class AuthController {
  static async registerUser(req, res) {
    try {
      const user = req.body;
      const newUser = await Users.create(user);
      res.status(201).json({
        message: 'User was created successfully',
        user: {
          id: newUser.id,
          name: newUser.username,
          email: newUser.email,
          token: generateAccessToken(newUser.id)
        },
      });
    } catch (error) {
      if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(error.name)) {
        const validationErrors = error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        }));

        return res.status(400).json({
          message: 'Validation failed',
          errors: validationErrors,
        });
      }
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'User not found. Please check your email and try again.' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password. Please try again.' });
      }
      if (user.is_blocked) {
        return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
      }
      await user.update({ last_seen: new Date() });
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: generateAccessToken(user.id)
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
module.exports = AuthController;
