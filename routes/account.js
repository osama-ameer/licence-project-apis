const express = require("express");
const Account = require("../models/account");
const auth = require("../middlewere/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");

// @route POST /api/account/
// @desc Add Account
// @acces Private

router.post("/", auth, async (req, res) => {
  const account = new Account(req.body);

  try {
    let newAccount = await account.save();
    res.status(200).json({ account: newAccount });
  } catch (error) {
    console.log("Error ", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});
// @route GET /api/account/
// @desc Get all Accounts
// @acces Private

router.get(`/`, async (req, res) => {
  try {
    const accounts = await Account.find();

    res.status(200).json({ account: accounts });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// // @route GET /api/account/:licenseId
// // @desc Get Account by id
// // @acces Private

router.get("/:id", auth, async (req, res) => {
  try {
    let account = await Account.findById(req.params.id);

    if (!account)
      return res
        .status(400)
        .json({ msg: "Account with this ID does not exist" });

    res.status(200).json({ account });
  } catch (error) {
    console.log("Error ", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// // @route PUT /api/account/:id
// // @desc Update Account
// // @access Private

router.put("/:id", auth, async (req, res) => {
  let changes = {};

  if (req.body) changes = req.body;

  try {
    let account = await Account.findById(req.params.id);
    if (!account)
      return res
        .status(400)
        .json({ msg: "Account with this ID does not exist" });

    account = await Account.findByIdAndUpdate(
      req.params.id,
      { $set: changes },
      { new: true }
    );

    res.status(200).json({ account });
  } catch (err) {
    console.log("Error ", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// // @route DELETE /api/license/:id
// // @desc Delete Account
// // @acces Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let account = await Account.findById(req.params.id);
    if (!account)
      return res
        .status(400)
        .json({ msg: "Account with this ID does not exist" });

    await Account.findByIdAndRemove(req.params.id);

    res.status(200).json({ msg: "This Account was deleted successfully!" });
  } catch (err) {
    console.log("Error ", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
