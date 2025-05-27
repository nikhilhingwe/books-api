import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export default {
  // register-controller
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // checking for username email and password
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "please provide username, email, and password" });
      }

      // checking if email is already there in db
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // checking if username is already there in db
      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername) {
        return res.status(400).json({ message: "username already taken" });
      }

      const user = new User({ username, email, password });
      await user.save();

      res.status(201).json({ message: "Registeration successfull" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // login-controller
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // checking if password is matching or not from userSchema
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // jwt token generation
      const token = generateToken(user._id.toString());

      res.json({
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  },
};
