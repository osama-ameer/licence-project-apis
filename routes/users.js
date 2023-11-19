const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middlewere/auth");

// @route POST /api/users
// @desc Add new User / Register a new user
// @acces Public

router.post(
  "/",
  // Middleware for validating the req data coming from the client side
  [
    check("name", "Please enter a name of almost 3 characters").isLength({
      min: 3,
    }),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Enter password of atleast 6 characters").isLength({
      min: 6,
      max: 20,
    }),
  ],
  async (req, res) => {
    // Validate Data inside request body
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(400).json({ errors: error.array() });

    // Get Data
    const { name, email, password, role } = req.body;

    // Create User
    const user = new User(req.body);
    console.log("User", user);

    // Hash Password
    const salt = await bcrypt.genSalt(10); // Shuffule the password
    user.password = await bcrypt.hash(password, salt);

    try {
      // Check if user already exist
      const checkUser = await User.findOne({ email }).select({ password: 0 });
      if (checkUser) return res.status(400).json({ msg: "User already exist" });

      // Add User in Database
      await user.save();

      // Return jwt
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      //   Generate JWT
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 100000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token, user });
        }
      );
    } catch (err) {
      console.log("Error ", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route GET /api/users
// @desc Get all users
// @acces Private

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select({
      password: 0,
      __v: 0,
    });

    res.status(200).json({ users });
  } catch (error) {
    console.log("Error ", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// // @route GET /api/users/:id
// // @desc Get User by id
// // @acces Private

router.get("/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user)
      return res.status(400).json({ msg: "User with this ID does not exist" });

    res.status(200).json({ user });
  } catch (error) {
    console.log("Error ", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// // @route PUT /api/users/:id
// // @desc Update User
// // @access Private

router.put("/:id", auth, async (req, res) => {
  let changes = {};

  if (req.body) changes = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).json({ msg: "User with this ID does not exist" });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: changes },
      { new: true }
    );

    res.status(200).json({ user });
  } catch (err) {
    console.log("Error ", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// // @route DELETE /api/users/:id
// // @desc Delete User
// // @acces Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).json({ msg: "User with this ID does not exist" });

    await User.findByIdAndRemove(req.params.id);

    res.status(200).json({ msg: "This User was deleted successfully!" });
  } catch (err) {
    console.log("Error ", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});
module.exports = router;
