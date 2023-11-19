const express = require("express");
const License = require("../models/license");
const auth = require("../middlewere/auth");
const router = express.Router();
const jwt = require("jsonwebtoken");

// @route POST /api/license
// @desc Add License
// @acces Private

router.post("/", auth, async (req, res) => {
  const license = new License(req.body);

  try {
    let newLicense = await license.save();
    res.status(200).json({ license: newLicense });
  } catch (error) {
    console.log("Error ", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});
// @route GET /api/license/
// @desc Get all Licenses
// @acces Private

router.get(`/`, async (req, res) => {
  try {
    const licenses = await License.find();

    res.status(200).json({ licenses: licenses });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// @route GET /api/license/:licenseId
// @desc Get License by id
// @acces Private

router.get("/:licenseId", auth, async (req, res) => {
  try {
    let license = await License.findById(req.params.licenseId);

    if (!license)
      return res
        .status(400)
        .json({ msg: "License with this ID does not exist" });

    res.status(200).json({ license });
  } catch (error) {
    console.log("Error ", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route PUT /api/license/:id
// @desc Update License
// @access Private

router.put("/:id", auth, async (req, res) => {
  let changes = {};

  if (req.body) changes = req.body;

  try {
    let license = await License.findById(req.params.id);
    if (!license)
      return res
        .status(400)
        .json({ msg: "License with this ID does not exist" });

    license = await License.findByIdAndUpdate(
      req.params.id,
      { $set: changes },
      { new: true }
    );

    res.status(200).json({ license });
  } catch (err) {
    console.log("Error ", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route DELETE /api/license/:id
// @desc License Project
// @acces Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let license = await License.findById(req.params.id);
    if (!license)
      return res
        .status(400)
        .json({ msg: "License with this ID does not exist" });

    await License.findByIdAndRemove(req.params.id);

    res.status(200).json({ msg: "This license was deleted successfully!" });
  } catch (err) {
    console.log("Error ", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
